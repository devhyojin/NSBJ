import React from 'react';
import '../styles/_infomodal.scss';

export default function CharacterModal({ changeInfoStatus }) {
  const infos: Array<any> = [
    [angel1, '천사 컴퍼니 인턴'],
    [angel2, '마상 전용 마데카솔'],
    [angel3, '하늘을 울린 마음씨'],
    [heart1, '마음 온도 100도씨'],
    [heart2, '심장 마사지 마스터'],
    [heart3, '마음 절도 전과 9범'],
    [judge1, '법 없어도 잘 살아'],
    [judge2, '고민 해결 마스터'],
    [judge3, '솔로몬 직계 혈통'],
  ];

  return (
    <div className="info-container">
      <div className="info-header">
        <p className="guide-name">뱃지 가이드</p>
      </div>
      <div className="info-body">
        {infos.map((info) => (
          <span></span>
        ))}
      </div>
    </div>
  );
}
