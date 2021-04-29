import React from 'react';
import ModeCheck from '../ModeCheck'
import MainTop from '../components/MainTop'
import '../styles/_main.scss'


const MODE = ModeCheck()
let modeName = 'dark__mode bg'
if (MODE === "light") {
  modeName = 'light__mode bg'
}


export default function MainPage() {
  return (
    <div className={modeName}>
      <MainTop mode={MODE} />
    </div>
  )
}
