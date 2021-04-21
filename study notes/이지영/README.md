# Daily Log

> 일일 학습/개발일지

## 2021-04-20 TUE

- 기능 명세서 수정
- 와이어프레임 수정
- DB 설계 (초안)

## 2021-04-21 WED

#### Log

- 기능 명세서 수정 (진짜 끝난 것 같음)
- 프로젝트 간트 차트 생성
- RDBMS DB 설계 완료, ERD 작성 완료
- Jira, Git convention 정의 완료

#### Studied

Spring Boot와 WebSocket을 이용한 기본적인 채팅 서버 예제 구현

 - WebSocketHandler를 통해 클라이언트가 발송한 메세지를 handle
     - `payload`로 메세지를 받아서 `ObjectMapper`를 통해 payload의 내용을 `ChatMessage.class` 의 java 형식으로 변환
  - 채팅방에 메세지 발송
      - 받은 메세지를 채팅방 내 모든 세션에 발송
      - `new TextMessage(objectMapper.writeValueAsString(message))` 를 통해 메세지 생성 후 각 세션에게 보내줌
  - 기억할 것) WebSocketSession = 채팅방에 등록된 클라이언트
