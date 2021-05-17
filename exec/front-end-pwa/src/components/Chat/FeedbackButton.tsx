import { useState, useEffect } from 'react';
import '../../styles/_feedbackButton.scss';

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
  isFeedbackActive,
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
  const [isSendActive, setIsSendActive] = useState<boolean>(false);
  const [didFeedback, setDidFeedback] = useState<boolean>(false);

  const isGuideNeed = async () => {
    const id = await getFeedback();
    console.log('리이이얼', id);
    // 전에 피드백한 기록이 없는 경우에만 가이드를 보여준다.
    if (id > 0) {
      setIsButtonActive(true);
      setDidFeedback(true);
    } else {
      setIsGuideActive(true);
    }
  };

  useEffect(() => {
    isGuideNeed();
    console.log('너 언제 바뀌니?', isSendActive);
    // 클린업 함수 문제 해결하기
    // return function cleanup() {
    //   setIsButtonActive(false);
    //   setDidFeedback(false);
    //   setIsGuideActive(false);
    // };
  }, [isSendActive]);

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

  const changeIsSendActive = () => {
    setIsSendActive(!isSendActive);
  };
  const chooseFeedback = async (id: number) => {
    console.log('00추스피드백 돌입', msg);
    // 1. 선택한 feedback 값 레디스에 넘겨주기
    reflectResult(id);
    sendFeedback(id, msg.sender_id, msg.bird_name, msg.mouse_name, msg.mode);
    console.log('66 피드백과 액티브 사이');
    setIsSendActive(true);
    console.log('77 액티브 했나?', isSendActive);
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
    useEffect(() => {
      const openLogic = setTimeout(() => {
        console.log('111핃백 샌드 오픈로직 진입 ');
        setIsSendActive(false);
        console.log('222이즈샌드엑티브 바뀜?', isSendActive);
        // setIsButtonActive(false);
        // console.log('333이즈버튼액티브 바뀜?', isButtonActive);
        // setIsFeedbackActive(false);
        // console.log('444이즈핃백엑티브 바뀜?', isFeedbackActive);
      }, 1000);
      console.log('2222이즈샌드엑티브 바뀜?', isSendActive);
      console.log('3333이즈버튼액티브 바뀜?', isButtonActive);
      console.log('4444이즈핃백엑티브 바뀜?', isFeedbackActive);
      return () => clearTimeout(openLogic);
    }, [msg]);

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
