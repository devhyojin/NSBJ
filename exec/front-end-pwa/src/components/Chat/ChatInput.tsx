import React from 'react'

interface ChatInputProps {
  sendMessage(): any;
}


export default function ChatInput({ sendMessage }: ChatInputProps) {

  const sendMessageHandler = (): any => {
    sendMessage()
  }


  return (
    <div className='chat__input__cover'>
      <button type='button'>확</button>
      <input type="text" />
      <button type='button' onClick={sendMessageHandler} >
        <i className="fas fa-paper-plane">{null}</i>
      </button>
    </div>
  )
}
