---
title: "Poly Survivor"
date: 2026-10-30 14:30:00 +0900
category: Projects
lang: ko
---

로블록스 플랫폼 기반의 뱀파이어 서바이벌 방식 액션 게임입니다.

[Roblox에서 플레이하기](https://www.roblox.com/games/97566754394912/Poly-Survivor)

<figure class="shot">
<a href="/assets/img/posts/poly-survivor/swarm.jpg"><img src="/assets/img/posts/poly-survivor/swarm.jpg" alt="게임 화면" width="1600" height="900"></a>
<figcaption>게임 화면</figcaption>
</figure>

<div class="shots">
<figure class="shot">
<a href="/assets/img/posts/poly-survivor/boss.jpg"><img src="/assets/img/posts/poly-survivor/boss.jpg" alt="보스" width="1600" height="900" loading="lazy"></a>
<figcaption>보스</figcaption>
</figure>
<figure class="shot">
<a href="/assets/img/posts/poly-survivor/levelup.jpg"><img src="/assets/img/posts/poly-survivor/levelup.jpg" alt="레벨업 강화 선택" width="1600" height="900" loading="lazy"></a>
<figcaption>레벨업 강화 선택</figcaption>
</figure>
</div>

<figure class="shot">
<a href="/assets/img/posts/poly-survivor/lobby.jpg"><img src="/assets/img/posts/poly-survivor/lobby.jpg" alt="로비" width="1600" height="900" loading="lazy"></a>
<figcaption>로비</figcaption>
</figure>

## 개발 환경

### 사용 도구

| 도구 | 용도 |
|---|---|
| Roblox Studio | 맵 편집, 플레이 테스트 |
| Rojo 7.7.1 | 로컬 스크립트를 Studio에 실시간 동기화 |
| Luau | 게임 스크립트 (`--!strict`) |
| luau-lsp / selene / StyLua | 타입 검사 / 린트 / 포맷 |
| Lute | Luau 단위 테스트 |
| Rokit | 도구 버전 관리 |
| Git | 버전 관리 |

### 작업 방식

1. 외부 에디터에서 `.luau` 파일로 스크립트 작성
2. `rojo serve`로 Roblox Studio에 실시간 반영
3. 포맷·린트·타입 검사·빌드·테스트를 한 번에 돌린 뒤 커밋
4. Roblox Studio에서 플레이 테스트
