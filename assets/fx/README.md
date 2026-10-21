# FX-1 불꽃·연기 그림

- `fire-smoke.png`: Codex 내장 `image_gen`으로 생성한 투명 PNG. 왼쪽은 만화 불꽃, 오른쪽은 둥근 연기다. 원본 알파를 유지했으며 코드로 그림을 그리거나 합성하지 않았다.
- 게임은 이 한 장을 공유하고, `src/game/fire-fx.ts`에서 판 흔들림·불티·빛·연기 이동만 계산한다. 판석은 그림 없이 기존 팔레트와 입체 모양만 쓴다.
- 생성 프롬프트:

> Use case: stylized-concept. Asset type: transparent game VFX texture atlas for a warm low-poly cartoon island survival game. Create one square PNG with exactly two equally sized square cells arranged left and right across the middle, separated by ample fully transparent padding. Left cell: ONE upright campfire flame silhouette, wide near bottom tapering into three asymmetric angular forked tips, cream-yellow base, golden center, orange upper tips, only 3-4 clearly flat faceted color bands, no outlines, no logs, no detached sparks, no shadow, no ground. The flame fills its cell with padding. Right cell: ONE neutral white-gray round fluffy smoke puff, softly transparent lobed irregular edges, low-poly cartoon soft faceted inner masses, no stem or trail, suitable for tinting. Smoke fills its cell with padding. Actual alpha transparency everywhere outside both sprites. No background, no checkerboard, no text or labels, no realism. Save the image for this project.

## VIS-1 먼 배·먼 섬 (2026-10-18)

- Codex 내장 `image_gen`으로 각각 생성한 투명 PNG. 외부 그림·모델은 사용하지 않았다. 원본 알파를 유지하고, 유효 알파 영역의 여백 정리·Lanczos 축소·투명 캔버스 배치만 했다. 기존 PNG·GLB는 수정하지 않았다.
- `far-ship.png`: 768×256, 107,878바이트. 원본 `exec-9bf45786-071b-4690-97c7-22aa8f122c2c.png`.
- `far-land.png`: 960×160, 95,746바이트. 원본 `exec-63c57cc3-9044-4a3d-a74c-09682d782dc3.png`.
- 원본 생성 세션: `01a14df6-a4e4-7771-b99e-f2d428afa992`. 배·섬 밑동을 캔버스 높이 약 87%에 맞춰 게임의 수면 아래로 숨긴다. 그림의 색을 살리면서 `horizon.ts`가 밑동을 현재 안개 색에 섞고, 물과 같은 거리 안개를 적용한다.
- 배 프롬프트:

> Use case: stylized-concept. Asset type: transparent game sprite for a warm low-poly island survival game. One small distant sailing ship, exact side-on profile, long low wooden hull and two masts with three simple cream triangular sails. Painterly low-poly faceted shapes, soft hazy edges, backlit atmospheric blue-grey with muted warm beige sail highlights; never pure black, no outlines or cartoon ink. A tiny pale wake line directly along the hull waterline. Wide 3:1 overall canvas, subject centered with transparent padding, hull bottom at about 85 percent canvas height. The ship should occupy most of the width, suitable for shrinking to 768x256 pixels. Actual alpha transparency outside ship and tiny wake; no sea rectangle, no sky, no scene background, no horizon, no text, no watermark. Keep silhouette readable at a great distance.

- 섬 프롬프트:

> Use case: stylized-concept. Asset type: distant island sprite for warm low-poly painterly survival game. Single long low blue-grey island ridge, about 6 times wider than tall, loosely shaped as a small rounded island with ONE rounded central peak and low shoulders, tiny irregular tree-line bumps. Hazy atmospheric backlit silhouette with subtle flat faceted painterly variations, lighter misty blue toward top, muted warm slate lower slopes, never flat black. Base softly dissolves into a pale sea-blue haze along a perfectly level waterline, no separate reflection. Actual alpha transparent background outside island, no sky or rectangular ocean background, no clouds, no sun, no buildings, no text or watermark. Extra-wide composition occupying most width, transparent padding above and at sides, suitable for a 960x160 game PNG; softly feathered edges.
