import React, { useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import axios from 'axios';

import ChatNav from '../components/Chat/ChatNav';
import ChatContent from '../components/Chat/ChatContent';
import ChatInput from '../components/Chat/ChatInput';
import FeedbackReceived from '../components/Chat/FeedbackReceived';
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
  const [isReactionActive, setIsReactionActive] = useState(false);
  const [reactionId, setReactionId] = React.useState(0);
  const [megaPhoneState, setMegaPhoneState] = React.useState(false);
  const mode = ModeCheck();
  const history = useHistory();
  const { regionId, bName, neighborCnt }: any = useParams();
  const userInfo = localStorage.getItem('userInfo');
  const entered = localStorage.getItem('nsbjEntered') ? localStorage.getItem('nsbjEntered') : false;
  let user_id = 0;

  React.useEffect(() => {
    console.log('다시마운트');
    readChat();
    sockJS.close();
    connect();
    console.log('리액션아이디', reactionId);
    openReaction();
  }, [reactionId]);

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

  const recvFeedback = (feedback: feedbackProps) => {
    console.log('11111리시브피드백', feedback);
    console.log('22222나', typeof user_id);
    console.log('33333보낸놈', typeof feedback.sender_id);
    console.log('44444받는놈', typeof feedback.receiver_id);
    // feedback.receiver_id로 바꿔주기
    if (String(user_id) === String(feedback.sender_id)) {
      console.log('55555나에게 온 메시지?');
      setReactionId(feedback.feedback_id);
      openReaction();
    }
  };

  const openReaction = () => {
    if (reactionId > 0) {
      setIsReactionActive(true);
      setTimeout(() => setIsReactionActive(false), 3000);
    }
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
        // 피드백 용
        ws.subscribe(
          `/feedback/room/${regionId}`,
          function (message) {
            console.log('00000바아아디요호우', message.body);
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
    console.log('55보냈다잉');
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
        sendFeedback={sendFeedback}
        deleteAnnounce={deleteAnnounce}
        addNull={addNull}
      />
      <ChatInput
        sendMessage={sendMessage}
        setMegaPhone={setMegaPhone}
        megaPhoneState={megaPhoneState}
      />
      {isReactionActive && (
        <FeedbackReceived setIsReactionActive={setIsReactionActive} reactionId={reactionId} />
      )}
    </div>
  );
}
