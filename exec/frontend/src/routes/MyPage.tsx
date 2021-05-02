import React, { useState } from 'react';
import ConfirmModal from '../components/ConfirmModal';
import InfoModal from '../components/InfoModal';
import CharacterModal from '../components/CharacterModal';
import arrow from '../assets/flaticon/left-arrow.png';
import megaphone from '../assets/flaticon/megaphone.png';
import angelCnt from '../assets/flaticon/angel_cnt.png';
import heartCnt from '../assets/flaticon/heart_cnt.png';
import judgeCnt from '../assets/flaticon/judge_cnt.png';
import angel1 from '../assets/flaticon/angel1.png';
import angel2 from '../assets/flaticon/angel2.png';
import angel3 from '../assets/flaticon/angel3.png';
import heart1 from '../assets/flaticon/heart1.png';
import heart2 from '../assets/flaticon/heart2.png';
import heart3 from '../assets/flaticon/heart3.png';
import judge1 from '../assets/flaticon/judge1.png';
import judge2 from '../assets/flaticon/judge2.png';
import judge3 from '../assets/flaticon/judge3.png';
import birdBasic from '../assets/characters/bird/bird_basic.gif';
import birdAngel from '../assets/characters/bird/bird_angel.gif';
import birdHeart from '../assets/characters/bird/bird_heart.gif';
import birdJudge from '../assets/characters/bird/bird_judge.gif';
import mouseBasic from '../assets/characters/mouse/mouse_basic.gif';
import mouseAngel from '../assets/characters/mouse/mouse_angel.gif';
import mouseHeart from '../assets/characters/mouse/mouse_heart.gif';
import mouseJudge from '../assets/characters/mouse/mouse_judge.gif';
import '../styles/_mypage.scss';

