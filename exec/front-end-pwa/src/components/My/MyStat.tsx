import React, { useState, useEffect } from 'react';
import axios from 'axios';
import megaphone from '../../assets/flaticon/megaphone.png';
import angelCnt from '../../assets/flaticon/angel_cnt.png';
import heartCnt from '../../assets/flaticon/heart_cnt.png';
import judgeCnt from '../../assets/flaticon/judge_cnt.png';

const SERVER_URL = process.env.REACT_APP_URL;

export default function MyStat() {
  const initStat: Array<any> = [
    { path: angelCnt, title: '리액션 포인트', cnt: 0 },
    { path: heartCnt, title: '마음 포인트', cnt: 0 },
    { path: judgeCnt, title: '해결 포인트', cnt: 0 },
  ];
  const [stat, setStat]: Array<any> = useState(initStat);
  const [megaphoneCnt, setMegaphoneCnt]: Array<any> = useState(0);

  useEffect(() => {
    // props userId 사용하기
    const uId = 1234567890;
    axios.get(`${SERVER_URL}/mypage`, { params: { id: uId } }).then((res) => {
      const response = res.data.data;
      const tempStat = [...initStat];
      tempStat[0].cnt = response.feedback.angel_count;
      tempStat[1].cnt = response.feedback.heart_count;
      tempStat[2].cnt = response.feedback.judge_count;
      setStat(tempStat);
      setMegaphoneCnt(response.megaphone_count);
    });
  }, []);

  return (
    <div className="my-stat">
      <div className="cnt-zone">
        <img className="icon" src={megaphone} alt="확성기" />
        <p className="cnt">{megaphoneCnt}회</p>
      </div>
      {stat.map((s: any): any => (
        <div key={s.path} className="cnt-zone">
          <img className="icon cnt-icon" src={s.path} alt={s.title} />
          <p className="cnt">{s.cnt}회</p>
        </div>
      ))}
    </div>
  );
}
