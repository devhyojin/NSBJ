import '../styles/_landing.scss';
import KakaoLogin from '../components/KakaoLogin';
import birdBasic from '../assets/characters/bird/bird_basic.gif';
import mouseBasic from '../assets/characters/mouse/mouse_basic.gif';

export default function LadingPage() {
  // const KAKAO_KEY = "4303e556b89ee7eae81662e8b9e1ffcd"
  let landingBgMode = 'bg';
  const now = new Date().getHours();

  if (now <= 10) {
    landingBgMode = 'bg landing__light__bg';
  } else {
    landingBgMode = 'bg landing__dark__bg';
  }

  return (
    <div className={landingBgMode}>
      <span>
        낮새
        <br />
        밤쥐
      </span>
      <div className="landing__img__cover">
        <img className="landing__img top__img" src={birdBasic} alt="bird_basic" />
        <img className="landing__img bottom__img" src={mouseBasic} alt="mouse_basic" />
      </div>
      <KakaoLogin />
    </div>
  );
}
