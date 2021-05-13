import axios from 'axios';
import { useHistory } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import ModeCheck from '../utils/ModeCheck';

import '../styles/_landing.scss';

import birdBasic from '../assets/characters/bird/bird_basic.gif';
import mouseBasic from '../assets/characters/mouse/mouse_basic.gif';

const SERVER_URL = process.env.REACT_APP_URL;
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export default function LadingPage() {
  let landingBgMode = 'bg landing__dark__bg';
  const MODE = ModeCheck();
  const history = useHistory();

  const responseGoogle = (res: any) => {
    const { accessToken, googleId } = res;
    axios
      .get(`${SERVER_URL}/login/google`, {
        params: { google_id: googleId, mode: MODE, token: accessToken },
      })
      .then((resp) => {
        const userInfo = resp.data.data.user;
        if (userInfo.has_left) {
          alert('3개월 내에 동일한 아이디로 재가입이 불가능합니다.');
        } else {
          login(userInfo);
        }
      });
  };

  const responseFail = (err: any) => {
    alert(err);
  };

  const login = (userInfo: any) => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    history.push('/main');
  };

  if (MODE === 'light') {
    landingBgMode = 'bg landing__light__bg';
  }

  return (
    <div className={landingBgMode}>
      <span className="bg__title">
        낮새
        <br />
        밤쥐
      </span>
      <div className="landing__img__cover">
        <img className="landing__img top__img" src={birdBasic} alt="bird_basic" />
        <img className="landing__img bottom__img" src={mouseBasic} alt="mouse_basic" />
      </div>
      <div className="google__login__btn__cover">
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Sign in with Google"
          onSuccess={responseGoogle}
          onFailure={responseFail}
          className="google__login__btn"
        />
      </div>
    </div>
  );
}
