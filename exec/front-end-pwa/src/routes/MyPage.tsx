import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModeCheck from '../ModeCheck';
import ModalConfirmWithdrawl from '../components/My/ModalConfirmWithdrawl';
import MyProfile from '../components/My/MyProfile';
import MyStat from '../components/My/MyStat';
import MyBadge from '../components/My/MyBadge';
import arrow from '../assets/flaticon/left-arrow.png';

import '../styles/_mypage.scss';

const SERVER_URL = process.env.REACT_APP_URL;

export default function MyPage({ history }: any) {
  const MODE = ModeCheck();

  const goBack = () => {
    history.goBack();
  };

  const [myAKA, setMyAKA] = useState<string>();
  const [withdrawlConfirmStatus, setWithdrawlConfirmStatus] = useState<boolean>(false);

  const changeWithdrawlConfirmStatus = (): void => {
    setWithdrawlConfirmStatus(!withdrawlConfirmStatus);
  };

  return (
    <div className="container">
      {/* 뒤로 가기, 탈퇴하기  */}
      <div className="header">
        <button onClick={goBack} type="submit">
          <img src={arrow} alt="arrow" />
        </button>
        <button onClick={() => changeWithdrawlConfirmStatus()} type="submit">
          <p className="withdrawl">탈퇴하기</p>
        </button>
        {withdrawlConfirmStatus && (
          <ModalConfirmWithdrawl changeWithdrawlConfirmStatus={changeWithdrawlConfirmStatus} />
        )}
      </div>
      <div className="body">
        <MyProfile MODE={MODE} myAKA={myAKA} />
        <hr />
        <MyStat />
        <hr />
        <MyBadge setMyAKA={setMyAKA} />
      </div>
    </div>
  );
}
