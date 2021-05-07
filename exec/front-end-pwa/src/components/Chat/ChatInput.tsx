import React from 'react'

export default function ChatInput() {
  return (
    <div className='chat__input__cover'>
      <button type='button'>확</button>
      <input type="text" />
      <button type='button'>
        <i className="fas fa-paper-plane">{null}</i>
      </button>
    </div>
  )
}
