import React, { useState, useEffect } from 'react';
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

export default function MyProfile({ MODE, myAKA, setMyAKA }): string {
  const characters: Array<any> = [
    { id: 0, path: birdBasic, title: '노말짹' },
    { id: 1, path: birdAngel, title: '엔젤짹' },
    { id: 2, path: birdHeart, title: '큐피짹' },
    { id: 3, path: birdJudge, title: '엘맅짹' },
    { id: 0, path: mouseBasic, title: '노말찍' },
    { id: 1, path: mouseAngel, title: '엔젤찍' },
    { id: 2, path: mouseHeart, title: '큐피찍' },
    { id: 3, path: mouseJudge, title: '엘맅찍' },
  ];
  let nicknameFlag = false;
  const [characterStatus, setCharacterStatus] = useState<boolean>(false);
  const [confirmStatus, setConfirmStatus] = useState<boolean>(false);
  const [myCharacter, setMyCharacter] = useState(0);
  const [myRegion, setMyRegion] = useState();
  const [myNickName, setMyNickName] = useState<string>();
  const changeCharacterStatus = (): void => {
    setCharacterStatus(!characterStatus);
  };
  const changeConfirmStatus = (): void => {
    setConfirmStatus(!confirmStatus);
  };
  const changeCharacter = (characterId: number): void => {
    console.log(characterId);
    // 1. myCharacter 바꿔주기
    let idx = characterId;
    console.log('캐릭터아이디', characterId);
    if (MODE === 'dark') {
      idx += 4;
    }
    setMyCharacter(idx);

    // 2. back에 보내주기
    const userId = 1234567890;
    console.log('캐릭터 클릭');
    axios
      .patch(`${SERVER_URL}/mypage/img`, {}, { params: { id: userId, profile_img: characterId } })
      .then((res) => {
        console.log('캐릭터 성공', res);
      });
  };
  const changeNickname = (): void => {
    const userId = 1234567890;
    if (nicknameFlag) {
      alert('하루에 한 번만 변경 가능합니다.');
    } else {
      axios
        .patch(`${SERVER_URL}/mypage/nickname`, {}, { params: { id: userId, mode: 'light' } })
        .then((res) => {
          console.log('닉네임 성공', res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    // 아이디 잡아오고 수정하기
    const userId = 1234567890;
    console.log('확인');
    axios.get(`${SERVER_URL}/mypage`, { params: { id: userId } }).then((res) => {
      console.log('성공', res.data.data);
      const response = res.data.data;
      let profileIdx = response.profile_img;
      if (MODE === 'dark') {
        profileIdx += 4;
      }
      setMyCharacter(profileIdx);
      setMyRegion(response.region_id);
      setMyNickName(response.nickname);
      nicknameFlag = response.changed_nickname;
    });
  }, []);

  return (
    <div className="my-profile">
      {/* 캐릭터 변경 존 */}
      <div className="character-zone">
        <div className="circle character-circle">
          <img className="my-character" src={characters[myCharacter].path} alt="character" />
        </div>
        <button
          onClick={() => changeCharacterStatus()}
          type="submit"
          className="circle character-change"
        >
          +
        </button>
        {characterStatus && (
          <ModalCharacter
            characters={characters}
            changeCharacterStatus={changeCharacterStatus}
            changeCharacter={changeCharacter}
            MODE={MODE}
          />
        )}
      </div>
      {/* 닉네임 존 */}
      <div className="nickname-zone">
        <p className="location">{myRegion}</p>
        <p className="aka">{myAKA}</p>
        <p className="nickname">{myNickName}</p>
        <div>
          <button onClick={() => changeConfirmStatus()} type="submit" className="btn">
            닉네임 변경
          </button>
          {confirmStatus && (
            <ModalConfirmNickname
              changeConfirmStatus={changeConfirmStatus}
              changeNickname={changeNickname}
            />
          )}
        </div>
      </div>
    </div>
  );
}
