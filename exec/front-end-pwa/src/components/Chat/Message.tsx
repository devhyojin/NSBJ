import React, { useRef, useEffect } from 'react'

import '../../styles/_message.scss'

export default function Message({ message, user, mode }: any) {
  let coverClassName = 'message__content__cover '
  let profileClassName = 'message__profile'
  let messageClassName = 'message '
  const messageRef = useRef() as React.MutableRefObject<HTMLInputElement>

  if (message.user_id === user[0].user_id) {
    messageClassName += 'my__message '
    profileClassName = ''
    coverClassName += 'my__cover '
  } else {
    messageClassName += 'other__message '
  }

  if (mode === 'light') {
    messageClassName += 'message__light '
  } else {
    messageClassName += 'message__dark '
  }

  useEffect(() => {
    messageRef.current.focus()
  })


  return (
    <div className='message__cover' ref={messageRef}>
      <div className={profileClassName}>
        {null}
      </div>

      <div className={coverClassName}>
        <div className='nick__badge'>
          {null} <br /> nickname
        </div>
        <div className={messageClassName}>
          <span>{message.msg}</span>
        </div>
      </div>

    </div>
  )
}
