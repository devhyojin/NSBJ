import { useState, useRef, MutableRefObject } from 'react';
import FeedbackButton from './FeedbackButton';
import '../../styles/_message.scss';

interface MessageProps {
  msg: any;
  mode: string;
  user_id: number;
  region_id: number;
  skipProfile: boolean,
  sendFeedback(
    id: number,
    receiverId: string,
    receiverBird: string,
    receiverMouse: string,
    receiverMode: string,
  ): void;
}

export default function Message({
  msg,
  user_id,
  region_id,
  mode,
  skipProfile,
  sendFeedback,
}: MessageProps) {

  let coverClassName = 'message__content__cover ';
  let profileClassName = 'message__profile ';
  let messageClassName = 'message ';
  let badgeClassName = 'nick__badge ';
  let timeClassName = 'time__stamp ';
  const messageCoverName = `message__cover profile__${mode}`;
  const messageRef = useRef() as MutableRefObject<HTMLInputElement>;

  if (msg.sender_id === user_id) {
    messageClassName += 'my__message ';
    profileClassName = '';
    coverClassName += 'my__cover ';
    timeClassName += 'display__none';
  } else if (!skipProfile) {
    profileClassName += `img__${msg.profile_img}`;
    messageClassName += 'other__message ';
  } else {
    badgeClassName += 'display__none';
    timeClassName += 'visibility_none';
    profileClassName += 'display__none2';
  }
  messageClassName += `message__${mode} `;

  const [isFeedbackActive, setIsFeedbackActive] = useState<boolean>(false);
  const changeIsFeedbackActive = (): void => {
    setIsFeedbackActive(!isFeedbackActive);
  };
  // 남의 것 클릭했을 때만 열리기
  const openFeedbackComponent = () => {
    if (user_id !== msg.sender_id) {
      changeIsFeedbackActive();
    }
  };

  const feedbackOpenHandler = (event) => {
    if (!event.target.classList.contains('display__none2')) {
      openFeedbackComponent();
    }
  };

  return (
    <div>
      <div className={messageCoverName} ref={messageRef}>
        <div
          role="button"
          tabIndex={0}
          onKeyDown={() => null}
          onClick={feedbackOpenHandler}
          className={profileClassName}
        >
          <span className={timeClassName}>{msg.sent_at}</span>
        </div>
        {isFeedbackActive && (
          <FeedbackButton
            msg={msg}
            mode={mode}
            user_id={user_id}
            region_id={region_id}
            setIsFeedbackActive={setIsFeedbackActive}
            sendFeedback={sendFeedback}
          />
        )}
        <div className={coverClassName}>
          <div className={badgeClassName}>
            <span className="badge__class">{msg.badge}</span>
            <br /> {mode === 'light' ? msg.bird_name : msg.mouse_name}
          </div>
          <div className={messageClassName}>
            <span>{msg.message}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
