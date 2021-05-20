import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import axios from 'axios';

import ChatNav from '../components/Chat/ChatNav';
import ChatContent from '../components/Chat/ChatContent';
import ChatInput from '../components/Chat/ChatInput';
import FeedbackReceived from '../components/Chat/FeedbackReceived';
import ModeCheck from '../utils/ModeCheck';
import RemoveEffect from '../utils/RemoveEffect';

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
  mode: string;
  count: number;
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
  const [data, setData] = useState<Array<msgProps>>();
  const [isReactionActive, setIsReactionActive] = useState<boolean>(false);
  const [reactionId, setReactionId] = useState<number>(0);
  const [megaPhoneState, setMegaPhoneState] = useState(false);
  const [neighborCnt, setNeighborCnt] = useState(0);
  const [megaphoneCnt, setMegaphoneCnt] = useState(0)
  const [badgeId, setBadgeId] = useState(0)
  const userInfoString = localStorage.getItem('userInfo')

  const mode = ModeCheck();
  const history = useHistory();
  const { regionId, bName }: any = useParams();
  const userInfo = localStorage.getItem('userInfo');
  const entered = localStorage.getItem('nsbjEntered') ? localStorage.getItem('nsbjEntered') : false;
  let user_id = 0;


  useEffect(() => {
    RemoveEffect()
    readChat();
    sockJS.close();
    connect();
    if (userInfoString !== null) {
      const userInfoObject = JSON.parse(userInfoString)
      const { megaphone_count } = userInfoObject
      const { badge: { id } } = userInfoObject
      setMegaphoneCnt(megaphone_count)
      setBadgeId(id)
    }
  }, []);

  useEffect(() => {
    openReaction();
  }, [reactionId])


  const recvMessage = (msg: msgProps) => {
    const { count } = msg
    setNeighborCnt(count)

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
    if (String(user_id) === String(feedback.receiver_id)) {
      setReactionId(feedback.feedback_id);
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
            entered,
          }),
        );
        // 피드백 용
        ws.subscribe(
          `/feedback/room/${regionId}`,
          function (message) {
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
    const min =
      date.getMinutes().toString().length === 2
        ? date.getMinutes().toString()
        : `0${date.getMinutes().toString()}`;
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

    if (type === 'ANNOUNCE') {
      if (userInfoString !== null) {
        const userInfoObject = JSON.parse(userInfoString)
        userInfoObject.megaphone_count -= 1
        localStorage.setItem('userInfo', JSON.stringify(userInfoObject))
      }
      setMegaphoneCnt(megaphoneCnt - 1)
    }
  };

  const sendFeedback = (
    id: number,
    receiverId: string,
    receiverBird: string,
    receiverMouse: string,
    receiverMode: string,
  ): void => {
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

  const deleteAnnounce = (chat: any) => {
    if (data) {
      setData(data.filter((msg) => msg !== chat));
    }
  };

  const addNull = () => {
    setData((prevData): any => {
      if (prevData === undefined) return {};
      return [...prevData];
    });
  };

  return (
    <div className={mode === 'light' ? 'chat chat__light__mode' : 'chat chat__dark__mode'}>
      <ChatNav backHandler={backHandler} bName={bName} neighborCnt={neighborCnt} mode={mode} />
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
        mode={mode}
        sendMessage={sendMessage}
        setMegaPhone={setMegaPhone}
        megaPhoneState={megaPhoneState}
        megaPhoneCnt={megaphoneCnt}
      />
      {isReactionActive && (
        <FeedbackReceived reactionId={reactionId} />
      )}
    </div>
  );
}
