import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../../styles/_modalConfirm.scss';

const SERVER_URL = process.env.REACT_APP_URL;

export default function ModalConfirmWithdrawl({ MODE, changeWithdrawlConfirmStatus }) {
  let modeWithdrawlModal = 'dark__bg__purple modal-container';
  if (MODE === 'light') {
    modeWithdrawlModal = 'light__bg__blue modal-container';
  }

  const history = useHistory();

  const withdrawl = (userId: number): void => {
    console.log('유우저', userId);
    axios.patch(`${SERVER_URL}/mypage/withdraw`, {}, { params: { id: userId } }).then((res) => {
      console.log('탈퇴 성공', res);
      setTimeout(() => {
        history.push('/mypage');
      }, 330);
    });
  };
  return (
    <div className="modal-mask">
      <div
        role="button"
        tabIndex={0}
        onKeyDown={() => null}
        onClick={() => changeWithdrawlConfirmStatus()}
        className={modeWithdrawlModal}
      >
        <div className="modal-header">
          <p>정말 탈퇴하시겠습니까?</p>
        </div>
        <div className="modal-body">
          <button onClick={() => withdrawl(1234567890)} className="confirmBtn btnRed" type="submit">
            YES
          </button>
          <button
            onClick={() => changeWithdrawlConfirmStatus()}
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
