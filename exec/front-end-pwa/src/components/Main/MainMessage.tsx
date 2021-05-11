// import React from 'react'

interface MainMessageProps {
  activate: boolean,
  mode: string,
  routerToChat(): any,
}


export default function MainMessage({ activate, mode, routerToChat }: MainMessageProps) {
  if (!activate) { return null }
  const baseClass = 'main__message bg__fill__img '
  const btnClass = mode === 'light' ? 'light__btn' : 'dark__btn'

  const routerToChatHandler = () => {
    routerToChat()
  }

  return (
    <div
      role='button'
      tabIndex={0}
      className={baseClass + btnClass}
      onClick={routerToChatHandler}
      onKeyDown={() => null}
    >
      {null}
    </div>
  )
}