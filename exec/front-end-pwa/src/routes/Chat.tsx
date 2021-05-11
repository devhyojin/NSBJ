import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'

import SockJS from 'sockjs-client'
import Stomp from 'stompjs';

import ChatNav from '../components/Chat/ChatNav'
import ChatContent from '../components/Chat/ChatContent'
import ChatInput from '../components/Chat/ChatInput'

import ModeCheck from '../utils/ModeCheck';

import '../styles/_chat.scss'

const SERVER_URL = process.env.REACT_APP_URL


const sockJS = new SockJS(`${SERVER_URL}/ws-stomp`)
// const stompClient: Stomp.Client = Stomp.over(sockJS)
const webSocket = Stomp.over(sockJS)
console.log(webSocket)


export default function Chat() {
  const [data, setData] = useState([]);


  const mode = ModeCheck();
  const history = useHistory();
  const params = useParams();


  if (!params) { history.push('/main') }
  let chatDivClassName = 'chat chat__dark__mode';
  // 모드 체크 파트
  if (mode === 'light') { chatDivClassName = 'chat chat__light__mode'; };
  // 채팅창 백 버튼 (메인화면으로 진행)
  const backHandler = () => { history.push('/main') };


  const connect = () => {
    webSocket.connect({}, function () {
      webSocket.subscribe(`${SERVER_URL}/sub/chat/room/${params}`, function (message) {
        console.log(`${SERVER_URL}/sub/chat/room/${params}`)
        console.log(message, 'Connect webSocket')
      })
    })
  }

  const sendMessage = () => {
    webSocket.send('put/chat/message', {}, JSON.stringify({ type: 'TALK', roomId: 4111312800, sender: '104323557732025537658', message: 'test' }))
  }



  connect()

  return (
    <div className={chatDivClassName}>
      <button type='button' onClick={sendMessage} >test</button>
      <ChatNav backHandler={backHandler} />
      <ChatContent data={data} mode={mode} />
      <ChatInput />

    </div>
  );
}
