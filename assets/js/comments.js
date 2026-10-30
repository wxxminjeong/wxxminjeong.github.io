/*
 * 방명록과 글마다 달리는 의견: 이 저장소의 GitHub 이슈를 읽어서 보여줍니다.
 *   - [data-comment-count="제목"] : 그 제목의 이슈 개수를 "의견: N"으로 표시
 *   - [data-comments="제목"]      : 그 제목의 이슈를 의견 상자로 나열
 *       data-match="exact|prefix", data-order="asc|desc", data-empty="..."
 *   - form[data-title-prefix]     : 보낼 때 제목 앞에 머리말을 붙임
 */
(function () {
  'use strict';

  var repo = document.body.getAttribute('data-repo');
  var DAYS = ['일', '월', '화', '수', '목', '금', '토'];

  document.querySelectorAll('form[data-title-prefix]').forEach(function (form) {
    form.addEventListener('submit', function () {
      var title = form.querySelector('input[name="title"]');
      var subject = form.querySelector('[data-subject]');
      var text = subject ? subject.value.trim() : '';
      title.value = form.getAttribute('data-title-prefix') + (text ? ' ' + text : '');
    });
  });

  var counters = document.querySelectorAll('[data-comment-count]');
  var lists = document.querySelectorAll('[data-comments]');
  if (!repo || (!counters.length && !lists.length)) return;

  function el(tag, text) {
    var node = document.createElement(tag);
    if (text != null) node.textContent = text;
    return node;
  }

  function link(href, text) {
    var a = el('a', text);
    a.href = href;
    return a;
  }

  // 2026년 10월 30일 (금) 11:00 KST
  function kst(iso) {
    var d = new Date(Date.parse(iso) + 9 * 3600 * 1000);
    var hh = String(d.getUTCHours()).padStart(2, '0');
    var mm = String(d.getUTCMinutes()).padStart(2, '0');
    return d.getUTCFullYear() + '년 ' + (d.getUTCMonth() + 1) + '월 ' + d.getUTCDate() + '일 (' +
      DAYS[d.getUTCDay()] + ') ' + hh + ':' + mm + ' KST';
  }

  function matcher(title, mode) {
    return function (issue) {
      var t = issue.title.trim();
      return mode === 'prefix' ? t.indexOf(title) === 0 : t === title;
    };
  }

  function commentBox(issue, prefix, mode) {
    var box = el('details');
    box.className = 'CommentBox';
    box.open = true;

    var summary = el('summary');
    var subject = mode === 'prefix' ? issue.title.trim().slice(prefix.length).trim() : '';
    var title = el('h3', subject || (mode === 'prefix' ? '(제목 없음)' : issue.user.login + ' 님의 의견'));
    title.className = 'CommentTitle';
    summary.appendChild(title);

    var poster = el('p');
    poster.className = 'CommentPoster';
    poster.appendChild(document.createTextNode(kst(issue.created_at) + ', '));
    poster.appendChild(el('b', issue.user.login));
    poster.appendChild(document.createTextNode(' [ '));
    poster.appendChild(link(issue.html_url, 'GitHub에서 보기'));
    poster.appendChild(document.createTextNode(' ]'));
    summary.appendChild(poster);
    box.appendChild(summary);

    var text = (issue.body || '').trim() || '(내용 없음)';
    if (text.length > 4000) text = text.slice(0, 4000) + ' ...';
    var body = el('div', text);
    body.className = 'FormattedComment';
    box.appendChild(body);
    return box;
  }

  function issuesUrl() {
    return 'https://github.com/' + repo + '/issues';
  }

  // GitHub API는 IP당 시간당 60번까지라서, 같은 탭에서는 2분 동안 결과를 재사용한다
  var CACHE_KEY = 'issues:' + repo;
  var CACHE_MS = 2 * 60 * 1000;

  function loadIssues() {
    try {
      var cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) || 'null');
      if (cached && Date.now() - cached.at < CACHE_MS) return Promise.resolve(cached.issues);
    } catch (e) { /* 저장소를 못 쓰면 그냥 새로 받는다 */ }

    return fetch('https://api.github.com/repos/' + repo + '/issues?state=all&per_page=100', {
      headers: { Accept: 'application/vnd.github+json' }
    })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (issues) {
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), issues: issues }));
        } catch (e) { /* 무시 */ }
        return issues;
      });
  }

  loadIssues()
    .then(function (all) {
      var issues = all.filter(function (i) { return !i.pull_request; });

      counters.forEach(function (node) {
        var n = issues.filter(matcher(node.getAttribute('data-comment-count'), 'exact')).length;
        node.textContent = n ? '의견: ' + n : '의견: 없음';
      });

      lists.forEach(function (node) {
        var prefix = node.getAttribute('data-comments');
        var mode = node.getAttribute('data-match') || 'exact';
        var found = issues.filter(matcher(prefix, mode));
        if (node.getAttribute('data-order') === 'asc') found.reverse();
        node.textContent = '';
        if (!found.length) {
          node.appendChild(el('p', node.getAttribute('data-empty') || ''));
          return;
        }
        found.forEach(function (issue) {
          node.appendChild(commentBox(issue, prefix, mode));
        });
      });
    })
    .catch(function () {
      lists.forEach(function (node) {
        node.textContent = '';
        var p = el('p', '불러오지 못했습니다. 잠시 후 다시 시도해 주세요. ');
        p.appendChild(link(issuesUrl(), 'GitHub에서 보기'));
        node.appendChild(p);
      });
    });
})();
