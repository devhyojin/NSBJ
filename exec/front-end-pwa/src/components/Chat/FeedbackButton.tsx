import { useState, useEffect } from 'react';
import axios from 'axios';
// import SockJS from 'sockjs-client';
// import Stomp from 'stompjs';
import '../../styles/_feedbackButton.scss';

const SERVER_URL = process.env.REACT_APP_URL;

interface feedbackProps {
  f: {
    id: number;
    title: string;
    path: any;
    status: boolean;
  };
}
export default function FeedbackButton({
  msg,
  feedback,
  setFeedback,
  getFeedback,
  setIsFeedbackActive,
  sendFeedback,
}: any) {
  // 모드 별 색상 전환
  let modeFeedbackModal = 'dark__bg__red2 feedback-modal';
  let modeGuideModal = 'dark__bg__red3 guide-modal';
  if (msg.mode === 'light') {
    modeFeedbackModal = 'light__bg__mint2 feedback-modal';
    modeGuideModal = 'dark__bg__mint3 guide-modal';
  }
  const [isButtonActive, setIsButtonActive] = useState<boolean>(false);
  const [isGuideActive, setIsGuideActive] = useState<boolean>(false);

  const [didFeedback, setDidFeedback] = useState<boolean>(false);

  useEffect(() => {
    const isGuideNeed = async () => {
      const id = await getFeedback();
      console.log('리이이얼', id);
      if (id > 0) {
        setIsButtonActive(true);
        setDidFeedback(true);
        console.log('디드피드백', didFeedback);
      } else {
        setIsGuideActive(true);
      }
    };
    isGuideNeed();
    // 클린업 함수 문제 해결하기
    // return function cleanup() {
    //   setIsButtonActive(false);
    //   setDidFeedback(false);
    //   setIsGuideActive(false);
    // };
  }, [msg]);
  console.log('디드피드백 22', didFeedback);

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
    console.log('11리플렉트 리절트 돌입');
    const tempFeedback = [...feedback];
    for (let i = 0; i < 3; i += 1) {
      if (i === id - 1) {
        tempFeedback[i].status = !tempFeedback[i].status;
      } else {
        tempFeedback[i].status = false;
      }
    }
    setFeedback(tempFeedback);
    console.log('22 피드백 반영 여부 확인1', tempFeedback);
    console.log('33 피드백 반영 여부 확인2', feedback);
  };
  const [isSendActive, setIsSendActive] = useState<boolean>(false);
  const changeIsSendActive = () => {
    setIsSendActive(!isSendActive);
  };
  const chooseFeedback = async (id: number) => {
    console.log('00추스피드백 돌입', msg);
    // 1. 선택한 feedback 값 레디스에 넘겨주기
    reflectResult(id);
    sendFeedback(id, msg.sender_id, msg.bird_name, msg.mouse_name, msg.mode);
    console.log('55 피드백과 액티브 사이');
    setIsSendActive(true);
    console.log('66 액티브 했나?', isSendActive);
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
      setTimeout(() => {
        setIsGuideActive(false);
      }, 1400);
      setTimeout(() => {
        setIsButtonActive(true);
      }, 1390);
    }, []);
    return (
      <div className={modeGuideModal}>
        <p>피드백은 각 유저에게 1일 1회만 보낼 수 있습니다.</p>
        <p>선택 후 수정 불가하오니, 신중하게 선택하세요!</p>
      </div>
    );
  };
  const FeedbackSend = () => {
    useEffect(() => {
      setTimeout(() => {
        changeIsSendActive();
        console.log(isSendActive);
      }, 3990);
      setTimeout(() => {
        setIsButtonActive(false);
        setIsFeedbackActive(false);
      }, 4000);
    }, []);

    let receiver_nickname = msg.mouse_name;
    if (msg.mode === 'light') {
      receiver_nickname = msg.bird_name;
    }
    return (
      <div className={modeGuideModal}>
        <p>{receiver_nickname}님에게 피드백을 성공적으로 전달했습니다.</p>
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
