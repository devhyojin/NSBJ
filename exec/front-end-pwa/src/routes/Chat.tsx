import React from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

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
  roomId: number;
  message: string;
  sentAt: string;
  senderId: string;
  birdName: string;
  mouseName: string;
  badge: any;
  profileImg: number;
  mode: string;
}
interface feedbackProps {
  feedback_id: number;
  region_id: number;
  sender_id: string;
  receiver_id: string;
  receiver_bird: string;
  receiver_mouse: string;
  mode: string;
}

const SERVER_URL = process.env.REACT_APP_URL;

let sockJS = new SockJS(`${SERVER_URL}/ws-stomp`);
let ws = Stomp.over(sockJS);
let reconnect = 0;

export default function Chat() {
  const [data, setData] = React.useState<Array<msgProps>>();
  const [feedbackData, setFeedbackData] = React.useState<feedbackProps>();
  const [megaPhoneState, setMegaPhoneState] = React.useState(false);
  const mode = ModeCheck();
  const history = useHistory();
  const { regionId }: any = useParams();
  const userInfo = localStorage.getItem('userInfo');
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
    });
  };

  const recvFeedback = (feedback: feedbackProps) => {
    console.log(feedback);
    setFeedbackData(feedback);
    setTimeout(() => console.log('핃백데이터', feedbackData), 3000);
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
          }),
        );
        // 피드백 용
        ws.subscribe(
          `/feedback/room/${regionId}`,
          function (message) {
            console.log('바아아디요호우', message.body);
            const recv = JSON.parse(message.body);
            recvFeedback(recv);
          },
          function () {
            console.log('err');
          },
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
    const sentAt = `${date.getHours().toString()}:${date.getMinutes().toString()}`;
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

  const sendFeedback = (
    id: number,
    receiverId: string,
    receiverBird: string,
    receiverMouse: string,
    receiverMode: string,
  ): void => {
    console.log('44센드피드백 돌입');
    ws.send(
      `/pub/chat/feedback`,
      {},
      JSON.stringify({
        feedback_id: id,
        region_id: regionId,
        sender_id: user_id,
        receiver_id: receiverId,
        receiver_bird: receiverBird,
        receiver_mouse: receiverMouse,
        mode: receiverMode,
      }),
    );
  };

  const setMegaPhone = (): void => {
    setMegaPhoneState(!megaPhoneState);
  };
  return (
    <div className={mode === 'light' ? 'chat chat__light__mode' : 'chat chat__dark__mode'}>
      <ChatNav backHandler={backHandler} />
      <ChatContent
        data={data}
        mode={mode}
        user_id={user_id}
        region_id={regionId}
        sendFeedback={sendFeedback}
      />
      <ChatInput
        sendMessage={sendMessage}
        setMegaPhone={setMegaPhone}
        megaPhoneState={megaPhoneState}
      />
    </div>
  );
}
