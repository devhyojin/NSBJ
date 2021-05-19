import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import FeedbackButton from './FeedbackButton';
import '../../styles/_message.scss';

const SERVER_URL = process.env.REACT_APP_URL;

export default function Message({ msg, user_id, region_id, mode, skipProfile, sendFeedback }: any) {
  useEffect(() => {
    // reset();
  }, []);

  // 리셋용
  const reset = () => {
    axios
      .patch(
        `${SERVER_URL}/chat/test`,
        {},
        {
          params: {
            receiver_bird: msg.bird_name,
            receiver_id: msg.sender_id,
            room_id: msg.room_id,
            sender_id: user_id,
          },
        },
      )
      .then((res) => {
        console.log('초기화성공', res);
      });
  };

  let coverClassName = 'message__content__cover ';
  let profileClassName = 'message__profile ';
  let messageClassName = 'message ';
  let badgeClassName = 'nick__badge ';
  let timeClassName = 'time__stamp ';
  const messageCoverName = `message__cover profile__${mode}`;
  const messageRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  if (msg.sender_id === user_id) {
    messageClassName += 'my__message ';
    profileClassName = '';
    coverClassName += 'my__cover ';
    timeClassName += 'display__none';
  } else if (!skipProfile) {
    profileClassName += `img__${msg.profile_img}`;
    messageClassName += 'other__message ';
  } else {
    badgeClassName += 'display__none';
    timeClassName += 'display__none';
    profileClassName += 'display__none';
  }
  messageClassName += `message__${mode} `;

  const [isFeedbackActive, setIsFeedbackActive] = useState<boolean>(false);
  const changeIsFeedbackActive = (): void => {
    setIsFeedbackActive(!isFeedbackActive);
  };
  // 남의 것 클릭했을 때만 열리기
  const openFeedbackComponent = () => {
    if (user_id !== msg.sender_id) {
      changeIsFeedbackActive();
    }
  };

  return (
    <div>
      <div className={messageCoverName} ref={messageRef}>
        <div
          role="button"
          tabIndex={0}
          onKeyDown={() => null}
          onClick={() => openFeedbackComponent()}
          className={profileClassName}
        >
          <span className={timeClassName}>{msg.sent_at}</span>
        </div>
        {isFeedbackActive && (
          <FeedbackButton
            msg={msg}
            setIsFeedbackActive={setIsFeedbackActive}
            sendFeedback={sendFeedback}
            region_id={region_id}
            user_id={user_id}
          />
        )}
        <div className={coverClassName}>
          <div className={badgeClassName}>
            {null} <br /> {mode === 'light' ? msg.bird_name : msg.mouse_name}
          </div>
          <div className={messageClassName}>
            <span>{msg.message}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
