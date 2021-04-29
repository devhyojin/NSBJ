import React from 'react';

import arrow from '../assets/flaticon/left-arrow.png';
import megaphone from '../assets/flaticon/megaphone.png';
import angelCnt from '../assets/flaticon/angel_cnt.png';
import heartCnt from '../assets/flaticon/heart_cnt.png';
import judgeCnt from '../assets/flaticon/judge_cnt.png';
import angel1 from '../assets/flaticon/angel1.png';
import angel2 from '../assets/flaticon/angel2.png';
import angel3 from '../assets/flaticon/angel3.png';
import heart1 from '../assets/flaticon/heart1.png';
import heart2 from '../assets/flaticon/heart2.png';
import heart3 from '../assets/flaticon/heart3.png';
import judge1 from '../assets/flaticon/judge1.png';
import judge2 from '../assets/flaticon/judge2.png';
import judge3 from '../assets/flaticon/judge3.png';
import '../styles/_mypage.scss';

export default function MyPage() {
  const cntNames: Array<any> = [angelCnt, heartCnt, judgeCnt];
  const badges: Array<any> = [
    [angel1, '천사 컴퍼니 인턴'],
    [angel2, '마상 전용 마데카솔'],
    [angel3, '하늘을 울린 마음씨'],
    [heart1, '마음 온도 100도씨'],
    [heart2, '당신의 마음 10초 컷'],
    [heart3, '마음 절도 전과 9범'],
    [judge1, '법 없어도 잘 살아요'],
    [judge2, '고민 해결 마하의 속도'],
    [judge3, '솔로몬 직계 혈통'],
  ];
  return (
    <div className="container">
      {/* 뒤로 가기, 탈퇴하기  */}
      <div className="header">
        <img src={arrow} alt="arrow" />
        <p className="withdrawl">탈퇴하기</p>
      </div>
      <div className="body">
        <div className="top">
          {/* 캐릭터 변경 존 */}
          <div className="character-zone">
            <div className="circle">d</div>
          </div>
          {/* 닉네임 존 */}
          <div className="nickname-zone">
            <p className="location">안암동</p>
            <p className="aka">하늘을 울린 마음씨</p>
            <p className="nickname">새인 척하는 토끼</p>
            <div>
              <button type="submit" className="btn">
                닉네임 변경
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div className="middle">
          {/* 스토리지 */}
          <div className="cnt-zone">
            <img className="icon" src={megaphone} alt="확성기" />
            <p className="cnt">1회</p>
          </div>
          {cntNames.map((cntName) => (
            <div key={cntName} className="cnt-zone">
              <img className="icon cnt-icon" src={cntName} alt={cntName} />
              <p className="cnt">1회</p>
            </div>
          ))}
        </div>
        <hr />
        <div className="bottom">
          <div className="badge-container">
            {badges.map((badge) => (
              <div className="badge-item" key={badge}>
                <img className="badge-icon" src={badge[0]} alt={badge[1]} />
                <p className="badge-name">{badge[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
