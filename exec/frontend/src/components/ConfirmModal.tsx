import React from 'react';
import '../styles/_confirmModal.scss';

export default function CharacterModal({ changeConfirmStatus }) {
  return (
    <div className="modal-mask">
      <div className="modal-container">
        <div className="modal-header">
          <p>
            닉네임은 하루에 <strong>한 번만</strong> 변경 가능합니다.
          </p>
          <p>정말 변경하시겠습니까?</p>
        </div>
        <div className="modal-body">
          <button className="confirmBtn btnRed" type="submit">
            YES
          </button>
          <button onClick={changeConfirmStatus} className="confirmBtn btnBlue" type="submit">
            NO
          </button>
        </div>
      </div>
    </div>
  );
}
