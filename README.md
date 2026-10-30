# wxxminjeong의 개발 홈페이지

90년대 개인 홈페이지 감성의 개발 블로그입니다. → https://wxxminjeong.github.io

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
- `tags`는 생략해도 되고, 쓰면 [태그] 페이지에 자동으로 묶입니다.
- 최근 14일 안에 쓴 글에는 `NEW!` 표시가 붙습니다. (`_config.yml`의 `new_days`)
- 이미지는 `assets/img/` 등에 넣고 `![설명](/assets/img/파일.png)`로 씁니다.

## 설정 바꾸기

`_config.yml`에서 사이트 제목, 전광판 문구, 사이드바 링크, 마우스 반짝이 on/off 등을 바꿀 수 있습니다.
자기소개는 `about.md`를 고치면 됩니다.

## 방명록

방명록은 이 저장소의 **GitHub Issues**를 씁니다. 제목이 `[방명록]`으로 시작하는 이슈가 방명록 페이지에 표시됩니다.
(저장소 Settings → General → Features에서 Issues가 켜져 있어야 합니다.)

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
_includes/         사이드바, 바닥글, 게시판 목록 등 조각
assets/css/        스타일 (윈도우 95 창, 도스 코드 블록 ...)
assets/js/         방문자 카운터, 반짝이, 코드 복사, 방명록
assets/img/        픽셀 GIF (배경, NEW!, 공사중, 88x31 버튼)
assets/fonts/      갈무리 픽셀 폰트
```

## 크레딧

- 글꼴: [갈무리 (Galmuri)](https://github.com/quiple/galmuri) by Lee Minseo — SIL Open Font License 1.1 (`assets/fonts/Galmuri-OFL.txt`)
