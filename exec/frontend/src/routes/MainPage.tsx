import React, { useState } from 'react';
import axios from 'axios'
import ModeCheck from '../ModeCheck'
import MainTop from '../components/MainTop'
import MainBody from '../components/MainBody'
import MainMessage from '../components/MainMessage'
import '../styles/_main.scss'


const KAKAO_SERVER_URL = "https://dapi.kakao.com/v2/local/geo/coord2regioncode"
const KAKAO_API_KEY = "c4e62099f8bdb6b35e2bee0fa3114ed7"



export default function MainPage() {
  const [activate, setActivate] = useState(false);

  const MODE = ModeCheck()

  let modeName = 'dark__mode bg'
  let neighborCnt = 0
  let latitude = 0
  let longitude = 0

  if (MODE === "light") {
    modeName = 'light__mode bg'
    neighborCnt += 1
  }

  const geoCode = function () {
    return new Promise(function (res, err) {
      navigator.geolocation.getCurrentPosition(res, err)
    })
  }

  const btnActivate = async () => {
    await geoCode()
      .then(res => {
        latitude = res.coords.latitude
        longitude = res.coords.longitude
      })

    axios.get(`${KAKAO_SERVER_URL}.json?x=${longitude}&y=${latitude}}`, {
      headers: {
        'Authorization': `KakaoAK ${KAKAO_API_KEY}`
      }
    })
      .then(res => console.log(res))


    setActivate(!activate)
  }

  return (
    <div className={modeName}>
      <MainTop mode={MODE} activate={activate} neighborCnt={neighborCnt} />
      <MainBody btnActivate={btnActivate} mode={MODE} />
      <MainMessage activate={activate} mode={MODE} />
    </div>
  )
}
