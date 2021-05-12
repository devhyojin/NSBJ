import { useState, useEffect } from 'react';
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

interface ModalConfirmWithdrawlProps {
  MODE: string;
  userId: string | undefined;
  setMyAKA: any;
}

export default function MyBadge({ MODE, userId, setMyAKA }: ModalConfirmWithdrawlProps) {
  useEffect(() => {
    axios.get(`${SERVER_URL}/mypage`, { params: { id: userId } }).then((res) => {
      // 1.버튼 활성화 여부 status에 체크하기 위해 badgeCalculator에 값 넘겨줌.
      const response = res.data.data;
      badgeCalculator('리액션 포인트', response.feedback.angel_count);
      badgeCalculator('마음 포인트', response.feedback.heart_count);
      badgeCalculator('해결 포인트', response.feedback.judge_count);
      // 2. 저장된 나의 칭호에 border 생기도록 picked값을 true로 바꿔줌
      const tempBadges = [...badges];
      if (response.badge.id) {
        tempBadges[response.badge.id - 1].picked = true;
      }
      setBadges(tempBadges);
    });
  }, []);

  // 모드 별 색상 전환
  let modeInfoBtn = 'dark__i__btn circle';
  let modeCheckedBorder = 'dark__ch__border';
  let modeBasicBorder = 'dark__bs__border';
  if (MODE === 'light') {
    modeInfoBtn = 'light__i__btn circle';
    modeCheckedBorder = 'light__ch__border';
    modeBasicBorder = 'light__bs__border';
  }

  const initBadges: Array<any> = [
    {
      id: 1,
      cntPath: angelCnt,
      cntTitle: '리액션 포인트',
      condition: 10,
      badgePath: angel1,
      badgeTitle: '천사 컴퍼니 인턴',
      status: false,
      picked: false,
    },
    {
      id: 2,
      cntPath: angelCnt,
      cntTitle: '리액션 포인트',
      condition: 25,
      badgePath: angel2,
      badgeTitle: '마상 전용 마데카솔',
      status: false,
      picked: false,
    },
    {
      id: 3,
      cntPath: angelCnt,
      cntTitle: '리액션 포인트',
      condition: 50,
      badgePath: angel3,
      badgeTitle: '하늘을 울린 마음씨',
      status: false,
      picked: false,
    },
    {
      id: 4,
      cntPath: heartCnt,
      cntTitle: '마음 포인트',
      condition: 10,
      badgePath: heart1,
      badgeTitle: '마음 온도 100도씨',
      status: false,
      picked: false,
    },
    {
      id: 5,
      cntPath: heartCnt,
      cntTitle: '마음 포인트',
      condition: 25,
      badgePath: heart2,
      badgeTitle: '심장 마사지 마스터',
      status: false,
      picked: false,
    },
    {
      id: 6,
      cntPath: heartCnt,
      cntTitle: '마음 포인트',
      condition: 50,
      badgePath: heart3,
      badgeTitle: '마음 절도 전과 9범',
      status: false,
      picked: false,
    },
    {
      id: 7,
      cntPath: judgeCnt,
      cntTitle: '해결 포인트',
      condition: 10,
      badgePath: judge1,
      badgeTitle: '법 없어도 잘 살아',
      status: false,
      picked: false,
    },
    {
      id: 8,
      cntPath: judgeCnt,
      cntTitle: '해결 포인트',
      condition: 25,
      badgePath: judge2,
      badgeTitle: '고민 해결 마스터',
      status: false,
      picked: false,
    },
    {
      id: 9,
      cntPath: judgeCnt,
      cntTitle: '해결 포인트',
      condition: 50,
      badgePath: judge3,
      badgeTitle: '솔로몬 직계 혈통',
      status: false,
      picked: false,
    },
  ];
  const [infoModalStatus, setInfoModalStatus] = useState<boolean>(false);
  const [badges, setBadges] = useState(initBadges);
  const changeInfoModalStatus = (): void => {
    setInfoModalStatus(!infoModalStatus);
  };
  const changeAKA = (idx: number, title: string): void => {
    axios.patch(`${SERVER_URL}/mypage/badge`, {}, { params: { user_id: userId, badge: idx } });
    const tempBadges = [...badges];
    for (let i = 0; i < 9; i += 1) {
      if (i === idx - 1) {
        tempBadges[i].picked = !tempBadges[i].picked;
      } else {
        tempBadges[i].picked = false;
      }
    }
    setBadges(tempBadges);
    setMyAKA(title);
  };
  const baseClassName = 'badge-item ';
  const inactive = 'inactive';
  const active = 'active ';
  const checkBorder = (p: boolean): string => {
    let classValue = '';
    if (p) {
      classValue = 'border ';
      classValue += modeCheckedBorder;
    } else {
      classValue += modeBasicBorder;
    }
    return classValue;
  };

  // 활성화, 비활성화된 뱃지

  const ActiveBadge = ({ b }: any, key: number) => {
    return (
      <div
        key={key}
        role="button"
        tabIndex={0}
        onKeyDown={() => null}
        onClick={() => changeAKA(b.id, b.badgeTitle)}
        className={baseClassName + active + checkBorder(b.picked)}
      >
        <img className="badge-icon" src={b.badgePath} alt={b.badgeTitle} />
        <p className="badge-name">{b.badgeTitle}</p>
      </div>
    );
  };
  const InactiveBadge = ({ b }: any, key: number) => {
    return (
      <div key={key} className={baseClassName + inactive}>
        <img className="badge-icon" src={b.badgePath} alt={b.badgeTitle} />
        <p className="badge-name">{b.badgeTitle}</p>
      </div>
    );
  };

  // 뱃지 활성화 여부 판독기
  const badgeCalculator = (feedback: string, feedbackCnt: number): void => {
    const tempBadges = [...badges];
    let idx = 0;
    if (feedback === '마음 포인트') {
      idx += 3;
    } else if (feedback === '해결 포인트') {
      idx += 6;
    }

    if (feedbackCnt >= 50) {
      for (let i = idx; i < idx + 3; i += 1) {
        tempBadges[i].status = true;
      }
    } else if (feedbackCnt >= 25) {
      for (let i = idx; i < idx + 2; i += 1) {
        tempBadges[i].status = true;
      }
    } else {
      tempBadges[idx].status = true;
    }
    setBadges(tempBadges);
  };

  return (
    <div className="my-badge">
      <div className="badge-title-zone">
        <p className="badge-title">당신의 칭호를 골라보세요!</p>
        <button onClick={() => changeInfoModalStatus()} className={modeInfoBtn} type="submit">
          <span>?</span>
        </button>
        {infoModalStatus && (
          <ModalBadgeInfo
            MODE={MODE}
            badges={badges}
            changeInfoModalStatus={changeInfoModalStatus}
          />
        )}
      </div>

      <div className="badge-container">
        {badges.map((badge) => {
          console.log('화아악인', badge);
          return badge.status ? (
            <ActiveBadge key={badge.id} b={badge} />
          ) : (
            <InactiveBadge key={badge.id} b={badge} />
          );
        })}
      </div>
    </div>
  );
}
