import { useState, useEffect } from 'react';
import axios from 'axios';
import angelCnt from '../../assets/flaticon/angel_cnt.png';
import heartCnt from '../../assets/flaticon/heart_cnt.png';
import judgeCnt from '../../assets/flaticon/judge_cnt.png';
import '../../styles/_feedbackButton.scss';

const SERVER_URL = process.env.REACT_APP_URL;

export default function FeedbackButton({
  msg,
  setIsFeedbackActive,
  sendFeedback,
  region_id,
  user_id,
}: any) {
  // 모드 별 색상 전환
  let modeFeedbackModal = 'dark__bg__red2 feedback-modal';
  let modeGuideModal = 'dark__bg__red3 guide-modal';
  let modeSendModal = 'dark__bg__red3 send-message guide-modal';
  if (msg.mode === 'light') {
    modeFeedbackModal = 'light__bg__mint2 feedback-modal';
    modeGuideModal = 'dark__bg__mint3 guide-modal';
    modeSendModal = 'dark__bg__mint3 send-message guide-modal';
  }
  const initFeedback = [
    { id: 1, title: '리액션 포인트', path: angelCnt, status: false },
    { id: 2, title: '마음 포인트', path: heartCnt, status: false },
    { id: 3, title: '해결 포인트', path: judgeCnt, status: false },
  ];
  const [feedback, setFeedback] = useState(initFeedback);
  const [isButtonActive, setIsButtonActive] = useState<boolean>(false);
  const [isGuideActive, setIsGuideActive] = useState<boolean>(false);
  const [isSendActive, setIsSendActive] = useState<boolean>(false);
  const [didFeedback, setDidFeedback] = useState<boolean>(false);

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
  const cleanup = () => {
    const tempFeedback = [...feedback];
    for (let i = 0; i < 3; i += 1) {
      tempFeedback[i].status = false;
    }
    setFeedback(tempFeedback);
    setIsButtonActive(false);
    setDidFeedback(false);
    setIsGuideActive(false);
  };
  const isGuideNeed = async () => {
    const id = await getFeedback();
    // 전에 피드백한 기록이 없는 경우에만 가이드를 보여준다.
    if (id > 0) {
      changeFeedbackColor(id);
      setIsButtonActive(true);
      setDidFeedback(true);
    } else {
      setIsGuideActive(true);
    }
  };

  useEffect(() => {
    isGuideNeed();
    return () => cleanup();
  }, []);

  const checkBtnStatus = (status: boolean): string => {
    let classValue = '';
    if (status) {
      classValue = 'active feedback-button';
    } else {
      classValue = 'inactive feedback-button';
    }
    return classValue;
  };
  const reflectResult = (id: number): void => {
    const tempFeedback = [...feedback];
    for (let i = 0; i < 3; i += 1) {
      if (i === id - 1) {
        tempFeedback[i].status = !tempFeedback[i].status;
      } else {
        tempFeedback[i].status = false;
      }
    }
    setFeedback(tempFeedback);
  };

  const chooseFeedback = async (id: number) => {
    reflectResult(id);
    sendFeedback(id, msg.sender_id, msg.bird_name, msg.mouse_name, msg.mode);
    setIsSendActive(true);
    setTimeout(() => setIsSendActive(false), 1500);
    setTimeout(() => setIsFeedbackActive(false), 1600);
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

  const FeedbackGuide = () => {
    useEffect(() => {
      const openLogic = setTimeout(() => {
        setIsGuideActive(false);
        setIsButtonActive(true);
      }, 1400);
      return () => clearTimeout(openLogic);
    }, []);
    return (
      <div className={modeGuideModal}>
        <p>피드백은 각 유저에게 1일 1회만 보낼 수 있습니다.</p>
        <p>선택 후 수정 불가하오니, 신중하게 선택하세요!</p>
      </div>
    );
  };
  const FeedbackSend = () => {
    let receiver_nickname = msg.mouse_name;
    if (msg.mode === 'light') {
      receiver_nickname = msg.bird_name;
    }
    let whatFeedback;
    for (let i = 0; i < 3; i += 1) {
      if (feedback[i].status) {
        whatFeedback = feedback[i].title;
      }
    }
    return (
      <div className={modeSendModal}>
        <div>
          <span className="receiver-name">{receiver_nickname}님</span> 에게
        </div>
        <div>
          <span className="feedback-title">{whatFeedback}</span> 를 성공적으로 전달했습니다.
        </div>
      </div>
    );
  };

  return (
    <div className="feedback">
      {isGuideActive && <FeedbackGuide />}
      {isSendActive && <FeedbackSend />}
      {isButtonActive && (
        <div className={modeFeedbackModal}>
          {feedback.map((f) => {
            return didFeedback ? (
              <CannotFeedback key={f.id} f={f} />
            ) : (
              <CanFeedback key={f.id} f={f} />
            );
          })}
        </div>
      )}
    </div>
  );
}
