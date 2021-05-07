import React from 'react';
import axios from 'axios';
import '../../styles/_modalCharacter.scss';

const SERVER_URL = process.env.REACT_APP_URL;

interface MyProfileProps {
  MODE: string;
  characters: Array<any>;
  setCharacters: any;
  setMyCharacter: any;
  changeCharacterModalStatus: () => void;
}
export default function CharacterModal({
  MODE,
  characters,
  setCharacters,
  setMyCharacter,
  changeCharacterModalStatus,
}: MyProfileProps) {
  // 모드 별 색상 전환
  let modeCharacterModal = 'dark__bg__purple character-modal-container';
  let modeCheckedBorder = 'dark__ch__border';
  let modeBasicBorder = 'dark__bs__character__border';

  const tempCharacters = [...characters];
  if (MODE === 'light') {
    tempCharacters.splice(4, 4); // 모드 별 캐릭터 슬라이싱
    modeCharacterModal = 'light__bg__blue character-modal-container';
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
  const ActiveCharacter = (character: any, key: number): any => {
    const c = character.character;
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
  const InactiveCharacter = (character: any, key: number): any => {
    const c = character.character;
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
        tempCharacters[i].picked = !tempCharacters[i].picked;
      } else {
        tempCharacters[i].picked = false;
      }
    }
    setCharacters(tempCharacters);

    // 2. back에 보내주기
    // props userId로 변경해주기
    const uId = 1234567890;
    axios
      .patch(`${SERVER_URL}/mypage/img`, {}, { params: { profile_img: characterId, user_id: uId } })
      .then((res) => {
        console.log('캐릭터 성공', res);
      });
  };

  return (
    <div className="character-modal-mask">
      <div
        role="button"
        tabIndex={0}
        onKeyDown={() => null}
        onClick={() => changeCharacterModalStatus()}
        className={modeCharacterModal}
      >
        <div className="character-modal-header">
          <p>프로필 캐릭터 선택</p>
        </div>
        <div className="character-modal-body">
          {tempCharacters.map((character: any): any => {
            return character.status ? (
              <ActiveCharacter key={character.id} character={character} />
            ) : (
              <InactiveCharacter key={character.id} character={character} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
