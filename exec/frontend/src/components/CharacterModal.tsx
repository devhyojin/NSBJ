import React from 'react';
import '../styles/_characterModal.scss';

export default function CharacterModal({ characters, changeCharacterStatus, changeCharacter }) {
  return (
    <div className="character-modal-mask">
      <div className="character-modal-container">
        <div className="character-modal-header">
          <p>프로필 캐릭터 선택</p>
          <button onClick={changeCharacterStatus} type="submit">
            X
          </button>
        </div>
        <div className="character-modal-body">
          {characters.map((character) => (
            <button
              type="submit"
              onClick={changeCharacter(character.characterPath)}
              key={character.characterTitle}
              className="character-select-zone"
            >
              <img src={character.characterPath} alt={character.characterTitle} />
              <p>{character.characterTitle}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
