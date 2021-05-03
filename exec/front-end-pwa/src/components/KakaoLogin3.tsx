

// const JAVASCRIPT_KEY = process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY
export default function KakaoLogin() {

  const { Kakao } = window

  const loginWithKakao = (): any => {
    Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3000'
    })
  }



  return (
    <>
      <div id='custom-login-btn' onClick={loginWithKakao} role='button' tabIndex={0} onKeyDown={() => null}>
        <img
          src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
          width="152"
          alt='test'
        />
      </div>
    </>
  )
}
