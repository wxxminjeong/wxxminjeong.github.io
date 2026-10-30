/*
 * 방명록: 이 저장소의 GitHub 이슈 중 제목이 [방명록]으로 시작하는 것을 보여줍니다.
 */
(function () {
  var box = document.getElementById('guestbook');
  if (!box) return;
  var repo = box.getAttribute('data-repo');
  var prefix = box.getAttribute('data-prefix');

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

  function koDate(iso) {
    var d = new Date(iso);
    return d.getFullYear() + '년 ' + (d.getMonth() + 1) + '월 ' + d.getDate() + '일';
  }

  function entry(issue) {
    var frag = document.createDocumentFragment();

    var head = el('p');
    head.appendChild(el('b', '보낸 사람: '));
    head.appendChild(link(issue.user.html_url, issue.user.login));
    head.appendChild(el('br'));
    head.appendChild(el('b', '남긴 날: '));
    head.appendChild(document.createTextNode(koDate(issue.created_at)));
    frag.appendChild(head);

    var text = (issue.body || '').trim() || issue.title.slice(prefix.length).trim() || '(내용 없음)';
    if (text.length > 2000) text = text.slice(0, 2000) + '...';
    var quote = el('blockquote', text);
    quote.className = 'gb-body';
    frag.appendChild(quote);

    var foot = el('p');
    var small = el('font');
    small.setAttribute('size', '-1');
    small.appendChild(link(issue.html_url, '답글 보기 / 달기'));
    foot.appendChild(small);
    frag.appendChild(foot);

    frag.appendChild(el('hr'));
    return frag;
  }

  function fail() {
    box.textContent = '';
    var p = el('p', '방명록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요. ');
    p.appendChild(link('https://github.com/' + repo + '/issues', 'GitHub에서 보기'));
    box.appendChild(p);
  }

  fetch('https://api.github.com/repos/' + repo + '/issues?state=all&per_page=100', {
    headers: { Accept: 'application/vnd.github+json' }
  })
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function (issues) {
      var entries = issues.filter(function (i) {
        return !i.pull_request && i.title.indexOf(prefix) === 0;
      });
      box.textContent = '';
      if (!entries.length) {
        box.appendChild(el('p', '아직 아무도 글을 남기지 않았습니다. 첫 번째 손님이 되어주세요!'));
        return;
      }
      entries.forEach(function (issue) {
        box.appendChild(entry(issue));
      });
    })
    .catch(fail);
})();
