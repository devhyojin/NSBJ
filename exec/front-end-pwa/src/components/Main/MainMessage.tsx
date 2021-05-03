// import React from 'react'
import { useHistory } from 'react-router-dom'

interface MainMessageProps {
  activate: boolean,
  mode: string,
}


export default function MainMessage({ activate, mode }: MainMessageProps) {
  if (!activate) { return null }
  const baseClass = 'main__message bg__fill__img '
  const btnClass = mode === 'light' ? 'light__btn' : 'dark__btn'
  const history = useHistory()

  const routerToChat = () => {
    history.push('/chat')
  }

  return (
    <div
      role='button'
      tabIndex={0}
      className={baseClass + btnClass}
      onClick={routerToChat}
      onKeyDown={() => null}
    >
      {null}
    </div>
  )
}