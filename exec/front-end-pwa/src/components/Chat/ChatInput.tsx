import React, { useRef } from 'react'

interface ChatInputProps {
  sendMessage(content: string): any;
}


export default function ChatInput({ sendMessage }: ChatInputProps) {
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>

  const sendMessageHandler = (): any => {
    const inputValue = inputRef.current.value
    if (!inputValue) return;
    sendMessage(inputValue)
    inputRef.current.value = ''
  }


  return (
    <div className='chat__input__cover'>
      <button type='button'>확</button>
      <input type="text" ref={inputRef} />
      <button type='button' onClick={sendMessageHandler} >
        <i className="fas fa-paper-plane">{null}</i>
      </button>
    </div>
  )
}
