import React from 'react'

export default function ChatContent() {

  const array = []

  for (let i = 0; i < 100; i += 1) {
    array.push(i)
  }



  return (
    <div className='chat__content'>
      Chat Conten part
      {array.map(int => <div key='1'>{int}</div>)}
    </div>
  )
}
