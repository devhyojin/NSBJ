import React from 'react';
import '../../styles/_modalCharacter.scss';

interface MyProfileProps {
  characters: Array<any>;
  changeCharacterStatus: () => void;
  changeCharacter: (characterId: number) => void;
}
export default function CharacterModal({
  characters,
  changeCharacterStatus,
  changeCharacter,
  MODE,
}: MyProfileProps) {
  const modeCharacters = [...characters];
  if (MODE === 'light') {
    modeCharacters.splice(4, 4);
  } else {
    modeCharacters.splice(0, 4);
  }
  console.log(modeCharacters);

  return (
    <div className="character-modal-mask">
      <div
        role="button"
        tabIndex={0}
        onClick={() => changeCharacterStatus()}
        onKeyDown={() => null}
        className="character-modal-container"
      >
        <div className="character-modal-header">
          <p>프로필 캐릭터 선택</p>
        </div>
        <div className="character-modal-body">
          {modeCharacters.map((character: any) => (
            <div
              role="button"
              tabIndex={0}
              onKeyDown={() => null}
              onClick={() => changeCharacter(character.id)}
              key={character.title}
              className="character-select-zone"
            >
              <img src={character.path} alt={character.title} />
              <p>{character.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
