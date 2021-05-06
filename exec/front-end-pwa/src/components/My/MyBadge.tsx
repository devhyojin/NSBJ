import React, { useState } from 'react';
import axios from 'axios';
import ModalBadgeInfo from './ModalBadgeInfo';
import angelCnt from '../../assets/flaticon/angel_cnt.png';
import heartCnt from '../../assets/flaticon/heart_cnt.png';
import judgeCnt from '../../assets/flaticon/judge_cnt.png';
import angel1 from '../../assets/flaticon/angel1.png';
import angel2 from '../../assets/flaticon/angel2.png';
import angel3 from '../../assets/flaticon/angel3.png';
import heart1 from '../../assets/flaticon/heart1.png';
import heart2 from '../../assets/flaticon/heart2.png';
import heart3 from '../../assets/flaticon/heart3.png';
import judge1 from '../../assets/flaticon/judge1.png';
import judge2 from '../../assets/flaticon/judge2.png';
import judge3 from '../../assets/flaticon/judge3.png';

const SERVER_URL = process.env.REACT_APP_URL;

export default function MyBadge({ setMyAKA }) {
  const badges: Array<any> = [
    {
      id: 1,
      cntPath: angelCnt,
      cntTitle: '리액션 포인트',
      cntStat: 10,
      badgePath: angel1,
      badgeTitle: '천사 컴퍼니 인턴',
    },
    {
      id: 2,
      cntPath: angelCnt,
      cntTitle: '리액션 포인트',
      cntStat: 25,
      badgePath: angel2,
      badgeTitle: '마상 전용 마데카솔',
    },
    {
      id: 3,
      cntPath: angelCnt,
      cntTitle: '리액션 포인트',
      cntStat: 50,
      badgePath: angel3,
      badgeTitle: '하늘을 울린 마음씨',
    },
    {
      id: 4,
      cntPath: heartCnt,
      cntTitle: '마음 포인트',
      cntStat: 10,
      badgePath: heart1,
      badgeTitle: '마음 온도 100도씨',
    },
    {
      id: 5,
      cntPath: heartCnt,
      cntTitle: '마음 포인트',
      cntStat: 25,
      badgePath: heart2,
      badgeTitle: '심장 마사지 마스터',
    },
    {
      id: 6,
      cntPath: heartCnt,
      cntTitle: '마음 포인트',
      cntStat: 50,
      badgePath: heart3,
      badgeTitle: '마음 절도 전과 9범',
    },
    {
      id: 7,
      cntPath: judgeCnt,
      cntTitle: '해결 포인트',
      cntStat: 10,
      badgePath: judge1,
      badgeTitle: '법 없어도 잘 살아',
    },
    {
      id: 8,
      cntPath: judgeCnt,
      cntTitle: '해결 포인트',
      cntStat: 25,
      badgePath: judge2,
      badgeTitle: '고민 해결 마스터',
    },
    {
      id: 9,
      cntPath: judgeCnt,
      cntTitle: '해결 포인트',
      cntStat: 50,
      badgePath: judge3,
      badgeTitle: '솔로몬 직계 혈통',
    },
  ];
  const [infoStatus, setInfoStatus] = useState<boolean>(false);
  const changeInfoStatus = (): void => {
    setInfoStatus(!infoStatus);
  };
  const changeAKA = (idx: number, title: string): void => {
    const userId = 1234567890;
    axios
      .patch(`${SERVER_URL}/mypage/badge`, {}, { params: { badge: idx, id: userId } })
      .then((res) => {
        console.log('칭호 체인지', res);
      });
    setMyAKA(title);
  };

  return (
    <div className="my-badge">
      <div className="badge-title-zone">
        <p className="badge-title">당신의 칭호를 골라보세요!</p>
        <button onClick={() => changeInfoStatus()} type="submit">
          <span>?</span>
        </button>
        {infoStatus && <ModalBadgeInfo badges={badges} changeInfoStatus={changeInfoStatus} />}
      </div>

      <div className="badge-container">
        {badges.map((badge) => (
          <div
            role="button"
            tabIndex={0}
            onKeyDown={() => null}
            onClick={() => changeAKA(badge.id, badge.badgeTitle)}
            className="badge-item"
            key={badge.badgeTitle}
          >
            <img className="badge-icon" src={badge.badgePath} alt={badge.badgeTitle} />
            <p className="badge-name">{badge.badgeTitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
