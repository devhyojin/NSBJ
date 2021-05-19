import { useState } from 'react';
import axios from 'axios';
import '../../styles/_modalCharacter.scss';

const SERVER_URL = process.env.REACT_APP_URL;

interface MyProfileProps {
  MODE: string;
  userId: string | undefined;
  characters: Array<any>;
  setCharacters: any;
  setMyCharacter: any;
  changeCharacterModalStatus: () => void;
}
export default function CharacterModal({
  MODE,
  userId,
  characters,
  setCharacters,
  setMyCharacter,
  changeCharacterModalStatus,
}: MyProfileProps) {
  const [isInfoCharacterActive, setIsInfoCharacterActive] = useState(false);
  const changeIsInfoCharacterActive = () => {
    setIsInfoCharacterActive(!isInfoCharacterActive);
  };
  // 모드 별 색상 전환
  let modeCharacterModal = 'dark__bg__purple character-modal-container';
  let modeCharacterInfo = 'dark__bg__red modal-character-info';
  let modeCheckedBorder = 'dark__ch__border';
  let modeBasicBorder = 'dark__bs__character__border';

  const tempCharacters = [...characters];
  if (MODE === 'light') {
    tempCharacters.splice(4, 4); // 모드 별 캐릭터 슬라이싱
    modeCharacterModal = 'light__bg__blue character-modal-container';
    modeCharacterInfo = 'light__bg__mint modal-character-info';
    modeCheckedBorder = 'light__ch__border';
    modeBasicBorder = 'light__bs__character__border';
  } else {
    tempCharacters.splice(0, 4);
  }

  // 선택된 캐릭터
  const baseClassName = 'character-select-zone ';
  const inactive = 'inactive';
  const active = 'active ';
  const checkBorder = (p: boolean): string => {
    let classValue = 'border ';
    if (p) {
      classValue += modeCheckedBorder;
    } else {
      classValue += modeBasicBorder;
    }
    return classValue;
  };

  // 활성화된 캐릭터, 비활성화된 캐릭터
  const ActiveCharacter = ({ c }: any, key: number) => {
    return (
      <div
        key={key}
        role="button"
        tabIndex={0}
        onKeyDown={() => null}
        onClick={() => changeCharacter(c.id)}
        className={baseClassName + active + checkBorder(c.picked)}
      >
        <img src={c.path} alt={c.title} />
        <p>{c.title}</p>
      </div>
    );
  };
  const InactiveCharacter = ({ c }: any, key: number) => {
    return (
      <div className={baseClassName + inactive} key={key}>
        <img src={c.path} alt={c.title} />
        <p>{c.title}</p>
      </div>
    );
  };

  const changeCharacter = (characterId: number): void => {
    // 1. characters 상태 업데이트 해주기, myCharacter 바꿔주기
    let idx = characterId;
    let x = 0;
    if (MODE === 'dark') {
      idx += 4;
      x += 4;
    }
    setMyCharacter(idx);
    const tempCharacters = [...characters];
    for (let i = x; i < x + 4; i += 1) {
      if (i === idx) {
        tempCharacters[i].picked = true;
      } else {
        tempCharacters[i].picked = false;
      }
    }
    setCharacters(tempCharacters);

    // 2. back에 보내주기
    axios.patch(
      `${SERVER_URL}/mypage/img`,
      {},
      { params: { profile_img: characterId, user_id: userId } },
    );
    setTimeout(() => changeCharacterModalStatus(), 300);
  };
  const ModalCharacterInfo = () => {
    return (
      <div className={modeCharacterInfo}>
        <div className="info-header">
          <p className="guide-name">캐릭터 가이드</p>
        </div>
        <div className="info-body">
          <p>각 포인트를 50점 이상 얻으면</p>
          <p>해당 카테고리의 캐릭터에</p>
          <p>접근할 수 있습니다!</p>
        </div>
      </div>
    );
  };

  return (
    <div className="character-modal-mask">
      <div role="button" tabIndex={0} onKeyDown={() => null} className={modeCharacterModal}>
        <div className="character-modal-header">
          <div className="header-group">
            <p className="character-modal-title">프로필 캐릭터 선택</p>
            <button
              onClick={() => changeIsInfoCharacterActive()}
              className="character-info-btn circle"
              type="submit"
            >
              <span>?</span>
            </button>
          </div>
          {isInfoCharacterActive && <ModalCharacterInfo />}
        </div>

        <div className="character-modal-body">
          {tempCharacters.map((character) => {
            return character.status ? (
              <ActiveCharacter key={character.id} c={character} />
            ) : (
              <InactiveCharacter key={character.id} c={character} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
