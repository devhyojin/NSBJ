import { useEffect, useRef, MutableRefObject} from 'react';
import { v4 as uuidv4 } from 'uuid';

import Message from './Message';
import EnterChat from './EnterChat';
import MegaPhone from './MegaPhone';

interface ChatContentProps {
  data: any;
  mode: string;
  user_id: number;
  region_id: number;
  sendFeedback(
    id: number,
    receiverId: string,
    receiverBird: string,
    receiverMouse: string,
    receiverMode: string,
  ): void;
  deleteAnnounce(chat: msgProps): void;
  addNull(): void;
}

interface msgProps {
  type: string;
  room_id: number;
  message: string;
  sent_at: string;
  sender_id: string;
  bird_name: string;
  mouse_name: string;
  badge: any;
  profileImg: number;
  mode: string;
  profile_img: number;
}

export default function ChatContent({
  data,
  mode,
  user_id,
  region_id,
  sendFeedback,
  deleteAnnounce,
  addNull,
}: ChatContentProps) {
  const chatContent = useRef() as MutableRefObject<HTMLInputElement>;
  const superChat = data ? data.find((msg: msgProps) => msg.type === 'ANNOUNCE') : undefined;

  if (!document.body.contains(document.querySelector('.mega__cover')) && superChat !== undefined) {
    deleteAnnounce(superChat); // 로그에서 삭제
    MegaPhone(superChat, mode);
  } else if (superChat !== undefined) {
    setTimeout(() => {
      addNull();
    }, 3000);
  }
  let cnt = -1;


  useEffect(() => {
    const target = chatContent.current;
    if (!target) return;
    target.scrollTop = target.scrollHeight;
  }, [data]);

  if (!data) {
    return <div>{null}</div>;
  }
  return (
    <div className="chat__content" ref={chatContent}>
      {data.map((msg: msgProps) => {
        cnt += 1;
        if (msg.type === 'ENTER') {
          const { message } = msg;
          return <EnterChat key={uuidv4()} enterMessage={message} />;
        }

        if (msg.type === 'TALK') {
          let skipProfile = false;
          if (
            cnt &&
            data[cnt - 1].sender_id === msg.sender_id &&
            data[cnt - 1].sent_at === msg.sent_at
          ) {
            skipProfile = true;
          }
          return (
            <Message
              key={uuidv4()}
              msg={msg}
              mode={mode}
              user_id={user_id}
              region_id={region_id}
              skipProfile={skipProfile}
              sendFeedback={sendFeedback}
            />
          );
        }
        return <div key={uuidv4()}>{null}</div>;
      })}
    </div>
  );
}
