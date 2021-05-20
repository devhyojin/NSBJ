import { useState, useEffect } from 'react';
import axios from 'axios';
import ModalConfirmNickname from './ModalConfirmNickname';
import ModalCharacter from './ModalCharacter';
import birdBasic from '../../assets/characters/bird/bird_basic.gif';
import birdAngel from '../../assets/characters/bird/bird_angel.gif';
import birdHeart from '../../assets/characters/bird/bird_heart.gif';
import birdJudge from '../../assets/characters/bird/bird_judge.gif';
import mouseBasic from '../../assets/characters/mouse/mouse_basic.gif';
import mouseAngel from '../../assets/characters/mouse/mouse_angel.gif';
import mouseHeart from '../../assets/characters/mouse/mouse_heart.gif';
import mouseJudge from '../../assets/characters/mouse/mouse_judge.gif';

const SERVER_URL = process.env.REACT_APP_URL;

interface MyProfileProps {
  MODE: string;
  userId: string | undefined;
  myAKA: string | undefined;
  setMyAKA: any;
}

export default function MyProfile({ MODE, userId, myAKA, setMyAKA }: MyProfileProps) {
  useEffect(() => {
    axios.get(`${SERVER_URL}/mypage`, { params: { user_id: userId } }).then((res) => {
      const tempCharacters = [...characters];
      const response = res.data.data;

      let profileIdx = response.profile_img;
      if (MODE === 'dark') {
        profileIdx += 4;
      }
      tempCharacters[profileIdx].picked = true;
      setCharacters(tempCharacters);
      setMyCharacter(profileIdx);
      setMyRegion(response.region.region_name);
      setMyAKA(response.badge.badge_name);
      setNicknameFlag(response.changed_nickname);

      if (MODE === 'light') {
        setMyNickName(response.nickname.light);
      } else {
        setMyNickName(response.nickname.dark);
      }
      // 캐릭터 활성화 여부 판독하기
      characterCalculator(tempCharacters, 1, response.feedback.angel_count);
      characterCalculator(tempCharacters, 2, response.feedback.heart_count);
      characterCalculator(tempCharacters, 3, response.feedback.judge_count);
    });
  }, []);

  // 모드 별 색상 전환
  let modeProfile = 'dark__bg__red circle character-circle';
  let modeCharacterBtn = 'dark__bg__purple circle character-change';
  let modeRegion = 'dark__region location';
  let modeNicknameBtn = 'dark__nn__btn nicknameBtn';
  let initIdx = 4; // 모드 별 기본 캐릭터(노말O) index
  if (MODE === 'light') {
    modeProfile = 'light__bg__mint circle character-circle';
    modeCharacterBtn = 'light__bg__blue circle character-change';
    modeRegion = 'light__region location';
    modeNicknameBtn = 'light__nn__btn nicknameBtn';
    initIdx = 0;
  }

  const initCharacters: Array<any> = [
    { id: 0, path: birdBasic, title: '노말짹', status: true, picked: false },
    { id: 1, path: birdAngel, title: '엔젤짹', status: false, picked: false },
    { id: 2, path: birdHeart, title: '큐피짹', status: false, picked: false },
    { id: 3, path: birdJudge, title: '엘맅짹', status: false, picked: false },
    { id: 0, path: mouseBasic, title: '노말찍', status: true, picked: false },
    { id: 1, path: mouseAngel, title: '엔젤찍', status: false, picked: false },
    { id: 2, path: mouseHeart, title: '큐피찍', status: false, picked: false },
    { id: 3, path: mouseJudge, title: '엘맅찍', status: false, picked: false },
  ];
  const [nicknameFlag, setNicknameFlag] = useState<boolean>(false);
  const [characters, setCharacters] = useState(initCharacters);
  const [myCharacter, setMyCharacter] = useState(initIdx);
  const [myRegion, setMyRegion] = useState();
  const [myNickName, setMyNickName] = useState<string>();
  const [characterModalStatus, setCharacterModalStatus] = useState<boolean>(false);
  const [nicknameModalStatus, setNicknameModalStatus] = useState<boolean>(false);

  // 모달 여닫기
  const changeCharacterModalStatus = (): void => {
    setCharacterModalStatus(!characterModalStatus);
  };
  const changeNicknameModalStatus = (): void => {
    setNicknameModalStatus(!nicknameModalStatus);
  };

  // 캐릭터 활성화 판독하기
  const characterCalculator = (tempCharacters: Array<any>, idx: number, feedbackCnt: number) => {
    if (feedbackCnt >= 50) {
      tempCharacters[idx].status = true;
      tempCharacters[idx + 4].status = true;
    }
    setCharacters(tempCharacters);
  };

  // 백에서 바뀐 닉네임 가져오기
  const getNewNickname = (): void => {
    axios
      .get(`${SERVER_URL}/mypage`, { params: { user_id: userId } })
      .then((res) => {
        console.log('닉네임 잘 가져왔음');
        const response = res.data.data;
        if (MODE === 'light') {
          setMyNickName(response.nickname.light);
        } else {
          setMyNickName(response.nickname.dark);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 닉네임 바꾸는 요청 back에 보낸 후, 새로운 닉네임 업데이트 하기
  const changeNickname = (): void => {
    if (nicknameFlag) {
      alert('하루에 한 번만 변경 가능합니다.');
    } else {
      axios
        .patch(`${SERVER_URL}/mypage/nickname`, {}, { params: { mode: MODE, user_id: userId } })
        .then(() => {
          getNewNickname();
        });
    }
  };

  return (
    <div className="my-profile">
      {/* 캐릭터 변경 존 */}
      <div className="character-zone">
        <div className={modeProfile}>
          <img className="my-character" src={characters[myCharacter].path} alt="character" />
        </div>
        <button
          className={modeCharacterBtn}
          onClick={() => changeCharacterModalStatus()}
          type="submit"
        >
          <span>+</span>
        </button>
        {characterModalStatus && (
          <ModalCharacter
            MODE={MODE}
            userId={userId}
            characters={characters}
            setCharacters={setCharacters}
            setMyCharacter={setMyCharacter}
            changeCharacterModalStatus={changeCharacterModalStatus}
          />
        )}
      </div>
      {/* 닉네임 존 */}
      <div className="nickname-zone">
        <p className={modeRegion}>{myRegion}</p>
        <p className="aka">{myAKA}</p>
        <p className="nickname">{myNickName}</p>
        <div>
          <button
            className={modeNicknameBtn}
            onClick={() => changeNicknameModalStatus()}
            type="submit"
          >
            닉네임 변경
          </button>
          {nicknameModalStatus && (
            <ModalConfirmNickname
              MODE={MODE}
              changeNickname={changeNickname}
              changeNicknameModalStatus={changeNicknameModalStatus}
            />
          )}
        </div>
      </div>
    </div>
  );
}
