import axios from 'axios'
import { useHistory } from 'react-router-dom'
import '../styles/_landing.scss';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import ModeCheck from '../ModeCheck'
// import KakaoLogin from '../components/KakaoLogin';
import birdBasic from '../assets/characters/bird/bird_basic.gif';
import mouseBasic from '../assets/characters/mouse/mouse_basic.gif';



interface response {
  accessToken: string,
  expiresIn: number,
  refreshToken: string,
  refreshTokenExpiresIn: number,
  scope: string,
  tokenType: string,
}

const SERVER_URL = process.env.REACT_APP_URL
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID

export default function LadingPage() {
  let landingBgMode = 'bg landing__dark__bg';
  const MODE = ModeCheck()
  const history = useHistory();


  const login = async (response: response) => {

    // const parameters = {
    //   'accessToken': response.accessToken
    // }

    // await axios.get(`${SERVER_URL}/login/kako`, parameters)
    //   .then(res => console.log(res))


    history.push('/main');
  }

  const responseGoogle = (res: any) => {
    console.log(res)
    history.push('/main')
  }

  const logoutGoogle = (res: any) => { console.log(res) }

  const responseFail = (err: any) => {
    console.log(err)
  }



  if (MODE === 'light') { landingBgMode = 'bg landing__light__bg'; }

  return (
    <div className={landingBgMode}>
      <span className='bg__title'>
        낮새
        <br />
        밤쥐
      </span>
      <div className="landing__img__cover">
        <img className="landing__img top__img" src={birdBasic} alt="bird_basic" />
        <img className="landing__img bottom__img" src={mouseBasic} alt="mouse_basic" />
      </div>
      {/* <KakaoLogin login={login} /> */}

      <div className='google__login__btn__cover'>
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText='Sign in with Google'
          onSuccess={responseGoogle}
          onFailure={responseFail}
          className='google__login__btn'
        />


      </div>
      {/* 
      <button onClick={logoutGoogle} type='button'>
        logout_test
      </button> */}



    </div >
  );
}
