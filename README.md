# 프로젝트 소개 #
## Lyrics Translate Chat Bot ##
외국어 가사의 발음을 전사해 쉽게 따라부를 수 있게 도와주는 챗봇입니다

### 개발환경 ###
node.js
express
JavaScript
python 2.7

### API ###
Musixmatch API
English-Korean Transliteration - https://github.com/muik/transliteration
Hangulize - python 버전, https://github.com/sublee/hangulize

## 사용방법 ##
네이버 라인
(QR 코드)

네이버 라인 기반 챗봇으로 위 QR 코드로 친구 추가하시면 사용가능합니다.
영어, 일본어, 프랑스어 등 Musixmatch에서 지원하는 노래 가사를 번역 가능합니다.
영어의 경우 어색한 발음이 나올 수 있습니다.

명령어
help - 사용 방법을 알려드립니다
"가수명", "노래명" - 해당하는 노래의 한글 발음을 전달합니다. (대소문자 구분 X)

## 빌드 방법  ##
해당 봇을 빌드하기 위해서
Musixmatch API
Papago API
Line
에서 API key를 발급받아야 합니다.

### Musixmatch ###
https://developer.musixmatch.com/ 에 가입해 api key를 발급받습니다.

### Papago ###

### Line ###


## Liscence ##
본 Lyrics Translate Chat Bot은 Musixmatch의 Free Plan을 사용하며,
출력되는 가사에 대한 저작권을 소유하고 있지 않습니다. 어떠한 상업적인 용도로 사용하는 것을 금합니다.
