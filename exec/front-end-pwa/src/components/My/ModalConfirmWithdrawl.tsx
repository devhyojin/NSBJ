import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../../styles/_modalConfirm.scss';

const SERVER_URL = process.env.REACT_APP_URL;

interface ModalConfirmWithdrawlProps {
  MODE: string;
  changeWithdrawlModalStatus: () => void;
}

export default function ModalConfirmWithdrawl({
  MODE,
  changeWithdrawlModalStatus,
}: ModalConfirmWithdrawlProps) {
  // 모드 별 색상 전환
  let modeWithdrawlModal = 'dark__bg__purple modal-container';
  if (MODE === 'light') {
    modeWithdrawlModal = 'light__bg__blue modal-container';
  }

  const history = useHistory();

  const withdrawl = (uId: number): void => {
    axios.patch(`${SERVER_URL}/mypage/withdraw`, {}, { params: { id: uId } }).then((res) => {
      console.log('탈퇴 성공', uId, res);
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
        onClick={() => changeWithdrawlModalStatus()}
        className={modeWithdrawlModal}
      >
        <div className="modal-header">
          <p>정말 탈퇴하시겠습니까?</p>
        </div>
        <div className="modal-body">
          {/* withdrawl(userId)로 바꿔주기 */}
          <button onClick={() => withdrawl(1234567890)} className="confirmBtn btnRed" type="submit">
            YES
          </button>
          <button
            onClick={() => changeWithdrawlModalStatus()}
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
