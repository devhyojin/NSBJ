import React from 'react';

import ChatNav from '../components/Chat/ChatNav'
import ChatContent from '../components/Chat/ChatContent'
import ChatInput from '../components/Chat/ChatInput'

import ModeCheck from '../utils/ModeCheck';

import '../styles/_chat.scss'



export default function Chat() {
  const mode = ModeCheck()
  let chatDivClassName = 'chat chat__dark__mode'

  if (mode === 'light') { chatDivClassName = 'chat chat__light__mode'; };




  return (
    <div className={chatDivClassName}>
      <ChatNav />
      <ChatContent />
      <ChatInput />

    </div>
  );
}
