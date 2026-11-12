# 소리 출처와 라이선스

게임에 쓰는 녹음 소리 파일의 출처를 적는다(SOUND-1 계획서 5절). 합성 소리(`src/audio/synth.ts`·`ambience.ts`)는 파일이 없어 여기 적지 않는다.

| 게임 파일 | 원본 | 출처 | 라이선스 | 지은이·제목 | 바꾼 것 |
|---|---|---|---|---|---|
| `waves.ogg` | `art-source/audio/wave.mp3`(2분 54초, 320kbps 스테레오) | 공유마당 https://gongu.copyright.or.kr (UCI G905-13220737, 원문 파일 `806027_잔잔히 밀려오는 파도소리.mp3`) | CC BY | 한국저작권위원회, 「잔잔히 밀려오는 파도소리」(2019) | 14.2~46.5초(파도 두 번)를 잘라 끝 2초를 처음과 겹쳐 이음매 없는 고리로, 모노·50Hz 아래 깎음·Opus 24kbps(81KB). `tools/audio/make_loop.py` |

CC BY는 저작자 표시가 조건이다. 게임 안 '만든 사람들'(크레디트) 화면이 생기면 이 표의 지은이·제목·출처·라이선스를 그대로 보여 준다.

크레디트 표기 예: 「잔잔히 밀려오는 파도소리」 © 한국저작권위원회, 공유마당, CC BY (일부 잘라 고리로 편집)

## 픽사베이 (Pixabay Content License, 2026-11-04 받음)

무료, 출처 표기 의무 없음(고마움을 담아 적어 둔다). 원본을 그대로 다시 나눠 주는 것은 금지라 원본 mp3는 저장소에 올리지 않는다(`art-source/audio/pixabay/`, git 제외). 라이선스: https://pixabay.com/service/license-summary/

| 게임 파일 | 지은이·제목 | 출처 | 바꾼 것 |
|---|---|---|---|
| `river.ogg` | DRAGON-STUDIO, Peaceful Stream | https://pixabay.com/sound-effects/nature-peaceful-stream-420898/ | 132~162초(30초)를 고리로, 모노·Opus 24kbps |
| `fire.ogg` | SoundReality, Campfire Crackling Sound | https://pixabay.com/sound-effects/nature-campfire-crackling-sound-439573/ | 4~34초(30초)를 고리로, 모노·Opus 32kbps |
| `wind.ogg` | DRAGON-STUDIO, Gentle Wind Gusts | https://pixabay.com/sound-effects/nature-gentle-wind-gusts-447502/ | 0.5~23초(22.5초)를 고리로, 모노·Opus 24kbps |
