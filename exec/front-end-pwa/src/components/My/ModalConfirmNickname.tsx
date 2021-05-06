import React from 'react';
import '../../styles/_modalConfirm.scss';

export default function ModalConfirmNickname({ MODE, changeConfirmStatus, changeNickname }) {
  let modeNicknameModal = 'dark__bg__purple modal-container';
  if (MODE === 'light') {
    modeNicknameModal = 'light__bg__blue modal-container';
  }
  return (
    <div className="modal-mask">
      <div
        role="button"
        tabIndex={0}
        onKeyDown={() => null}
        onClick={() => changeConfirmStatus()}
        className={modeNicknameModal}
      >
        <div className="modal-header">
          <p>
            닉네임은 하루에 <strong>한 번만</strong> 변경 가능합니다.
          </p>
          <p>정말 변경하시겠습니까?</p>
        </div>
        <div className="modal-body">
          <button onClick={() => changeNickname()} className="confirmBtn btnRed" type="submit">
            YES
          </button>
          <button
            onClick={() => changeConfirmStatus()}
            className="confirmBtn btnBlue"
            type="submit"
          >
            NO
          </button>
        </div>
      </div>
    </div>
  );
}
