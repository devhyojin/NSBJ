import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import FeedbackButton from './FeedbackButton';
import angelCnt from '../../assets/flaticon/angel_cnt.png';
import heartCnt from '../../assets/flaticon/heart_cnt.png';
import judgeCnt from '../../assets/flaticon/judge_cnt.png';
import '../../styles/_message.scss';

const SERVER_URL = process.env.REACT_APP_URL;

export default function Message({ msg, user_id, region_id, mode, skipProfile, sendFeedback }: any) {
  // const [feedbackId, setfeedbackId] = useState(0);
  useEffect(() => {
    const settingFeedbackInfo = async () => {
      const id = await getFeedback();
      console.log('꿈꿈d', id);
      if (id) {
        changeFeedbackColor(id);
      }
    };
    settingFeedbackInfo();
    // axios
    //   .patch(
    //     `${SERVER_URL}/chat/test`,
    //     {},
    //     {
    //       params: {
    //         receiver_bird: msg.bird_name,
    //         receiver_id: msg.sender_id,
    //         room_id: msg.room_id,
    //         sender_id: user_id,
    //       },
    //     },
    //   )
    //   .then((res) => {
    //     console.log('초기화성공', res);
    //   });
  }, [msg]);

  const [isFeedbackActive, setIsFeedbackActive] = useState<boolean>(false);
  const changeIsFeedbackActive = (): void => {
    setIsFeedbackActive(!isFeedbackActive);
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
    { id: 1, title: '리액션 포인트', path: angelCnt, status: false },
    { id: 2, title: '마음 포인트', path: heartCnt, status: false },
    { id: 3, title: '해결 포인트', path: judgeCnt, status: false },
  ];
  const [feedback, setFeedback] = useState(initFeedback);
  // const [feedbackId, setFeedbackId] = useState(initFeedback);

  const getFeedback = async () => {
    const res = await axios.get(`${SERVER_URL}/chat/${region_id}/${msg.sender_id}`, {
      params: {
        receiver_bird: msg.bird_name,
        receiver_id: msg.sender_id,
        region_id,
        sender_id: user_id,
      },
    });
    return res.data.data.feedback_id;
  };

  const changeFeedbackColor = (id: number) => {
    // 1. feedback했던 정보 받아와서 해당 포인트만 컬러로 보여주도록 status 바꿔주기
    const tempFeedback = [...feedback];
    for (let i = 0; i < 3; i += 1) {
      if (i === id - 1) {
        tempFeedback[i].status = true;
      } else {
        tempFeedback[i].status = false;
      }
    }
    setFeedback(tempFeedback);
  };

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
            feedback={feedback}
            getFeedback={getFeedback}
            setFeedback={setFeedback}
            isFeedbackActive={isFeedbackActive}
            setIsFeedbackActive={setIsFeedbackActive}
            sendFeedback={sendFeedback}
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
