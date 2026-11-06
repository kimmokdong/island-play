# 지형 질감 2판 (ENV-2 ground)

2026-10-18, 내장 `image_gen`으로 각 재질을 **개별 생성**했다. 원본은 1254×1254, 게임용은 512×512 WebP(품질 90)다. 기존 `*-256.png`와 `*-512.png`는 보존한다. `?env=v1`은 기존 256 PNG와 기존 셰이더를 사용한다.

| 파일 | 바이트 | 색과 표면 |
|---|---:|---|
| sand-v2-512.webp | 31,550 | 따뜻한 크림 모래, 작은 조개 조각·알갱이 |
| grass-v2-512.webp | 74,862 | 노랑 연두, 짧은 풀 붓질·작은 클로버 |
| dirt-v2-512.webp | 75,566 | 붉지 않은 올리브 갈색 흙·이끼·낙엽 |
| rock-v2-512.webp | 45,390 | 회보라 돌의 얕은 면과 미세한 이끼 |

공통 프롬프트: `Use case: stylized-concept. Asset type: seamless tileable albedo terrain texture for a bright cute warm low-poly island game. ONE square top-down orthographic flat surface filling entire image, seamless opposite edges. Fine delicate angular painterly strokes, low contrast, small evenly distributed details. No perspective, horizon, strong lighting, cast shadows, vignette, border, or text. Not photographic. Output 512x512 if possible.`

재질별 추가 지시:

- 모래: `Warm cream pale golden sand (#F2D5A9), tiny shell fragments and grain flecks distributed evenly, subtle angular painterly strokes and delicate shallow ripples. No large objects, no realistic photographic gravel or orange noise.`
- 풀: `Soft mid yellow-green meadow (#91A165 with #B9CF7E highlights, #6E8F4E shadows). Evenly distributed tiny clover leaves, short blade strokes, patches of subtle varied greens. Low contrast background beneath 3D plants, no large bunches, no bare soil, no flowers, not noisy, not bubbly.`
- 숲 흙: `Muted olive-brown soil (#7E704F, #9B9270) and soft olive moss, scattered tiny tan leaf litter fragments, little twigs and delicate flecks. Warm and readable, never red-orange mud, never dark gloomy. No large leaves or rocks.`
- 바위: `Soft grey-violet stone (#9898A0, #C6C5C8, subtle #777581 fissures), tiny warm mineral flecks and sparse muted olive moss speckles. Fine shallow angular facets, low contrast mottled broad stone with small detail, no giant cracks, no separate piles of stones.`

생성 원본 식별자(공통 묶음 `01a14edf-d4b2-79b2-8d6a-18e512adb4e2`): 모래 `exec-6f2e347c-7682-4dd5-9490-b53389a124a7.png`, 풀 `exec-6108d990-9ec9-4188-b37c-17bce7b8a267.png`, 흙 `exec-a8d062f6-d1dc-4384-b9ee-634983d3edf2.png`, 바위 `exec-253a5dfb-0ff3-419d-9a61-1326f1128bcb.png`.

처리: `tools/art/env2-ground-textures.mjs <playwright-core/index.mjs> <모래 원본> <풀 원본> <흙 원본> <바위 원본>`. Chrome Canvas로 축소하고 가장자리 16px만 맞은편과 섞는다. 압축 전 양쪽 경계 픽셀 차이 0, 각각 250KB 이하를 자체 검사한다. WebP 손실 압축 후에는 작은 경계 오차가 있을 수 있다. 새 그림을 코드로 만들거나 원본의 내용물을 추가하지 않았다.

게임에서는 2.4m 반복 + 1.37배·회전한 두 번째 샘플을 느린 노이즈로 섞고, 약 40m 규모의 밝기·색 변화를 더한다. 노이즈는 꼭짓점에서 계산해 보간하고, 가중치가 0인 재질은 읽지 않아 보통 픽셀당 2~4회만 샘플링한다. 분기 전에 구한 기울기를 `textureGrad`에 넘겨 재질 경계에서도 밉맵을 유지한다. 재질·광원·드로우 수는 늘리지 않는다. 기존 anisotropy=1을 유지한다. XZ 투영이므로 수직 절벽에서 늘어나는 기존 한계는 남아 있다.
