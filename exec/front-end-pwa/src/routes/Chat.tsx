import React from 'react';
import { useHistory } from 'react-router-dom'

import ChatNav from '../components/Chat/ChatNav'
import ChatContent from '../components/Chat/ChatContent'
import ChatInput from '../components/Chat/ChatInput'

import ModeCheck from '../utils/ModeCheck';

import '../styles/_chat.scss'



export default function Chat() {
  const mode = ModeCheck();
  const history = useHistory()
  let chatDivClassName = 'chat chat__dark__mode';

  // 모드 체크 파트
  if (mode === 'light') { chatDivClassName = 'chat chat__light__mode'; };

  // 채팅창 백 버튼 (메인화면으로 진행)
  const backHandler = () => { history.push('/main') };

  // 더미데이터
  const data = {
    chat: [
      { user_id: 1, nickname: '쥐인척하는 고라니', profile_img: 1, badge: 2, msg: '삼청동 여러분 반갑습니다!', sent: 1 },
      { user_id: 2, nickname: '쥐인 척하는 두더지', profile_img: 1, badge: 2, msg: 'ㅎㅇㅎㅇ뉴비인가 보군요:)', sent: 1 },
      { user_id: 3, nickname: '쥐인 척하는 코끼리', profile_img: 1, badge: 2, msg: '여기 삼청동 대화방에서는 건전 얘기 위주로 나누는 곳입니다. 비속어 등의 격한 언어표현은 삼가해주세요~', sent: 1 },
      { user_id: 1, nickname: '쥐인척하는 고라니', profile_img: 1, badge: 2, msg: '삼청동 여러분 반갑습니다!', sent: 1 },
      { user_id: 2, nickname: '쥐인 척하는 두더지', profile_img: 1, badge: 2, msg: 'ㅎㅇㅎㅇ뉴비인가 보군요:)', sent: 1 },
      { user_id: 3, nickname: '쥐인 척하는 코끼리', profile_img: 1, badge: 2, msg: '여기 삼청동 대화방에서는 건전 얘기 위주로 나누는 곳입니다. 비속어 등의 격한 언어표현은 삼가해주세요~', sent: 1 },
      { user_id: 1, nickname: '쥐인척하는 고라니', profile_img: 1, badge: 2, msg: '삼청동 여러분 반갑습니다!', sent: 1 },
      { user_id: 2, nickname: '쥐인 척하는 두더지', profile_img: 1, badge: 2, msg: 'ㅎㅇㅎㅇ뉴비인가 보군요:)', sent: 1 },
      { user_id: 3, nickname: '쥐인 척하는 코끼리', profile_img: 1, badge: 2, msg: '여기 삼청동 대화방에서는 건전 얘기 위주로 나누는 곳입니다. 비속어 등의 격한 언어표현은 삼가해주세요~', sent: 1 },
      { user_id: 1, nickname: '쥐인척하는 고라니', profile_img: 1, badge: 2, msg: '삼청동 여러분 반갑습니다!', sent: 1 },
      { user_id: 2, nickname: '쥐인 척하는 두더지', profile_img: 1, badge: 2, msg: 'ㅎㅇㅎㅇ뉴비인가 보군요:)', sent: 1 },
      { user_id: 3, nickname: '쥐인 척하는 코끼리', profile_img: 1, badge: 2, msg: '여기 삼청동 대화방에서는 건전 얘기 위주로 나누는 곳입니다. 비속어 등의 격한 언어표현은 삼가해주세요~', sent: 1 },
      { user_id: 1, nickname: '쥐인척하는 고라니', profile_img: 1, badge: 2, msg: '삼청동 여러분 반갑습니다!', sent: 1 },
      { user_id: 2, nickname: '쥐인 척하는 두더지', profile_img: 1, badge: 2, msg: 'ㅎㅇㅎㅇ뉴비인가 보군요:)', sent: 1 },
      { user_id: 3, nickname: '쥐인 척하는 코끼리', profile_img: 1, badge: 2, msg: '여기 삼청동 대화방에서는 건전 얘기 위주로 나누는 곳입니다. 비속어 등의 격한 언어표현은 삼가해주세요~', sent: 1 },
      { user_id: 1, nickname: '쥐인척하는 고라니', profile_img: 1, badge: 2, msg: '삼청동 여러분 반갑습니다!', sent: 1 },
      { user_id: 2, nickname: '쥐인 척하는 두더지', profile_img: 1, badge: 2, msg: 'ㅎㅇㅎㅇ뉴비인가 보군요:)', sent: 1 },
      { user_id: 3, nickname: '쥐인 척하는 코끼리', profile_img: 1, badge: 2, msg: '여기 삼청동 대화방에서는 건전 얘기 위주로 나누는 곳입니다. 비속어 등의 격한 언어표현은 삼가해주세요~', sent: 1 },
      { user_id: 1, nickname: '쥐인척하는 고라니', profile_img: 1, badge: 2, msg: '삼청동 여러분 반갑습니다!', sent: 1 },
      { user_id: 2, nickname: '쥐인 척하는 두더지', profile_img: 1, badge: 2, msg: 'ㅎㅇㅎㅇ뉴비인가 보군요:)', sent: 1 },
      { user_id: 3, nickname: '쥐인 척하는 코끼리', profile_img: 1, badge: 2, msg: '여기 삼청동 대화방에서는 건전 얘기 위주로 나누는 곳입니다. 비속어 등의 격한 언어표현은 삼가해주세요~', sent: 1 },
      { user_id: 1, nickname: '쥐인척하는 고라니', profile_img: 1, badge: 2, msg: '삼청동 여러분 반갑습니다!', sent: 1 },
      { user_id: 2, nickname: '쥐인 척하는 두더지', profile_img: 1, badge: 2, msg: 'ㅎㅇㅎㅇ뉴비인가 보군요:)', sent: 1 },
      { user_id: 3, nickname: '쥐인 척하는 코끼리', profile_img: 1, badge: 2, msg: '여기 삼청동 대화방에서는 건전 얘기 위주로 나누는 곳입니다. 비속어 등의 격한 언어표현은 삼가해주세요~', sent: 1 }
    ],
    count: 10,
    user: [
      { user_id: 2, nickname: '쥐인 척하는 두더지', profile_img: 1, badge: 2, megaphone_count: 2 }]
  }


  return (
    <div className={chatDivClassName}>
      <ChatNav backHandler={backHandler} />
      <ChatContent data={data} mode={mode} />
      <ChatInput />

    </div>
  );
}
