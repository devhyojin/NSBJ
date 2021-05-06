import React, { useEffect } from 'react';
import axios from 'axios';
import '../../styles/_modalCharacter.scss';

const SERVER_URL = process.env.REACT_APP_URL;

interface MyProfileProps {
  characters: Array<any>;
  setCharacters: Array<any>;
  setMyCharacter: number;
  changeCharacterStatus: () => void;
}
export default function CharacterModal({
  MODE,
  characters,
  setCharacters,
  setMyCharacter,
  changeCharacterStatus,
}: MyProfileProps) {
  let modeCharacterModal = 'dark__bg__purple character-modal-container';
  let modeCheckedBorder = 'dark__ch__border';
  let modeBasicBorder = 'dark__bs__character__border';

  const tempCharacters = [...characters];
  if (MODE === 'light') {
    tempCharacters.splice(4, 4);
    modeCharacterModal = 'light__bg__blue character-modal-container';
    modeCheckedBorder = 'light__ch__border';
    modeBasicBorder = 'light__bs__character__border';
  } else {
    tempCharacters.splice(0, 4);
  }

  const baseClassName = 'character-select-zone ';
  const inactive = 'inactive';
  const active = 'active ';
  const checkBorder = (p) => {
    let classValue = 'border ';
    if (p) {
      classValue += modeCheckedBorder;
    } else {
      classValue += modeBasicBorder;
    }
    return classValue;
  };

  const ActiveCharacter = (character, key) => {
    const c = character.character;
    return (
      <div
        role="button"
        tabIndex={0}
        onKeyDown={() => null}
        onClick={() => changeCharacter(c.id)}
        key={key}
        className={baseClassName + active + checkBorder(c.picked)}
      >
        <img src={c.path} alt={c.title} />
        <p>{c.title}</p>
      </div>
    );
  };
  const InactiveCharacter = (character, key) => {
    const c = character.character;
    return (
      <div key={key} className={baseClassName + inactive}>
        <img src={c.path} alt={c.title} />
        <p>{c.title}</p>
      </div>
    );
  };

  const changeCharacter = (characterId: number): void => {
    // 1. characters 상태 업데이트 해주기, myCharacter 바꿔주기
    let idx = characterId;
    let x = 0;
    console.log('캐릭터아이디', characterId);
    if (MODE === 'dark') {
      idx += 4;
      x += 4;
    }
    setMyCharacter(idx);
    const tempCharacters = [...characters];
    console.log('ㅍㅍㅍㅍ', tempCharacters);
    for (let i = x; i < x + 4; i += 1) {
      if (i === idx) {
        tempCharacters[i].picked = !tempCharacters[i].picked;
      } else {
        tempCharacters[i].picked = false;
      }
    }
    setCharacters(tempCharacters);

    // 2. back에 보내주기
    const userId = 1234567890;
    console.log('캐릭터 클릭');
    axios
      .patch(
        `${SERVER_URL}/mypage/img`,
        {},
        { params: { profile_img: characterId, user_id: userId } },
      )
      .then((res) => {
        console.log('캐릭터 성공', res);
      });
  };

  useEffect(() => {
    console.log('ffdfhsdfdsfsfsd', tempCharacters);
  });
  return (
    <div className="character-modal-mask">
      <div
        role="button"
        tabIndex={0}
        onClick={() => changeCharacterStatus()}
        onKeyDown={() => null}
        className={modeCharacterModal}
      >
        <div className="character-modal-header">
          <p>프로필 캐릭터 선택</p>
        </div>
        <div className="character-modal-body">
          {tempCharacters.map((character: any) => {
            return character.status ? (
              <ActiveCharacter character={character} key={character.id} />
            ) : (
              <InactiveCharacter character={character} key={character.id} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
