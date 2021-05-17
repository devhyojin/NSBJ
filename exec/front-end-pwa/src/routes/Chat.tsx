import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import axios from 'axios';

import ChatNav from '../components/Chat/ChatNav';
import ChatContent from '../components/Chat/ChatContent';
import ChatInput from '../components/Chat/ChatInput';

import ModeCheck from '../utils/ModeCheck';

import '../styles/_chat.scss';

interface msgProps {
  type: string;
  room_id: number;
  message: string;
  sent_at: string;
  sender_id: string;
  bird_name: string;
  mouse_name: string;
  badge: any;
  profile_img: number;
  mode: string
}

const SERVER_URL = process.env.REACT_APP_URL;

let sockJS = new SockJS(`${SERVER_URL}/ws-stomp`);
let ws = Stomp.over(sockJS);
let reconnect = 0;

export default function Chat() {
  const [data, setData] = React.useState<Array<msgProps>>();
  const [megaPhoneState, setMegaPhoneState] = React.useState(false);
  const mode = ModeCheck();
  const history = useHistory();
  const { regionId, bName, neighborCnt }: any = useParams();
  const userInfo = localStorage.getItem('userInfo');
  const entered = localStorage.getItem('nsbjEntered') ? localStorage.getItem('nsbjEntered') : false;
  let user_id = 0;

  React.useEffect(() => {
    readChat();
    sockJS.close();
    connect();
  }, []);

  const recvMessage = (msg: msgProps) => {
    setData((prevData) => {
      if (!prevData) {
        return [msg];
      }
      return [...prevData, msg];
    });
  };

  const readChat = () => {
    axios.get(`${SERVER_URL}/chat/region/${regionId}`).then((res) => {
      const chat = res.data.data;
      setData(chat);
      console.log(res)
    });
  };

  if (regionId === '' || !userInfo) {
    history.push('/main');
  } else {
    user_id = JSON.parse(userInfo).id;
  }

  // 채팅창 백 버튼 (메인화면으로 진행)
  const backHandler = () => {
    history.push('/main');
  };

  const connect = () => {
    ws.connect(
      {},
      function () {
        ws.subscribe(
          `/sub/chat/room/${regionId}`,
          function (message) {
            const recv = JSON.parse(message.body);
            recvMessage(recv);
          },
          function () {
            console.log('err');
          },
        );
        ws.send(
          `/pub/chat/message`,
          {},
          JSON.stringify({
            type: 'ENTER',
            mode,
            room_id: regionId,
            sender_id: user_id,
            message: '',
            sent_at: '2021-05-11',
            entered
          }),
        );
      },
      function () {
        if (reconnect <= 5) {
          reconnect += 1;
          setTimeout(() => {
            console.log('connection error... reconnecting...');
            sockJS = new SockJS(`${SERVER_URL}/ws-stomp`);
            ws = Stomp.over(sockJS);
            connect();
          }, 1000);
        }
      },
    );
  };

  const sendMessage = (content: string, type: string) => {
    const date = new Date();
    const min = date.getMinutes().toString().length === 2 ? date.getMinutes().toString() : `0${date.getMinutes().toString()}`
    const sentAt = `${date.getHours().toString()}:${min}`;
    ws.send(
      `/pub/chat/message`,
      {},
      JSON.stringify({
        type,
        mode,
        room_id: regionId,
        sender_id: user_id,
        message: content,
        sent_at: sentAt,
      }),
    );
  };

  const setMegaPhone = (): void => {
    setMegaPhoneState(!megaPhoneState)
  }


  const deleteAnnounce = ((chat: any) => {
    if (data) {
      setData(data.filter(msg => msg !== chat))
    }
  })

  const addNull = () => {

    setData((prevData): any => {
      if (prevData === undefined) return {};
      return [...prevData]
    })
  }


  return (
    <div className={mode === 'light' ? 'chat chat__light__mode' : 'chat chat__dark__mode'}>
      <ChatNav
        backHandler={backHandler}
        bName={bName}
        neighborCnt={neighborCnt}
        mode={mode}
      />
      <ChatContent
        data={data}
        mode={mode}
        user_id={user_id}
        region_id={regionId}
        deleteAnnounce={deleteAnnounce}
        addNull={addNull}
      />
      <ChatInput
        sendMessage={sendMessage}
        setMegaPhone={setMegaPhone}
        megaPhoneState={megaPhoneState}
      />
    </div>
  );
}
