// import React from 'react'


import '../../styles/_chat.scss'


interface ChatNavProps {
  backHandler: () => void;
}


export default function ChatNav({ backHandler }: ChatNavProps) {
  return (
    <div className='chat__nav'>
      <button type='button' className='chat__back__btn' onClick={backHandler}>
        <i className="fas fa-chevron-left">{null}</i>
      </button>
      <div>b_name</div>
      <div>새*3</div>
    </div>
  )
}
