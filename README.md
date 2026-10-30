# wxxminjeong의 개발 홈페이지

90년대 넷스케이프 시절 개인 홈페이지처럼 만든 개발 블로그입니다. → https://wxxminjeong.github.io

Jekyll로 만들었고, GitHub Pages가 알아서 빌드해 줍니다.

## 글 쓰기

`_posts/` 폴더에 `YYYY-MM-DD-제목.md` 파일을 만들면 끝입니다.

```markdown
---
title: "글 제목"
date: 2026-10-30 21:00:00 +0900
tags: [Java, 알고리즘]
---

여기에 마크다운으로 본문을 씁니다.
```

- 파일명의 제목 부분은 URL이 되므로 영어/숫자/하이픈(`-`)을 권장합니다. (예: `2026-10-30-spring-boot-start.md`)
- 날짜가 미래인 글은 그 시각이 지나서 다시 빌드될 때까지 보이지 않습니다.
- `tags`는 생략해도 되고, 쓰면 [분류] 페이지에 자동으로 묶입니다.
- 첫 문단은 첫 화면의 "최근에 쓴 글"에 요약으로 나옵니다.
- 최근 14일 안에 쓴 글에는 `NEW` 그림이 붙습니다. (`_config.yml`의 `new_days`)
- 이미지는 `assets/img/` 등에 넣고 `![설명](/assets/img/파일.png)`로 씁니다.

## 설정 바꾸기

`_config.yml`에서 사이트 제목, 소개 문구, GitHub 아이디 등을 바꿀 수 있습니다.
자기소개는 `about.md`를 고치면 됩니다.

## 방명록

방명록은 이 저장소의 **GitHub Issues**를 씁니다. 방명록 페이지에서 글을 쓰면 GitHub 이슈 작성 화면으로 넘어가고,
제목이 `[방명록]`으로 시작하는 이슈가 방명록 페이지에 표시됩니다.
(저장소 Settings → General → Features에서 Issues가 켜져 있어야 합니다.)

## 로컬에서 미리보기

Ruby가 설치되어 있다면:

```bash
bundle install
bundle exec jekyll serve
```

→ http://localhost:4000

## 생김새에 대해

- 회색 배경, 파란/보라 밑줄 링크, Times 글꼴은 넷스케이프 내비게이터의 기본 모양입니다.
  CSS가 아니라 `<body bgcolor="#C0C0C0" link="#0000EE" vlink="#551A8B">` 같은 HTML 속성으로 냈습니다.
- 웹폰트는 쓰지 않습니다. 컴퓨터에 있는 Times New Roman·바탕·Courier New로 보입니다.
- 코드는 그 시절처럼 색 없이 `<pre>`로 나옵니다.
- `assets/css/style.css`에는 요즘 화면에서 읽기 위해 꼭 필요한 것(본문 폭, 표 테두리, 입력창)만 있습니다.

## 구조

```
_config.yml        사이트 설정
_posts/            블로그 글 (마크다운)
_layouts/          default(전체 틀) / post(글) / page(일반 페이지)
_includes/         메뉴, 바닥글, 날짜 표시, NEW 표시
assets/css/        최소한의 스타일
assets/js/         방명록 불러오기
assets/img/        new.gif, redball.gif
```
