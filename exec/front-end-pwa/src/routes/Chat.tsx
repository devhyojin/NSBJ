import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom'

import SockJS from 'sockjs-client'
import Stomp from 'stompjs';

import ChatNav from '../components/Chat/ChatNav'
import ChatContent from '../components/Chat/ChatContent'
import ChatInput from '../components/Chat/ChatInput'

import ModeCheck from '../utils/ModeCheck';

import '../styles/_chat.scss'

const SERVER_URL = process.env.REACT_APP_URL

let sockJS = new SockJS(`${SERVER_URL}/ws-stomp`)
let ws = Stomp.over(sockJS)


export default function Chat() {
  const [data, setData] = useState([]);
  const mode = ModeCheck();
  const history = useHistory();
  const { state: { chat } }: any = useLocation();
  const { regionId }: any = useParams();

  useEffect(() => {
    setData(chat)
  }, [])

  if (regionId === '') { history.push('/main') }

  let chatDivClassName = 'chat chat__dark__mode';
  // 모드 체크 파트
  if (mode === 'light') { chatDivClassName = 'chat chat__light__mode'; };
  // 채팅창 백 버튼 (메인화면으로 진행)
  const backHandler = () => { history.push('/main') };




  const connect = () => {
    ws.connect({}, function () {
      ws.subscribe(`/sub/chat/room/${regionId}`, function (message) {
        const recv = JSON.parse(message.body)
        recvMessage(recv)
      })
      ws.send(`/pub/chat/message`, {}, JSON.stringify({ type: 'ENTER', mode, room_id: regionId, sender_id: '104323557732025537658', message: 'test1', sent_at: '2021-05-11' }))
    }, function () {
      console.log('connection error')
      sockJS = new SockJS(`${SERVER_URL}/ws-stomp`)
      ws = Stomp.over(sockJS)
      connect()
    })
  }

  const sendMessage = () => {
    ws.send(`/pub/chat/message`, {}, JSON.stringify({ type: 'TALK', mode, room_id: regionId, sender_id: '104323557732025537658', message: 'test1aaas', sent_at: '2021-05-11' }))
  }

  const recvMessage = (msg: any) => {
    console.log(msg, 'recive message')
  }

  connect()

  return (
    <div className={chatDivClassName}>
      <ChatNav backHandler={backHandler} />
      <ChatContent data={data} mode={mode} />
      <ChatInput sendMessage={sendMessage} />
    </div>
  );
}
