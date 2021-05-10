import React, { useState } from 'react';
import ModeCheck from '../utils/ModeCheck';
import ModalConfirmWithdraw from '../components/My/ModalConfirmWithdraw';
import MyProfile from '../components/My/MyProfile';
import MyStat from '../components/My/MyStat';
import MyBadge from '../components/My/MyBadge';

import '../styles/_mypage.scss';

export default function MyPage({ history }: any) {
  // 로그인한 유저 아이디 가져오기
  const fetchUserId = () => {
    const uId = JSON.parse(localStorage.getItem('userInfo') || '{}').id;
    return uId;
  };
  const userId = fetchUserId();

  // 모드 별 색상 전환
  const MODE = ModeCheck();
  let modeBG = 'dark__bg container';
  let modeWithdraw = 'dark__withdraw withdraw';
  if (MODE === 'light') {
    modeBG = 'light__bg container';
    modeWithdraw = 'light__withdraw withdraw';
  }

  const [myAKA, setMyAKA] = useState<string>();
  const [withdrawModalStatus, setWithdrawModalStatus] = useState<boolean>(false);

  const changeWithdrawModalStatus = (): void => {
    setWithdrawModalStatus(!withdrawModalStatus);
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className={modeBG}>
      <div className="header">
        <i
          role="button"
          tabIndex={0}
          onKeyDown={() => null}
          onClick={() => goBack()}
          className="fas fa-chevron-left"
        >
          {null}
        </i>
        <button onClick={() => changeWithdrawModalStatus()} type="submit">
          <p className={modeWithdraw}>탈퇴하기</p>
        </button>
        {withdrawModalStatus && (
          <ModalConfirmWithdraw
            MODE={MODE}
            userId={userId}
            changeWithdrawModalStatus={changeWithdrawModalStatus}
          />
        )}
      </div>
      <div className="body">
        <MyProfile MODE={MODE} userId={userId} myAKA={myAKA} setMyAKA={setMyAKA} />
        <hr />
        <MyStat userId={userId} />
        <hr />
        <MyBadge userId={userId} MODE={MODE} setMyAKA={setMyAKA} />
      </div>
    </div>
  );
}
