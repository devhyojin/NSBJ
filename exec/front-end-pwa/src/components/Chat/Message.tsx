import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import FeedbackButton from './FeedbackButton';
import angelCnt from '../../assets/flaticon/angel_cnt.png';
import heartCnt from '../../assets/flaticon/heart_cnt.png';
import judgeCnt from '../../assets/flaticon/judge_cnt.png';
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

  if (msg.sender_id === 1) {
    messageClassName += 'my__message ';
    profileClassName = '';
    coverClassName += 'my__cover ';
  } else if (!skipProfile) {
    profileClassName += `img__${msg.profile_img}`;
    messageClassName += 'other__message ';
  } else {
    badgeClassName += 'display__none';
    timeClassName += 'display__none';
  }

  messageClassName += `message__${mode} `;

  const initFeedback = [
    { id: 1, title: '리액션 포인트 주기', path: angelCnt, status: false },
    { id: 2, title: '마음 포인트 주기', path: heartCnt, status: false },
    { id: 3, title: '해결 포인트 주기', path: judgeCnt, status: false },
  ];
  const [feedback, setFeedback] = useState(initFeedback);
  const [feedbackId, setFeedbackId] = useState(0);

  const getFeedback = (): void => {
    console.log('홋홋', region_id, msg.sender_id, msg.bird_name, user_id);
    axios
      .get(`${SERVER_URL}/chat/${region_id}/${msg.sender_id}`, {
        params: {
          receiver_bird: msg.bird_name,
          receiver_id: msg.sender_id,
          region_id,
          sender_id: user_id,
        },
      })
      .then((res) => {
        console.log('뭐가 들어오긴 하니', res);
        const id = res.data.data.feedback_id;
        // 2. feedback 인덱스를 갱신해준다.
        setFeedbackId(id);
      });
  };

  const changeFeedbackColor = () => {
    // 1. feedback했던 정보 받아와서 해당 포인트만 컬러로 보여주도록 status 바꿔주기
    const tempFeedback = [...feedback];
    for (let i = 0; i < 3; i += 1) {
      if (i === feedbackId - 1) {
        tempFeedback[i].status = true;
      } else {
        tempFeedback[i].status = false;
      }
    }
    setFeedback(tempFeedback);
  };

  const openFeedbackModal = async () => {
    await getFeedback();
    await changeFeedbackColor();
    await changeFeedbackModalStatus();
  };

  const FeedbackGuide = () => {
    return (
      <div className="modal-mask">
        <div>
          <p>피드백을 한 번 선택하면 바꿀 수 없습니다!</p>
          <p>신중히 선택해주세요</p>
        </div>
      </div>
    );
  };
  const FeedbackSend = () => {
    return (
      <div className="modal-mask">
        <div>
          <p>00님에게 00 피드백을 보냈습니다.</p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className={messageCoverName} ref={messageRef}>
        <div
          role="button"
          tabIndex={0}
          onKeyDown={() => null}
          onClick={() => openFeedbackModal()}
          className={profileClassName}
        >
          <span className={timeClassName}>{msg.sent_at}</span>
        </div>
        {feedbackModalStatus && (
          <FeedbackButton
            msg={msg}
            user_id={user_id}
            region_id={region_id}
            feedbackId={feedbackId}
            setFeedbackId={setFeedbackId}
            feedback={feedback}
            setFeedback={setFeedback}
            changeFeedbackModalStatus={changeFeedbackModalStatus}
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
