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
console.log(window, Kakao)
export default function KakaoLogin({ login }: any) {
  const kakaoLoginClickHandler = () => {
    Kakao.Auth.login({
      success: (response: response) => {
        login(response)
      },
      fail: (err: any) => alert(err)
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
