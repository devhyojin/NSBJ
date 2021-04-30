import React, { useState } from 'react';
import ModeCheck from '../ModeCheck'
import MainTop from '../components/MainTop'
import MainBody from '../components/MainBody'
import '../styles/_main.scss'


export default function MainPage() {
  const [activate, setActivate] = useState(false);

  const MODE = ModeCheck()

  let modeName = 'dark__mode bg'
  let neighborCnt = 0

  if (MODE === "light") {
    modeName = 'light__mode bg'
    neighborCnt += 1
  }

  const btnActivate = () => {
    setActivate(!activate)
  }

  return (
    <div className={modeName}>
      <MainTop mode={MODE} activate={activate} neighborCnt={neighborCnt} />
      <MainBody btnActivate={btnActivate} mode={MODE} />
    </div>
  )
}
