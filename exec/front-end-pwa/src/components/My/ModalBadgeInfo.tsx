import React from 'react';
import '../../styles/_modalBadgeInfo.scss';

export default function CharacterModal({ MODE, badges, changeInfoStatus }) {
  let modeInfoModal = 'dark__bg__red info-container';
  if (MODE === 'light') {
    modeInfoModal = 'light__bg__mint info-container';
  }
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => changeInfoStatus()}
      onKeyDown={() => null}
      className={modeInfoModal}
    >
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
