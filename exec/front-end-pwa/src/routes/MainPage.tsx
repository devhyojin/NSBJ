import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import ModeCheck from '../utils/ModeCheck';
import MainTop from '../components/Main/MainTop';
import MainBody from '../components/Main/MainBody';
import MainMessage from '../components/Main/MainMessage';
import MainBottom from '../components/Main/MainBottom';
import waveRandom from '../utils/WaveRandom';
import OtherUser from '../utils/OtherUser'
import UpdateUserInfo from '../utils/UpdateUserInfo'
import '../styles/_main.scss';


const SERVER_URL = process.env.REACT_APP_URL
const KAKAO_SERVER_URL = process.env.REACT_APP_KAKAO_SERVER_URL;
const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;



export default function MainPage() {
  const [activate, setActivate] = useState(false);
  const [region, setRegion] = useState('');
  const [cnt, setCnt] = useState(0);
  const [neighborCnt, setNeighborCnt] = useState(0);
  const [profileIdx, setProfileIdx] = useState(0);

  const MODE = ModeCheck();
  const history = useHistory();
  const userInfo = localStorage.getItem('userInfo') ? localStorage.getItem('userInfo') : null;
  const target = document.body
  const checkTarget = document.querySelector('.other__user')

  UpdateUserInfo(MODE)

  let modeName = 'dark__mode bg';
  let latitude = 0;
  let longitude = 0;

  // 랜덤웨이브 무한 생성
  useEffect(() => {
    const randomNum = Math.random()
    const makeing = setTimeout(() => {
      if (randomNum > 0.5) {
        waveRandom(MODE)
      } else {
        waveRandom(MODE)
        waveRandom(MODE)
      }
      setCnt(cnt + 1)
    }, 5000);
    return () => clearTimeout(makeing)
  }, [cnt])


  useEffect(() => {
    getGeoCoder()
    if (userInfo !== null) {
      const userInfoObject = JSON.parse(userInfo)
      setProfileIdx(userInfoObject.profile_img)
    }
  }, [])

  if (!userInfo) { history.push('/') }

  if (MODE === "light") { modeName = 'light__mode bg'; };

  const geoCode = () => {
    return new Promise((res, err) => {
      navigator.geolocation.getCurrentPosition(res, err)
    });
  };

  const getGeoCoder = async () => {
    await geoCode()
      .then((res: any) => {
        // latitude = res.coords.latitude;
        // longitude = res.coords.longitude;
        latitude = 37.4979278
        longitude = 127.0275833
      });

    axios.get(`${KAKAO_SERVER_URL}.json?x=${longitude}&y=${latitude}`, {
      headers: {
        'Authorization': `KakaoAK ${KAKAO_API_KEY}`
      }
    })
      .then(res => {
        setRegion(res.data.documents[0].region_3depth_name);
        localStorage.setItem('b_code', res.data.documents[0].code);
      })
  }

  const btnActivate = async (targetX: number, targetY: number) => {
    const bCode = localStorage.getItem('b_code')

    if (!bCode || !userInfo) return;

    const user = JSON.parse(userInfo)

    await axios.post(`${SERVER_URL}/chat/roar/${bCode}`, {}, {
      params: {
        user_id: user.id
      }
    })
      .then(res => {
        const { data: { data: { count, entered } } } = res

        setNeighborCnt(count - 1)
        setActivate(true)
        localStorage.setItem('nsbjEntered', entered)
        OtherUser(targetX, targetY, count, MODE)
      })
      .catch(err => {
        alert(err)
      })
  }


  const routerToChat = () => {
    const bCode = localStorage.getItem('b_code');
    if (!bCode) { return; };
    history.push(`/chat/${bCode}/${region}`)
  }



  return (
    <div className={modeName}>
      <MainTop mode={MODE} activate={activate} neighborCnt={neighborCnt} region={region} />
      <MainBody btnActivate={btnActivate} mode={MODE} profile_image={profileIdx} />
      <MainMessage activate={activate} mode={MODE} routerToChat={routerToChat} />
      <MainBottom mode={MODE} />
    </div>
  )
}

