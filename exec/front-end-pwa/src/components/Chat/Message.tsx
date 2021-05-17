import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import ChatButton from './ChatButton';

import '../../styles/_message.scss';

const SERVER_URL = process.env.REACT_APP_URL;

export default function Message({ msg, user_id, region_id, mode, skipProfile }: any) {
  const [feedbackModalStatus, setFeedbackModalStatus] = useState<boolean>(false);
  const changeFeedbackModalStatus = (): void => {
    setFeedbackModalStatus(!feedbackModalStatus);
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
  }

  messageClassName += `message__${mode} `;

  return (
    <div>
      <div className={messageCoverName} ref={messageRef}>
        <div
          role="button"
          tabIndex={0}
          onKeyDown={() => null}
          onClick={() => changeFeedbackModalStatus()}
          className={profileClassName}
        >
          <span className={timeClassName}>{msg.sent_at}</span>
        </div>
        {feedbackModalStatus && <ChatButton msg={msg} user_id={user_id} region_id={region_id} />}
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
