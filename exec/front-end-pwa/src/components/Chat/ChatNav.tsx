// import React from 'react'


import '../../styles/_chat.scss'
import '../../styles/_main.scss'

interface ChatNavProps {
  backHandler: () => void;
  bName: string;
  neighborCnt: number;
  mode: string
}


export default function ChatNav({ backHandler, bName, neighborCnt, mode }: ChatNavProps) {
  const cntClassName = `chat__neighbor__cnt ${mode}__img__0`

  return (
    <div className='chat__nav'>
      <button type='button' className='chat__back__btn' onClick={backHandler}>
        <i className="fas fa-chevron-left">{null}</i>
      </button>
      <div>{bName} 채팅방 </div>
      <div >
        <div className={cntClassName}><span>x{neighborCnt}</span></div>

      </div>
    </div>
  )
}
