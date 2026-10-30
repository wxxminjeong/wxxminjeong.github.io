/*
 * 검색: /search.json(모든 글의 제목·본문)에서 찾을 말이 모두 들어간 글을 보여줍니다.
 */
(function () {
  'use strict';

  var box = document.getElementById('search-results');
  var input = document.getElementById('q');
  if (!box || !input) return;

  var query = (new URLSearchParams(location.search).get('q') || '').trim();
  input.value = query;
  if (!query) {
    box.textContent = '';
    return;
  }

  var words = query.toLowerCase().split(/\s+/).filter(Boolean);

  function el(tag, text) {
    var node = document.createElement(tag);
    if (text != null) node.textContent = text;
    return node;
  }

  // 찾은 말을 굵게 표시한 조각을 만든다
  function highlight(text) {
    var frag = document.createDocumentFragment();
    var lower = text.toLowerCase();
    var i = 0;
    while (i < text.length) {
      var next = -1;
      var len = 0;
      words.forEach(function (w) {
        var at = lower.indexOf(w, i);
        if (at !== -1 && (next === -1 || at < next)) { next = at; len = w.length; }
      });
      if (next === -1) {
        frag.appendChild(document.createTextNode(text.slice(i)));
        break;
      }
      frag.appendChild(document.createTextNode(text.slice(i, next)));
      var mark = el('span', text.slice(next, next + len));
      mark.className = 'SearchMatch';
      frag.appendChild(mark);
      i = next + len;
    }
    return frag;
  }

  function snippet(text) {
    var lower = text.toLowerCase();
    var at = lower.indexOf(words[0]);
    if (at === -1) return text.slice(0, 160) + (text.length > 160 ? ' ...' : '');
    var start = Math.max(0, at - 60);
    var end = Math.min(text.length, at + 100);
    return (start > 0 ? '... ' : '') + text.slice(start, end) + (end < text.length ? ' ...' : '');
  }

  fetch(box.getAttribute('data-index'))
    .then(function (res) { return res.json(); })
    .then(function (posts) {
      var hits = posts.filter(function (p) {
        var hay = (p.title + ' ' + p.text).toLowerCase();
        return words.every(function (w) { return hay.indexOf(w) !== -1; });
      });

      box.textContent = '';
      box.appendChild(el('p', hits.length + (hits.length === 1 ? ' result' : ' results') + ' for "' + query + '"'));
      hits.forEach(function (p) {
        var item = el('p');
        item.className = 'Feature';
        var a = el('a');
        a.href = p.url;
        a.appendChild(highlight(p.title));
        item.appendChild(a);
        var date = el('span', ' (' + p.date + ')');
        date.className = 'Smaller';
        item.appendChild(date);
        item.appendChild(el('br'));
        item.appendChild(highlight(snippet(p.text)));
        box.appendChild(item);
      });
    })
    .catch(function () {
      box.textContent = "Couldn't load the search index.";
    });
})();
