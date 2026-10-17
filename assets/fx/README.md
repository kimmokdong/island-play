# FX-1 불꽃·연기 그림

- `fire-smoke.png`: Codex 내장 `image_gen`으로 생성한 투명 PNG. 왼쪽은 만화 불꽃, 오른쪽은 둥근 연기다. 원본 알파를 유지했으며 코드로 그림을 그리거나 합성하지 않았다.
- 게임은 이 한 장을 공유하고, `src/game/fire-fx.ts`에서 판 흔들림·불티·빛·연기 이동만 계산한다. 판석은 그림 없이 기존 팔레트와 입체 모양만 쓴다.
- 생성 프롬프트:

> Use case: stylized-concept. Asset type: transparent game VFX texture atlas for a warm low-poly cartoon island survival game. Create one square PNG with exactly two equally sized square cells arranged left and right across the middle, separated by ample fully transparent padding. Left cell: ONE upright campfire flame silhouette, wide near bottom tapering into three asymmetric angular forked tips, cream-yellow base, golden center, orange upper tips, only 3-4 clearly flat faceted color bands, no outlines, no logs, no detached sparks, no shadow, no ground. The flame fills its cell with padding. Right cell: ONE neutral white-gray round fluffy smoke puff, softly transparent lobed irregular edges, low-poly cartoon soft faceted inner masses, no stem or trail, suitable for tinting. Smoke fills its cell with padding. Actual alpha transparency everywhere outside both sprites. No background, no checkerboard, no text or labels, no realism. Save the image for this project.