export default function MyPage() {
  const stat: Array<any> = [
    { path: angelCnt, title: '리액션 포인트' },
    { path: heartCnt, title: '마음 포인트' },
    { path: judgeCnt, title: '해결 포인트' },
  ];
  const badges: Array<any> = [
    {
      cntPath: angelCnt,
      cntTitle: '리액션 포인트',
      cntStat: 10,
      badgePath: angel1,
      badgeTitle: '천사 컴퍼니 인턴',
    },
    {
      cntPath: angelCnt,
      cntTitle: '리액션 포인트',
      cntStat: 25,
      badgePath: angel2,
      badgeTitle: '마상 전용 마데카솔',
    },
    {
      cntPath: angelCnt,
      cntTitle: '리액션 포인트',
      cntStat: 50,
      badgePath: angel3,
      badgeTitle: '하늘을 울린 마음씨',
    },
    {
      cntPath: heartCnt,
      cntTitle: '마음 포인트',
      cntStat: 10,
      badgePath: heart1,
      badgeTitle: '마음 온도 100도씨',
    },
    {
      cntPath: heartCnt,
      cntTitle: '마음 포인트',
      cntStat: 25,
      badgePath: heart2,
      badgeTitle: '심장 마사지 마스터',
    },
    {
      cntPath: heartCnt,
      cntTitle: '마음 포인트',
      cntStat: 50,
      badgePath: heart3,
      badgeTitle: '마음 절도 전과 9범',
    },
    {
      cntPath: judgeCnt,
      cntTitle: '해결 포인트',
      cntStat: 10,
      badgePath: judge1,
      badgeTitle: '법 없어도 잘 살아',
    },
    {
      cntPath: judgeCnt,
      cntTitle: '해결 포인트',
      cntStat: 25,
      badgePath: judge2,
      badgeTitle: '고민 해결 마스터',
    },
    {
      cntPath: judgeCnt,
      cntTitle: '해결 포인트',
      cntStat: 50,
      badgePath: judge3,
      badgeTitle: '솔로몬 직계 혈통',
    },
  ];
  const characters: Array<any> = [
    { id: 1, characterPath: birdBasic, characterTitle: '노말짹' },
    { id: 2, characterPath: birdAngel, characterTitle: '엔젤짹' },
    { id: 3, characterPath: birdHeart, characterTitle: '큐피짹' },
    { id: 4, characterPath: birdJudge, characterTitle: '엘맅짹' },
    // { characterPath: mouseBasic, characterTitle: '노말찍' },
    // { characterPath: mouseAngel, characterTitle: '엔젤찍' },
    // { characterPath: mouseHeart, characterTitle: '큐피찍' },
    // { characterPath: mouseJudge, characterTitle: '엘맅찍' },
  ];
  const [confirmStatus, setConfirmStatus] = useState<boolean>(false);
  const [infoStatus, setInfoStatus] = useState<boolean>(false);
  const [characterStatus, setCharacterStatus] = useState<boolean>(false);
  const [myCharacter, setMyCharacter] = useState(birdBasic);
  const changeConfirmStatus = (): void => {
    setConfirmStatus(!confirmStatus);
  };
  const changeInfoStatus = (): void => {
    setInfoStatus(!infoStatus);
  };
  const changeCharacterStatus = (): void => {
    setCharacterStatus(!characterStatus);
  };
  const changeCharacter = (characterTitle: any): void => {
    setMyCharacter(characterTitle);
  };
  // const changeCharacter = (id: number): void => {
  //   if (id === 1) {
  //     setMyCharacter(birdBasic);
  //   } else if (id === 2) {
  //     setMyCharacter(birdAngel);
  //   } else if (id === 3) {
  //     setMyCharacter(birdHeart);
  //   } else {
  //     setMyCharacter(birdJudge);
  //   }
  // };

  return (
    <div className="container">
      {/* 뒤로 가기, 탈퇴하기  */}
      <div className="header">
        <img src={arrow} alt="arrow" />
        <p className="withdrawl">탈퇴하기</p>
      </div>
      <div className="body">
        <div className="top">
          {/* 캐릭터 변경 존 */}
          <div className="character-zone">
            <div className="circle character-circle">
              <img className="my-character" src={myCharacter} alt="character" />
            </div>
            <button
              onClick={changeCharacterStatus}
              type="submit"
              className="circle character-change"
            >
              +
            </button>
            {characterStatus && (
              <CharacterModal
                characters={characters}
                changeCharacterStatus={changeCharacterStatus}
                changeCharacter={changeCharacter}
              />
            )}
          </div>
          {/* 닉네임 존 */}
          <div className="nickname-zone">
            <p className="location">안암동</p>
            <p className="aka">하늘을 울린 마음씨</p>
            <p className="nickname">곶감 먹는 감청색 딱따구리</p>
            <div>
              <button onClick={changeConfirmStatus} type="submit" className="btn">
                닉네임 변경
              </button>
              {confirmStatus && <ConfirmModal changeConfirmStatus={changeConfirmStatus} />}
            </div>
          </div>
        </div>
        <hr />
        <div className="middle">
          {/* 스토리지 */}
          <div className="cnt-zone">
            <img className="icon" src={megaphone} alt="확성기" />
            <p className="cnt">1회</p>
          </div>
          {stat.map((s) => (
            <div key={s.path} className="cnt-zone">
              <img className="icon cnt-icon" src={s.path} alt={s.title} />
              <p className="cnt">1회</p>
            </div>
          ))}
        </div>
        <hr />
        <div className="bottom">
          <div className="badge-title-zone">
            <p className="badge-title">당신의 칭호를 골라보세요!</p>
            <button onClick={changeInfoStatus} type="submit">
              <span>?</span>
            </button>
            {infoStatus && <InfoModal badges={badges} />}
          </div>

          <div className="badge-container">
            {badges.map((badge) => (
              <div className="badge-item" key={badge.badgeTitle}>
                <img className="badge-icon" src={badge.badgePath} alt={badge.badgeTitle} />
                <p className="badge-name">{badge.badgeTitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
