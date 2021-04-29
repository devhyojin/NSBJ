import { useHistory } from 'react-router-dom'
// import axios from 'axios'
import '../styles/_landing.scss'
import kakaoBtn from '../assets/kakao/kakao_login_medium_narrow.png'

declare global {
  interface Window {
    Kakao: any;
  }
}

interface response {
  accessToken: string,
  expiresIn: number,
  refreshToken: string,
  refreshTokenExpiresIn: number,
  scope: string,
  tokenType: string,
}


const { Kakao } = window;
export default function KakaoLogin() {
  const history = useHistory()

  const kakaoLoginClickHandler = () => {
    Kakao.Auth.login({
      success: (response: response) => {
        console.log(response)
        history.push('/main');
      },
      fail: (err: any) => console.log(err)
    })
  }

  // const logout = () => {
  //   // Kakao.Auth.logout(function () {
  //   //   console.log(Kakao.Auth.getAccessToken())
  //   // })
  //   Kakao.API.request({
  //     url: '/v1/user/unlink',
  //     success: (response: any) => {
  //       console.log(response);
  //     },
  //     fail: (error: any) => {
  //       console.log(error);
  //     },
  //   });
  // }



  return (
    <button onClick={kakaoLoginClickHandler} type="button" className='kakao__login__btn'>
      <img src={kakaoBtn} alt="kakaoBtn" width="100%" />
    </button>
  )
}
