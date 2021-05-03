import React from 'react';
import '../../styles/_infoModal.scss';

export default function CharacterModal({ badges }) {
  return (
    <div className="info-container">
      <div className="info-header">
        <p className="guide-name">뱃지 가이드</p>
      </div>
      <div className="info-body">
        {badges.map((badge) => (
          <div key={badge.badgeTitle} className="info-line">
            <img className="info-icon" src={badge.cntPath} alt={badge.cntTitle} />
            <span>×</span>
            <span>{badge.cntStat}</span>
            <span>=</span>
            <img className="info-icon" src={badge.badgePath} alt={badge.badgeTitle} />
          </div>
        ))}
      </div>
    </div>
  );
}
