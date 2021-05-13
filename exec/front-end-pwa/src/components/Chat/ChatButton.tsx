import { useState, useEffect } from 'react';
import axios from 'axios';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import angelCnt from '../../assets/flaticon/angel_cnt.png';
import heartCnt from '../../assets/flaticon/heart_cnt.png';
import judgeCnt from '../../assets/flaticon/judge_cnt.png';
import '../../styles/_chatButton.scss';

const SERVER_URL = process.env.REACT_APP_URL;

// interface ChatButtonProps {
//   msg: ;
//   feedbackInfo: any;
// }
interface feedbackProps {
  f: {
    id: number;
    title: string;
    path: any;
    status: boolean;
  };
}
export default function ChatButton({ msg, user_id, region_id }: any) {
  useEffect(() => {
    getFeedback();
  }, []);
  console.log('메세지얌', msg);

  const sockJS = new SockJS(`${SERVER_URL}/ws-stomp`);
  const ws = Stomp.over(sockJS);

  // 모드 별 색상 전환
  let modeFeedbackModal = 'dark__bg__red2 feedback-container';
  if (msg.mode === 'light') {
    modeFeedbackModal = 'light__bg__mint2 feedback-container';
  }

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
          sender_id: user_id,
        },
      })
      .then((res) => {
        const feedbackId = res.data.data.badge;
        console.log(' 호이짜', feedbackId);
        // 1. feedback했던 정보 받아와서 해당 포인트만 컬러로 보여주도록 status 바꿔주기
        if (feedbackId > 0) {
          const tempFeedback = [...feedback];
          tempFeedback[feedbackId - 1].status = true;
          setFeedback(tempFeedback);
        }
        // 2. feedback 인덱스를 갱신해준다.
        setFeedbackId(feedbackId);
      });
  };

  const checkBtnStatus = (status: boolean): string => {
    let classValue = '';
    if (status) {
      classValue = 'active feedback-button';
    } else {
      classValue = 'inactive feedback-button';
    }
    return classValue;
  };

  const chooseFeedback = (id: number): void => {
    // 1. 선택한 feedback 값 레디스에 넘겨주기
    ws.send(
      `/pub/chat/feedback`,
      {},
      JSON.stringify({
        // type: 'TALK',
        // mode,
        // room_id: regionId,
        // sender_id: user_id,
        // message: content,
        // sent_at: sentAt,
      }),
    );
    // 2. 선택한 버튼만 status=true로 바꿔주고, 나머지는 false로 바꿔주기
    const tempFeedback = [...feedback];
    for (let i = 0; i < 3; i += 1) {
      if (i === id - 1) {
        tempFeedback[i].status = !tempFeedback[i].status;
      } else {
        tempFeedback[i].status = false;
      }
    }
    setFeedback(tempFeedback);
    console.log('dd');
  };

  const cannotAlert = () => {
    alert('이미 피드백한 상태입니다! 피드백은 하루에 한 번만 가능합니다.');
  };
  const CanFeedback = ({ f }: any, key: any) => {
    return (
      <div
        key={key}
        role="button"
        tabIndex={0}
        onKeyDown={() => null}
        onClick={() => chooseFeedback(f.id)}
        className={checkBtnStatus(f.status)}
      >
        <img className="feedbackBtn" src={f.path} alt={f.title} />
      </div>
    );
  };
  const CannotFeedback = ({ f }: any, key: any) => {
    return (
      <div
        key={key}
        role="button"
        tabIndex={0}
        onKeyDown={() => null}
        onClick={() => cannotAlert()}
        className={checkBtnStatus(f.status)}
      >
        <img className="feedbackBtn" src={f.path} alt={f.title} />
      </div>
    );
  };

  return (
    <div className={modeFeedbackModal}>
      {feedback.map((f) => {
        return feedbackId > 0 ? (
          <CannotFeedback key={f.id} f={f} />
        ) : (
          <CanFeedback key={f.id} f={f} />
        );
      })}
    </div>
  );
}
