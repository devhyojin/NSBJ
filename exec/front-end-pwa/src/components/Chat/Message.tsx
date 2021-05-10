import React, { useRef, useState, useEffect } from 'react';
// import axios from 'axios';
import ChatButton from './ChatButton';

import '../../styles/_message.scss';

// const SERVER_URL = process.env.REACT_APP_URL;

export default function Message({ message, user, mode }: any) {
  const initFeedbackInfo = { id: 0, user_id: 0, receiver_id: 0, receiver_nickname: null };
  const [feedbackInfo, setFeedbackInfo] = useState(initFeedbackInfo);
  const [feedbackModalStatus, setFeedbackModalStatus] = useState<boolean>(false);

  // const getFeedbackInfo = (): void => {
  //   // 1. 피드백 관련 모든 정보 업데이트 해주기
  //   axios.get(`${SERVER_URL}/mypage`, { params: { id: userId } }).then((res) => {
  //     const tempFeedbackInfo = { ...feedbackInfo };
  //     tempFeedbackInfo[id] = res.feedback;
  //     tempFeedbackInfo[user_id] = res.user_id;
  //     tempFeedbackInfo[recevier_id] = res.recevier_id;
  //     tempFeedbackInfo[recevier_nickname] = res.recevier_nickname;
  //     setFeedbackInfo(tempFeedbackInfo);
  //   });
  // };
  const changeFeedbackModalStatus = (): void => {
    // 접근 권한이 있을 때만 모달을 열 수 있다. 이미 피드백한 경우, 과거 피드백 당시의 타유저의 id와 닉네임이 현재와 모두 동일하다면, 접근권한이 없어 alert가 뜬다.
    // if (feedbackInfo.id) {
    //   setFeedbackModalStatus(!feedbackModalStatus);
    // } else {
    //      alert("이미 포인트를 주었습니다.")
    // }
    setFeedbackModalStatus(!feedbackModalStatus);
  };
  let coverClassName = 'message__content__cover ';
  let profileClassName = 'message__profile';
  let messageClassName = 'message ';
  const messageRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  if (message.user_id === user[0].user_id) {
    messageClassName += 'my__message ';
    profileClassName = '';
    coverClassName += 'my__cover ';
  } else {
    messageClassName += 'other__message ';
  }

  if (mode === 'light') {
    messageClassName += 'message__light ';
  } else {
    messageClassName += 'message__dark ';
  }

  useEffect(() => {
    messageRef.current.focus();
  });

  return (
    <div>
      <div className="message__cover" ref={messageRef}>
        <div
          role="button"
          tabIndex={0}
          onKeyDown={() => null}
          onClick={() => changeFeedbackModalStatus()}
          className={profileClassName}
        >
          {null}
        </div>
        {feedbackModalStatus && <ChatButton mode={mode} feedbackInfo={feedbackInfo} />}
        <div className={coverClassName}>
          <div className="nick__badge">
            {null} <br /> nickname
          </div>
          <div className={messageClassName}>
            <span>{message.msg}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
