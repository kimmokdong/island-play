# 하늘 그림

기존 `sun.png`·`moon.png`는 그대로 사용한다.

## ENV-2 뭉게구름 아틀라스

- 파일: `clouds-v2.png`, 768×768 RGBA PNG, 259,724바이트(약 254KiB).
- 제작: Codex 내장 `image_gen`, 2026-10-18. 투명 배경 생성. 원본은 작업트리의 `output/imagegen/clouds-original.png`에 보존한다.
- 2×2칸: 왼쪽 위 작은 뭉게구름, 오른쪽 위 높은 구름, 왼쪽 아래 낮고 넓은 구름, 오른쪽 아래 비대칭 구름.
- 원본 알파를 유지한 채 Pillow Lanczos로 1280→768 축소, PNG 무손실 압축. 새 외곽선·배경·그림을 합성하지 않았다.
- 런타임: sRGB 텍스처 1장, 인스턴스 판 18장, 깊이 순 정렬·깊이 쓰기 끔·미세 알파 제거. 가장자리 투명도는 유지한다.

생성 프롬프트:

> Use case: stylized-concept. Asset type: game sprite atlas, one square transparent PNG. Create exactly FOUR separate fluffy cumulus cloud sprites in a precise 2 by 2 grid, one fully isolated cloud centered within each quadrant with generous completely transparent gutters and margins (at least 8% of each cell). Each cloud is a distinct horizontally broad silhouette: small rounded cumulus, taller piled cumulus, wide low cumulus, asymmetric medium cumulus. Bright cute warm low-poly island game, soft painterly smooth rounded volumes, cream white sunlit upper lobes and subtle soft blue-grey undersides. Soft but well defined edges, clean actual alpha transparency, opaque cloud cores. Frontal side view suitable for Y-axis camera-facing billboards. No sky, no ground, no shadows outside cloud, no text, no border, no checkerboard, no sun, no extra objects. Do not overlap cells. Match illumination across all four sprites.
