/* ==========================================================
   wxxminjeong의 개발 홈페이지 — 90년대 효과 모음
   ========================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  /* 1. 방문자 카운터 — 이 브라우저로 방문한 횟수 (탭을 새로 열 때마다 +1) */
  function counter() {
    var el = document.getElementById('counter');
    if (!el) return;
    var n = 1;
    try {
      n = parseInt(localStorage.getItem('visits'), 10) || 0;
      if (!sessionStorage.getItem('counted')) {
        n += 1;
        localStorage.setItem('visits', String(n));
        sessionStorage.setItem('counted', '1');
      }
      n = Math.max(n, 1);
    } catch (e) {
      n = 1;
    }
    var digits = String(Math.min(n, 999999)).padStart(6, '0');
    el.textContent = '';
    for (var i = 0; i < digits.length; i++) {
      var d = document.createElement('span');
      d.textContent = digits[i];
      el.appendChild(d);
    }
    el.setAttribute('role', 'img');
    el.setAttribute('aria-label', n + '번째 방문');
  }

  /* 2. 움직임 줄이기 설정이면 전광판 멈춤 */
  function calmDown() {
    if (!reduceMotion) return;
    document.querySelectorAll('marquee').forEach(function (m) {
      if (typeof m.stop === 'function') m.stop();
    });
  }

  /* 3. 코드 블록: 도스 파일명(8.3) 제목 + 복사 버튼 */
  var EXT = {
    javascript: 'JS', js: 'JS', jsx: 'JSX', typescript: 'TS', ts: 'TS', tsx: 'TSX',
    python: 'PY', py: 'PY', ruby: 'RB', rb: 'RB', java: 'JAV', kotlin: 'KT', swift: 'SWF',
    c: 'C', cpp: 'CPP', 'c++': 'CPP', csharp: 'CS', cs: 'CS', go: 'GO', golang: 'GO', rust: 'RS',
    bash: 'BAT', sh: 'BAT', shell: 'BAT', zsh: 'BAT', console: 'BAT', powershell: 'BAT',
    html: 'HTM', css: 'CSS', scss: 'CSS', json: 'JSN', yaml: 'YML', yml: 'YML',
    markdown: 'MD', md: 'MD', sql: 'SQL', dockerfile: 'DOC', diff: 'DIF'
  };

  function codeBlocks() {
    document.querySelectorAll('.prose div.highlighter-rouge').forEach(function (block) {
      var m = block.className.match(/language-([\w+#-]+)/);
      if (m && m[1] !== 'plaintext' && m[1] !== 'text') {
        var lang = m[1].toLowerCase();
        var ext = EXT[lang] || lang.replace(/[^a-z0-9]/g, '').slice(0, 3).toUpperCase();
        block.setAttribute('data-file', 'SOURCE.' + ext);
      }

      var code = block.querySelector('pre code') || block.querySelector('pre');
      if (!code || !navigator.clipboard) return;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn95 copy-btn';
      btn.textContent = '복사';
      btn.addEventListener('click', function () {
        navigator.clipboard.writeText(code.innerText.replace(/\n$/, '')).then(function () {
          btn.textContent = '복사됨!';
        }, function () {
          btn.textContent = '실패 ㅠㅠ';
        });
        setTimeout(function () { btn.textContent = '복사'; }, 1500);
      });
      block.appendChild(btn);
    });
  }

  /* 4. 마우스를 따라다니는 반짝이 */
  function sparkles() {
    if (!document.body.hasAttribute('data-sparkles') || reduceMotion) return;
    if (!matchMedia('(pointer: fine)').matches) return;
    var CHARS = ['★', '☆', '✦', '✧', '*', '+'];
    var COLORS = ['#ffff00', '#ff00ff', '#00ffff', '#ffffff', '#ff9900', '#33ff33'];
    var last = 0;
    var live = 0;
    document.addEventListener('mousemove', function (e) {
      var now = Date.now();
      if (now - last < 45 || live > 24) return;
      last = now;
      live++;
      var s = document.createElement('span');
      s.className = 'sparkle';
      s.setAttribute('aria-hidden', 'true');
      s.textContent = pick(CHARS);
      s.style.left = (e.clientX + 8) + 'px';
      s.style.top = (e.clientY + 8) + 'px';
      s.style.color = pick(COLORS);
      s.style.setProperty('--dx', (Math.random() * 24 - 12).toFixed(1) + 'px');
      s.addEventListener('animationend', function () {
        s.remove();
        live--;
      });
      document.body.appendChild(s);
    }, { passive: true });
  }

  /* 5. 방명록 — GitHub 이슈 중 제목이 [방명록]으로 시작하는 것 */
  function guestbook() {
    var box = document.getElementById('guestbook');
    if (!box) return;
    var repo = box.getAttribute('data-repo');
    var prefix = box.getAttribute('data-prefix');
    var issuesUrl = 'https://github.com/' + repo + '/issues';

    function message(text, withLink) {
      var p = document.createElement('p');
      p.className = 'gb-empty';
      p.textContent = text;
      if (withLink) {
        var a = document.createElement('a');
        a.href = issuesUrl;
        a.target = '_blank';
        a.rel = 'noopener';
        a.textContent = 'GitHub에서 보기';
        p.appendChild(document.createTextNode(' '));
        p.appendChild(a);
      }
      return p;
    }

    function cell(tag, text) {
      var c = document.createElement(tag);
      c.textContent = text;
      return c;
    }

    function formatDate(iso) {
      var d = new Date(iso);
      return d.getFullYear() + '.' + String(d.getMonth() + 1).padStart(2, '0') + '.' + String(d.getDate()).padStart(2, '0');
    }

    function entry(issue, no) {
      var table = document.createElement('table');
      table.className = 'gb-entry';

      var head = document.createElement('tr');
      head.appendChild(cell('th', 'No.'));
      head.appendChild(cell('td', String(no)));
      head.appendChild(cell('th', '이름'));
      var who = document.createElement('td');
      var a = document.createElement('a');
      a.href = issue.user.html_url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = issue.user.login;
      who.appendChild(a);
      head.appendChild(who);
      head.appendChild(cell('th', '날짜'));
      head.appendChild(cell('td', formatDate(issue.created_at)));
      table.appendChild(head);

      var text = (issue.body || '').trim() || issue.title.slice(prefix.length).trim() || '(내용 없음)';
      if (text.length > 2000) text = text.slice(0, 2000) + '…';
      var body = document.createElement('tr');
      var msg = cell('td', text);
      msg.className = 'msg';
      msg.colSpan = 6;
      body.appendChild(msg);
      table.appendChild(body);

      var foot = document.createElement('tr');
      var src = document.createElement('td');
      src.className = 'src';
      src.colSpan = 6;
      var link = document.createElement('a');
      link.href = issue.html_url;
      link.target = '_blank';
      link.rel = 'noopener';
      link.textContent = '답글 달기 ▶';
      src.appendChild(link);
      foot.appendChild(src);
      table.appendChild(foot);
      return table;
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
          box.appendChild(message('아직 방명록이 비어 있어요. 첫 번째 손님이 되어주세요! ^^'));
          return;
        }
        entries.forEach(function (issue, i) {
          box.appendChild(entry(issue, entries.length - i));
        });
      })
      .catch(function () {
        box.textContent = '';
        box.appendChild(message('방명록을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.', true));
      });
  }

  counter();
  calmDown();
  codeBlocks();
  sparkles();
  guestbook();
})();
