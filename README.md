# wxxminjeong.github.io

[LWN.net](https://lwn.net/)의 레이아웃 구조(왼쪽 메뉴, 위쪽 막대, 제목 띠)를 참고한 영어 개발 블로그입니다. → https://wxxminjeong.github.io

Jekyll로 만들었고, GitHub Pages가 알아서 빌드해 줍니다.

## 글 쓰기

`_posts/` 폴더에 `YYYY-MM-DD-제목.md` 파일을 만들면 끝입니다.

```markdown
---
title: "글 제목"
date: 2026-10-30 21:00:00 +0900
tags: [Java, 알고리즘]
---

첫 문단은 첫 화면에 요약으로 나갑니다.

여기부터 본문을 마크다운으로 씁니다.
```

- 파일명의 제목 부분은 URL이 되므로 영어/숫자/하이픈(`-`)을 권장합니다. (예: `2026-10-30-spring-boot-start.md`)
- 날짜가 미래인 글은 그 시각이 지나서 다시 빌드될 때까지 보이지 않습니다.
- 첫 화면 요약을 첫 문단 대신 따로 쓰고 싶으면 머리말에 `excerpt: "Summary"`를 넣습니다.
- `tags`는 생략해도 되고, 쓰면 [분류] 페이지에 자동으로 묶입니다.
- 이미지는 `assets/img/` 등에 넣고 `![설명](/assets/img/파일.png)`로 씁니다.

## 설정 바꾸기

`_config.yml`에서 사이트 제목, 소개 문구, 왼쪽 위 로고 글씨(`brand`), 첫 화면 글 개수 등을 바꿀 수 있습니다.
자기소개는 `about.md`를 고치면 됩니다.

## 댓글 (giscus)

댓글은 [giscus](https://giscus.app)를 씁니다. 댓글은 이 저장소의 **GitHub Discussions**(Announcements 카테고리)에 저장되고,
방문자는 글 아래에서 GitHub로 로그인해 바로 댓글·답글·반응을 남길 수 있습니다.

- 글마다 주소(pathname)로 Discussion이 하나씩 연결되고, 첫 댓글이 달릴 때 자동으로 만들어집니다.
- 글 주소(파일명이나 날짜)를 바꾸면 이전 댓글은 연결이 끊깁니다.
- 댓글 관리(삭제, 숨기기)는 저장소의 Discussions 탭에서 합니다.
- 댓글 창 색은 `assets/css/giscus.css`에서 바꿉니다. (giscus 기본 테마에서 색 변수만 바꾼 파일)
- 설정 값은 `_config.yml`의 `giscus` 항목에 있습니다.

## 검색

빌드할 때 `/search.json`에 모든 글이 모이고, 검색 페이지가 그걸 읽어서 찾습니다. 외부 서비스는 쓰지 않습니다.

## 로컬에서 미리보기

Ruby가 설치되어 있다면:

```bash
bundle install
bundle exec jekyll serve
```

→ http://localhost:4000

## 구조

```
_config.yml        사이트 설정
_posts/            블로그 글 (마크다운)
_layouts/          default(전체 틀) / post(글) / page(일반 페이지)
_includes/         왼쪽 메뉴, 위쪽 막대, 바닥글, 날짜 표시
assets/css/        사이트 스타일, giscus 댓글 창 테마 (밝은/어두운 화면 모두)
assets/js/         검색
search.json        검색 색인
```
