import React, { useState, useEffect } from 'react';
import ModeCheck from '../utils/ModeCheck';
import ModalConfirmWithdrawl from '../components/My/ModalConfirmWithdrawl';
import MyProfile from '../components/My/MyProfile';
import MyStat from '../components/My/MyStat';
import MyBadge from '../components/My/MyBadge';

import '../styles/_mypage.scss';

export default function MyPage({ history }: any) {
  // 모드 별 색상 전환
  const MODE = ModeCheck();
  let modeBG = 'dark__bg container';
  let modeWithdraw = 'dark__withdrawl withdrawl';
  if (MODE === 'light') {
    modeBG = 'light__bg container';
    modeWithdraw = 'light__withdrawl withdrawl';
  }

  const [myAKA, setMyAKA] = useState<string>();
  const [withdrawlModalStatus, setWithdrawlModalStatus] = useState<boolean>(false);

  const changeWithdrawlModalStatus = (): void => {
    setWithdrawlModalStatus(!withdrawlModalStatus);
  };

  const goBack = () => {
    history.goBack();
  };

  let userId = '';
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    userId = JSON.parse(userInfo).id;
  });

  return (
    <div className={modeBG}>
      <div className="header">
        <i
          role="button"
          tabIndex={0}
          onKeyDown={() => null}
          onClick={goBack}
          className="fas fa-chevron-left"
        >
          {null}
        </i>
        <button onClick={() => changeWithdrawlModalStatus()} type="submit">
          <p className={modeWithdraw}>탈퇴하기</p>
        </button>
        {withdrawlModalStatus && (
          <ModalConfirmWithdrawl
            MODE={MODE}
            userId={userId}
            changeWithdrawlModalStatus={changeWithdrawlModalStatus}
          />
        )}
      </div>
      <div className="body">
        <MyProfile MODE={MODE} userId={userId} myAKA={myAKA} setMyAKA={setMyAKA} />
        <hr />
        <MyStat userId={userId} />
        <hr />
        <MyBadge MODE={MODE} userId={userId} setMyAKA={setMyAKA} />
      </div>
    </div>
  );
}
