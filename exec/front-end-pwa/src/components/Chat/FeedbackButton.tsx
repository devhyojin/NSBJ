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
  user_id,
  region_id,
  feedbackId,
  setFeedbackId,
  feedback,
  setFeedback,
  changeFeedbackModalStatus,
  sendFeedback,
}: any) {
  // const sockJS = new SockJS(`${SERVER_URL}/ws-stomp`);
  // const ws = Stomp.over(sockJS);

  // 모드 별 색상 전환
  let modeFeedbackModal = 'dark__bg__red2 feedback-container';
  if (msg.mode === 'light') {
    modeFeedbackModal = 'light__bg__mint2 feedback-container';
  }

  useEffect(() => {
    console.log('ee');
  }, [feedbackId]);

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
    console.log('쥐쥐쥐쥐', msg);
    // 1. 선택한 feedback 값 레디스에 넘겨주기
    sendFeedback(id, msg.sender_id, msg.bird_name, msg.mouse_name, msg.mode);
    // ws.send(
    //   `/pub/chat/feedback`,
    //   {},
    //   JSON.stringify({
    //     feedback_id: id,
    //     region_id,
    //     sender_id: user_id,
    //     receiver_id: msg.sender_id,
    //     receiver_bird: msg.bird_name,
    //     receiver_mouse: msg.mouse_name,
    //     mode: msg.mode,
    //   }),
    // );
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
    setFeedbackId(id);
    setTimeout(() => changeFeedbackModalStatus(), 1000);
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
  // const [feedbackGuideStatus, setFeedbackGuideStatus] = useState<boolean>(false);
  // const [feedbackSendStatus, setFeedbackSendStatus] = useState<boolean>(false);
  // const changeFeedbackGuideStatus = (): void => {
  //   setFeedbackGuideStatus(!feedbackGuideStatus);
  // };
  // const changeFeedbackSendStatus = (): void => {
  //   setFeedbackSendStatus(!feedbackSendStatus);
  // };
  // const FeedbackGuide = () => {
  //   return (
  //     <div className="modal-mask">
  //       <div>
  //         <p>피드백을 한 번 선택하면 바꿀 수 없습니다!</p>
  //         <p>신중히 선택해주세요</p>
  //       </div>
  //     </div>
  //   );
  // };
  // const FeedbackSend = () => {
  //   return (
  //     <div className="modal-mask">
  //       <div>
  //         <p>00님에게 00 피드백을 보냈습니다.</p>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div className="feedback">
      <div className={modeFeedbackModal}>
        {feedback.map((f) => {
          return feedbackId > 0 ? (
            <CannotFeedback key={f.id} f={f} />
          ) : (
            <CanFeedback key={f.id} f={f} />
          );
        })}
      </div>
      {/* {feedbackGuideStatus && <FeedbackGuide />}
      {feedbackSendStatus && <FeedbackSend />} */}
    </div>
  );
}
