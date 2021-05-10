import React from 'react';
import angelCnt from '../../assets/flaticon/angel_cnt.png';
import heartCnt from '../../assets/flaticon/heart_cnt.png';
import judgeCnt from '../../assets/flaticon/judge_cnt.png';

import '../../styles/_chatButton.scss';

interface ChatButtonProps {
  mode: string;
  changeFeedbackModalStatus: any;
}

export default function ChatButton({ mode, changeFeedbackModalStatus }: ChatButtonProps) {
  // 모드 별 색상 전환
  let modeFeedbackModal = 'dark__bg__red2 feedback-container';
  if (mode === 'light') {
    modeFeedbackModal = 'light__bg__mint2 feedback-container';
  }

  const feedback = [
    { id: 1, title: '리액션 포인트 주기', path: angelCnt },
    { id: 2, title: '마음 포인트 주기', path: heartCnt },
    { id: 3, title: '해결 포인트 주기', path: judgeCnt },
  ];

  const patchFeedback = (id: number): void => {
    console.log('dd');
  };
  return (
    <div className={modeFeedbackModal}>
      {feedback.map((f) => (
        <div
          key={f.id}
          role="button"
          tabIndex={0}
          onKeyDown={() => null}
          onClick={() => patchFeedback(f.id)}
        >
          <img className="feedbackBtn" src={f.path} alt={f.title} />
        </div>
      ))}
    </div>
  );
}
