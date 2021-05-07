import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../../styles/_modalConfirm.scss';

const SERVER_URL = process.env.REACT_APP_URL;

interface ModalConfirmWithdrawProps {
  MODE: string;
  userId: string | undefined;
  changeWithdrawModalStatus: () => void;
}

export default function ModalConfirmWithdraw({
  MODE,
  userId,
  changeWithdrawModalStatus,
}: ModalConfirmWithdrawProps) {
  // 모드 별 색상 전환
  let modeWithdrawModal = 'dark__bg__purple modal-container';
  if (MODE === 'light') {
    modeWithdrawModal = 'light__bg__blue modal-container';
  }

  const history = useHistory();

  const withdraw = (uId: string | undefined): void => {
    axios.patch(`${SERVER_URL}/mypage/withdraw`, {}, { params: { id: uId } }).then((res) => {
      console.log('탈퇴 성공', uId, res);
      localStorage.removeItem('userInfo');
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
        onClick={() => changeWithdrawModalStatus()}
        className={modeWithdrawModal}
      >
        <div className="modal-header">
          <p>정말 탈퇴하시겠습니까?</p>
        </div>
        <div className="modal-body">
          <button onClick={() => withdraw(userId)} className="confirmBtn btnRed" type="submit">
            YES
          </button>
          <button
            onClick={() => changeWithdrawModalStatus()}
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
