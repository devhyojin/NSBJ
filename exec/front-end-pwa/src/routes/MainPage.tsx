// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import ModeCheck from '../utils/ModeCheck';
// import MainTop from '../components/Main/MainTop';
// import MainBody from '../components/Main/MainBody';
// import MainMessage from '../components/Main/MainMessage';
// import MainBottom from '../components/Main/MainBottom';
// import waveRandom from '../utils/WaveRandom';
// import '../styles/_main.scss';



// const KAKAO_SERVER_URL = process.env.REACT_APP_KAKAO_SERVER_URL;
// const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;


// export default function MainPage() {
//   const [activate, setActivate] = useState(false);
//   const [region, setRegion] = useState('');
//   const [cnt, setCnt] = useState(0)
//   const MODE = ModeCheck();

//   // 랜덤웨이브 무한 생성
//   useEffect(() => {
//     const randomNum = Math.random()
//     const makeing = setTimeout(() => {
//       if (randomNum > 0.5) {
//         waveRandom(MODE)
//       } else {
//         waveRandom(MODE)
//         waveRandom(MODE)
//       }
//       setCnt(cnt + 1)
//     }, 5000);
//     return () => clearTimeout(makeing)
//   }, [cnt])



//   let modeName = 'dark__mode bg';
//   let neighborCnt = 0;
//   let latitude = 0;
//   let longitude = 0;

//   if (MODE === "light") {
//     modeName = 'light__mode bg';
//     neighborCnt += 1;
//   };

//   const geoCode = function () {
//     return new Promise(function (res, err) {
//       navigator.geolocation.getCurrentPosition(res, err)
//     });
//   };

//   const btnActivate = async () => {
//     await geoCode()
//       .then(res => {
//         latitude = res.coords.latitude;
//         longitude = res.coords.longitude;
//       });

//     axios.get(`${KAKAO_SERVER_URL}.json?x=${longitude}&y=${latitude}`, {
//       headers: {
//         'Authorization': `KakaoAK ${KAKAO_API_KEY}`
//       }
//     })
//       .then(res => {
//         setRegion(res.data.documents[0].region_3depth_name);
//         setActivate(true);

//       })
//   }

//   return (
//     <div className={modeName}>
//       <MainTop mode={MODE} activate={activate} neighborCnt={neighborCnt} region={region} />
//       <MainBody btnActivate={btnActivate} mode={MODE} />
//       <MainMessage activate={activate} mode={MODE} />
//       <MainBottom mode={MODE} />
//     </div>
//   )
// }

import React from 'react'

export default function MainPage() {
  return (
    <div>
      {null}
    </div>
  )
}

