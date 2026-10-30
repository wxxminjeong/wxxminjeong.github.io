---
title: "WX CRUSHER"
date: 2026-10-30 16:30:00 +0900
category: Projects
lang: ko
---

**Drive**, **Bitcrush**, **Clipper** 세 단계를 각각 따로 조절할 수 있는 디지털 디스토션 플러그인(VST3)

[GitHub](https://github.com/wxxminjeong/WX_CRUSHER) · [다운로드 (Releases)](https://github.com/wxxminjeong/WX_CRUSHER/releases)

<figure class="shot">
<a href="/assets/img/posts/wx-crusher/screenshot.png"><img src="/assets/img/posts/wx-crusher/screenshot.png" alt="WX CRUSHER 플러그인 화면" width="960" height="600"></a>
<figcaption>플러그인 화면</figcaption>
</figure>

## 신호 흐름

```
Input → Drive → Bitcrush → Clipper → Mix → Output
```

## 노브

| 섹션 | 노브 | 범위 | 하는 일 |
|---|---|---|---|
| Drive | Gain | 0 ~ +26 dB | 입력 소리를 키운다. 많이 키울수록 Clipper에서 더 세게 잘린다. |
| Bitcrush | Bit depth | 16 ~ 1 bit | 비트 해상도를 낮춰 계단 모양의 거친 노이즈를 만든다. 16 bit면 소리가 그대로다. |
| Clipper | Ceiling | 0 ~ −24 dB | 천장(Ceiling)을 넘는 부분을 잘라내(하드 클리핑) 파형의 꼭대기를 평평하게 만든다. 천장이 낮을수록 더 많이 잘리고 출력은 작아진다. |
| Mix | Dry / wet | 0 ~ 100 % | 원래 소리와 처리된 소리를 섞는다. |
| Output | Level | −24 ~ +12 dB | 최종 출력 크기 |

- Drive, Bitcrush, Clipper에는 각각 **ON / OFF** 버튼이 있다.
- 세 스테이지 노브는 모두 오른쪽으로 돌릴수록 효과가 세진다. Bitcrush와 Clipper는 오른쪽으로 돌릴수록 숫자가 작아진다.
- 노브 변화와 ON / OFF 전환은 부드럽게 처리해서, 오토메이션을 쓰거나 스테이지를 켜고 끌 때 '틱' 소리가 나지 않는다.

## 화면

- **WAVE**: 오실로스코프. 회색이 입력, 흰색이 출력이다. Clipper가 소리를 자르는 동안 출력 파형이 빨갛게 변한다.
- **SPECTRUM**: 입력(회색)과 출력(흰색)의 주파수 스펙트럼. 디스토션이 더한 배음이 보인다.
- **TRANSFER**: 지금 설정이 입력 크기를 출력 크기로 어떻게 바꾸는지 보여주는 그래프. 점선 대각선은 처리하지 않은 소리, 빨간 영역은 그 차이, 빨간 점은 지금 들어오는 소리의 크기다. Drive가 높으면 입력 축이 확대되고, 배율은 오른쪽 위에 표시된다.
- **IN / OUT**: 피크 홀드가 있는 피크 미터
- 각 스테이지 아래의 **LED**는 그 스테이지가 실제로 소리를 바꾸고 있을 때 켜진다.

## 사용법

1. 트랙에 WX CRUSHER를 건다.
2. **Drive**를 올린다. Clipper가 켜져 있고 0 dB이면 큰 소리부터 평평하게 잘리기 시작한다.
3. 거친 질감이 필요하면 **Bitcrush**를 오른쪽으로 돌린다.
4. 더 세게 자르려면 **Clipper** 천장을 낮추고, Drive와 Bitcrush만 들어보려면 Clipper를 끈다.
5. **Mix**로 원래 소리를 섞고 **Output**으로 크기를 맞춘다.

- 노브를 더블클릭하면 기본값으로 돌아간다. 노브 아래 숫자를 클릭하면 값을 직접 입력할 수 있다.
- 오른쪽 아래 모서리를 드래그하면 창 크기를 바꿀 수 있다 (75 % ~ 160 %).
- 노브 값, 선택한 화면, 창 크기는 DAW 프로젝트에 같이 저장된다.
- Clipper를 끄고 Drive를 올리면 출력이 입력보다 최대 26 dB 커질 수 있으니 Output을 내려야 한다.

## 설치

1. [Releases](https://github.com/wxxminjeong/WX_CRUSHER/releases)에서 `wxCrusher.vst3`를 받는다.
2. `C:\Program Files\Common Files\VST3`에 복사한다.
3. DAW에서 플러그인을 다시 스캔한다.

## 개발 환경

### 사용 도구

| 도구 | 용도 |
|---|---|
| JUCE 8 (Projucer) | 플러그인 프레임워크, 프로젝트 설정 |
| C++17 | 플러그인 코드 |
| Visual Studio 2026 / Xcode | 빌드 |

### 파일 구성

| 파일 | 내용 |
|---|---|
| `Source/PluginProcessor` | 파라미터, 스무딩, 오디오 처리 |
| `Source/WxDsp.h` | Drive / Bitcrush / Clipper 수식 (TRANSFER 그래프도 같은 수식 사용) |
| `Source/WxVisualTap.h` | 오디오 스레드를 멈추지 않고 화면으로 오디오 데이터를 넘김 |
| `Source/PluginEditor` | 창 배치, 초당 60번 화면 갱신 |
| `Source/WxControls` | 스테이지 패널 (이름, ON / OFF, 노브, LED) |
| `Source/WxDisplays` | WAVE, SPECTRUM, TRANSFER, 미터 |
| `Source/WxLookAndFeel` | 색, 폰트, 노브와 버튼 그리기 |

폰트는 [Anton](https://github.com/googlefonts/AntonFont)과 [Space Mono](https://github.com/googlefonts/spacemono)를 SIL Open Font License 1.1로 포함했다.
