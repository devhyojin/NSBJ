// import React from 'react'
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

  const { chat, count, user } = data


  return (
    <div className='chat__content'>
      Chat Conten part
      {chat.map((msg: any[]) => <Message key={uuidv4()} message={msg} mode={mode} />)}
    </div>
  )
}