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
  if (msg.mode === 'light') {
    modeFeedbackModal = 'light__bg__mint2 feedback-modal';
    modeGuideModal = 'dark__bg__mint3 guide-modal';
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
    console.log('리이이얼', id);
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
    console.log('너 언제 바뀌니?', isSendActive);
    return () => cleanup();
  }, [user_id]);

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
    console.log('11리플렉트 리절트 돌입', id);
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

  const chooseFeedback = async (id: number) => {
    console.log('00추스피드백 돌입', msg);
    // 1. 선택한 feedback 값 레디스에 넘겨주기
    reflectResult(id);
    sendFeedback(id, msg.sender_id, msg.bird_name, msg.mouse_name, msg.mode);
    console.log('66 피드백과 액티브 사이');
    setIsSendActive(true);
    console.log('77 액티브 했나?', isSendActive);
    setTimeout(() => setIsSendActive(false), setIsFeedbackActive(false), 6000);
    // setTimeout(() => setIsSendActive(false), 6000);
    // setTimeout(() => setIsFeedbackActive(false), 6050);
  };

  const cannotAlert = () => {
    alert('이미 피드백한 상태입니다! 피드백은 하루에 한 번만 가능합니다.');
  };
  const CanFeedback = ({ f }: any, key: any) => {
    console.log('f다아앙캔', f.id);
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
    console.log('f다아앙캔트', f.id);
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
      console.log('001이즈가이드엑티브 바뀜?', isGuideActive);
      console.log('002이즈버튼엑티브 바뀜?', isButtonActive);
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
    console.log('000피드백샌드 진입');

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
