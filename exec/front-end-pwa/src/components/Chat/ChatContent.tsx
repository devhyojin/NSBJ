import React, { useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

import Message from './Message';
import EnterChat from './EnterChat';
import MegaPhone from './MegaPhone';


interface ChatContentProps {
  data: any;
  mode: string;
  user_id: number;
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

export default function ChatContent({ data, mode, user_id }: ChatContentProps): any {
  const chatContent = useRef() as React.MutableRefObject<HTMLInputElement>
  let cnt = -1

  useEffect(() => {
    const target = chatContent.current
    if (!target) return;
    target.scrollTop = target.scrollHeight
  })


  if (!data) {
    return <div>{null}</div>
  }
  return (
    <div className='chat__content' ref={chatContent}>
      {data.map((msg: msgProps) => {
        cnt += 1
        if (msg.type === 'ENTER') {
          const { message } = msg
          return <EnterChat key={uuidv4()} enterMessage={message} />
        }

        if (msg.type === 'ANNOUNCE') {
          return <MegaPhone key={uuidv4()} msg={msg} userId={user_id} />
        }


        let skipProfile = false
        if (cnt && data[cnt - 1].sender_id === msg.sender_id && data[cnt - 1].sent_at === msg.sent_at) {
          skipProfile = true
        }
        console.log('??')
        return <Message key={uuidv4()} msg={msg} user_id={user_id} mode={mode} skipProfile={skipProfile} />

      })
      }
    </div>
  )
}