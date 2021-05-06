// import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import Message from './Message';


interface ChatContentProps {
  data: {
    chat: Array;
    count: number;
    user: Array;
  };
  mode: string;
}

export default function ChatContent({ data, mode }: ChatContentProps) {

  const { chat, count, user } = data


  return (
    <div className='chat__content'>
      Chat Conten part
      {chat.map(message => <Message key={uuidv4()} message={message} mode={mode} />)}
    </div>
  )
}
