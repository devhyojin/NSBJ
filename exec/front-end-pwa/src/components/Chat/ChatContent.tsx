import React, { useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

import Message from './Message';


interface ChatContentProps {
  data: {
    chat: any;
    count: number;
    user: any;
  };
  mode: string;
}

export default function ChatContent({ data, mode }: ChatContentProps) {
  const chatContent = useRef() as React.MutableRefObject<HTMLInputElement>
  useEffect(() => {
    const target = chatContent.current
    target.scrollTop = target.scrollHeight
  })


  const { chat, user } = data


  return (
    <div className='chat__content' ref={chatContent}>
      {chat.map((msg: any[]) => <Message key={uuidv4()} message={msg} mode={mode} user={user} />)}
    </div>
  )
}