import React from 'react';
import '../styles/_mypage.scss';
import arrow from '../assets/flaticon/left-arrow.png';
import megaphone from '../assets/flaticon/megaphone.png';
import angelCnt from '../assets/flaticon/angel_cnt.png';
import heartCnt from '../assets/flaticon/heart_cnt.png';
import justiceCnt from '../assets/flaticon/justice_cnt.png';
import angel1 from '../assets/flaticon/angel1.png';
import angel2 from '../assets/flaticon/angel2.png';
import angel3 from '../assets/flaticon/angel3.png';
import heart1 from '../assets/flaticon/heart1.png';
import heart2 from '../assets/flaticon/heart2.png';
import heart3 from '../assets/flaticon/heart3.png';
import justice1 from '../assets/flaticon/justice1.png';
import justice2 from '../assets/flaticon/justice2.png';
import justice3 from '../assets/flaticon/justice3.png';

export default function MyPage() {
  const zones = ['angel', 'heart', 'justice'];
  const cntNames = ['angelCnt', 'heartCnt', 'justiceCnt'];
  const nums = [1, 2, 3];

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
              <img className="icon cnt-icon" src={cntNames} alt={cntName} />
              <p className="cnt cnt_num">1회</p>
            </div>
          ))}
        </div>
        <hr />
        <div className="bottom">
          {/* 업적 존 */}
          {zones.map((zone) => (
            <div key={zone} className="badges-zone">
              {nums.map((num) => (
                <div key={num} className="badge-zone">
                  <div className="badge">⛏</div>
                  <p className="badge-name">
                    {zone}
                    {num}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
    // <div className="badges-zone">
    //   <div className="badge-zone">
    //     <div className="badge">⛏</div>
    //     <p className="badge-name">최고의 사랑꾼</p>
    //   </div>
    // </div>
    // <div className="badges-zone">
    //   <div className="badge-zone">
    //     <div className="badge">⛏</div>
    //     <p className="badge-name">최고의 사랑꾼</p>
    //   </div>
    // </div>
  );
}
