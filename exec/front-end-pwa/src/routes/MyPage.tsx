import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModeCheck from '../ModeCheck';
import ModalConfirmWithdrawl from '../components/My/ModalConfirmWithdrawl';
import MyProfile from '../components/My/MyProfile';
import MyStat from '../components/My/MyStat';
import MyBadge from '../components/My/MyBadge';

import '../styles/_mypage.scss';

const SERVER_URL = process.env.REACT_APP_URL;

export default function MyPage({ history }) {
  const MODE = 'dark';
  let modeBG = 'dark__bg container';
  let modeWithdraw = 'dark__withdrawl withdrawl';
  if (MODE === 'light') {
    modeBG = 'light__bg container';
    modeWithdraw = 'light__withdrawl withdrawl';
  }
  const goBack = () => {
    history.goBack();
  };

  const [myAKA, setMyAKA] = useState<string>();
  const [withdrawlConfirmStatus, setWithdrawlConfirmStatus] = useState<boolean>(false);

  const changeWithdrawlConfirmStatus = (): void => {
    setWithdrawlConfirmStatus(!withdrawlConfirmStatus);
  };

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
        <button onClick={() => changeWithdrawlConfirmStatus()} type="submit">
          <p className={modeWithdraw}>탈퇴하기</p>
        </button>
        {withdrawlConfirmStatus && (
          <ModalConfirmWithdrawl
            MODE={MODE}
            changeWithdrawlConfirmStatus={changeWithdrawlConfirmStatus}
          />
        )}
      </div>
      <div className="body">
        <MyProfile MODE={MODE} myAKA={myAKA} setMyAKA={setMyAKA} />
        <hr />
        <MyStat />
        <hr />
        <MyBadge MODE={MODE} setMyAKA={setMyAKA} />
      </div>
    </div>
  );
}
