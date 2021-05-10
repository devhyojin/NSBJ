import { useState, useEffect } from 'react';
// import axios from 'axios';
import angelCnt from '../../assets/flaticon/angel_cnt.png';
import heartCnt from '../../assets/flaticon/heart_cnt.png';
import judgeCnt from '../../assets/flaticon/judge_cnt.png';
import '../../styles/_chatButton.scss';

// const SERVER_URL = process.env.REACT_APP_URL;

interface ChatButtonProps {
  mode: string;
  feedbackInfo: any;
}

export default function ChatButton({ mode, feedbackInfo }: ChatButtonProps) {
  // 모드 별 색상 전환
  let modeFeedbackModal = 'dark__bg__red2 feedback-container';
  if (mode === 'light') {
    modeFeedbackModal = 'light__bg__mint2 feedback-container';
  }

  const initFeedback = [
    { id: 1, title: '리액션 포인트 주기', path: angelCnt, status: false },
    { id: 2, title: '마음 포인트 주기', path: heartCnt, status: false },
    { id: 3, title: '해결 포인트 주기', path: judgeCnt, status: false },
  ];
  const [feedback, setFeedback] = useState(initFeedback);

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
    // 1. 선택한 feedback 값 빽에 넘겨주기
    // axios.patch(`${SERVER_URL}/mypage`, {}, { params: { user_id: userId, receiver_id: youId, receiver_nickname: youNickname } }).then((res) => {
    //   console.log('피드백 성공적으로 전달');
    // });
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

  useEffect(() => {
    // 1. 피드백 기록 조회해서 이미 눌렀던 거면 status true로 바꿔주기
    // const tempFeedback = [...feedback];
    // tempFeedback[feedbackInfo.id-1].status = true;
    // setFeedback(tempFeedback);
  }, []);

  return (
    <div className={modeFeedbackModal}>
      {feedback.map((f) => (
        <div
          key={f.id}
          role="button"
          tabIndex={0}
          onKeyDown={() => null}
          onClick={() => chooseFeedback(f.id)}
          className={checkBtnStatus(f.status)}
        >
          <img className="feedbackBtn" src={f.path} alt={f.title} />
        </div>
      ))}
    </div>
  );
}
