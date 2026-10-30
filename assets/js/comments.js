/*
 * 글마다 달리는 댓글: 이 저장소의 GitHub 이슈 중 제목이 "[Comment] 글 제목"인 것을 보여줍니다.
 *   - [data-comment-count="제목"] : 그 제목의 이슈 개수를 "comments: N"으로 표시 (첫 화면)
 *   - [data-comments="제목"]      : 그 제목의 이슈를 댓글 상자로 나열 (글 화면)
 */
(function () {
  'use strict';

  var repo = document.body.getAttribute('data-repo');
  var counters = document.querySelectorAll('[data-comment-count]');
  var lists = document.querySelectorAll('[data-comments]');
  if (!repo || (!counters.length && !lists.length)) return;

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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

  // Oct 30, 2026 11:00 KST (Fri)
  function kst(iso) {
    var d = new Date(Date.parse(iso) + 9 * 3600 * 1000);
    var hh = String(d.getUTCHours()).padStart(2, '0');
    var mm = String(d.getUTCMinutes()).padStart(2, '0');
    return MONTHS[d.getUTCMonth()] + ' ' + d.getUTCDate() + ', ' + d.getUTCFullYear() + ' ' +
      hh + ':' + mm + ' KST (' + DAYS[d.getUTCDay()] + ')';
  }

  function matches(title) {
    return function (issue) { return issue.title.trim() === title; };
  }

  function commentBox(issue) {
    var box = el('details');
    box.className = 'CommentBox';
    box.open = true;

    var summary = el('summary');
    var title = el('h3', 'Comment from ' + issue.user.login);
    title.className = 'CommentTitle';
    summary.appendChild(title);

    var poster = el('p');
    poster.className = 'CommentPoster';
    poster.appendChild(document.createTextNode('Posted ' + kst(issue.created_at) + ' by '));
    poster.appendChild(el('b', issue.user.login));
    poster.appendChild(document.createTextNode(' ['));
    poster.appendChild(link(issue.html_url, 'View on GitHub'));
    poster.appendChild(document.createTextNode(']'));
    summary.appendChild(poster);
    box.appendChild(summary);

    var text = (issue.body || '').trim() || '(empty)';
    if (text.length > 4000) text = text.slice(0, 4000) + ' ...';
    var body = el('div', text);
    body.className = 'FormattedComment';
    box.appendChild(body);
    return box;
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
        var n = issues.filter(matches(node.getAttribute('data-comment-count'))).length;
        node.textContent = 'comments: ' + (n || 'none');
      });

      lists.forEach(function (node) {
        // API는 최신순으로 주므로 뒤집어서 오래된 댓글부터
        var found = issues.filter(matches(node.getAttribute('data-comments'))).reverse();
        node.textContent = '';
        if (!found.length) {
          node.appendChild(el('p', node.getAttribute('data-empty') || ''));
          return;
        }
        found.forEach(function (issue) { node.appendChild(commentBox(issue)); });
      });
    })
    .catch(function () {
      lists.forEach(function (node) {
        node.textContent = '';
        var p = el('p', "Couldn't load comments right now. ");
        p.appendChild(link('https://github.com/' + repo + '/issues', 'View them on GitHub'));
        node.appendChild(p);
      });
    });
})();
