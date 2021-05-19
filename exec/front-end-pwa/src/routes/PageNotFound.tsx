import ModeCheck from '../utils/ModeCheck';
import birdBasic from '../assets/characters/bird/bird_basic.gif';
import mouseBasic from '../assets/characters/mouse/mouse_basic.gif';

import '../styles/_pageNotFound.scss';

export default function PageNotFound() {
  const MODE = ModeCheck();
  let character = mouseBasic;
  let characterName = '노말찍';
  let bgColor = 'dark__bg__404 container__404';
  let textColor = 'black';
  if (MODE === 'light') {
    character = birdBasic;
    characterName = '노말짹';
    bgColor = 'light__bg__404 container__404';
    textColor = 'white';
  }
  return (
    <div className={bgColor}>
      <img src={character} alt={characterName} />
      <p className={textColor}>앗! 페이지를 찾을 수 없어요!</p>
    </div>
  );
}
