import { useRef, MutableRefObject } from 'react';
import { useHistory } from 'react-router-dom';
import '../../styles/_mainBottom.scss';

export default function MainBottom() {
  const modalRef = useRef() as MutableRefObject<HTMLInputElement>;
  const coverRef = useRef() as MutableRefObject<HTMLInputElement>;
  const minMoveLength = window.screen.height * 0.1
  const history = useHistory()

  let mouseOvered = false
  let checkY = 0
  let mouseMovedY = 0


  const arrowHandler = (event: any) => {
    if (event.touches[0].clientY < window.screen.height * 0.85) { return null };

    mouseOvered = true;
    const modal = modalRef.current;
    mouseMovedY = event.touches[0].clientY
    modal.style.bottom = '-77%';
    checkY = event.touches[0].clientY;

    return true;
  }


  const moveArrowHandler = (event: any) => {
    if (!mouseOvered) { return; };

    const modal = modalRef.current;
    const cover = coverRef.current;
    cover.style.zIndex = '3'
    modal.style.transition = '0s';
    mouseMovedY = event.touches[0].clientY
    modal.style.bottom = `calc(-77% - ${event.touches[0].clientY - checkY}px)`
  }


  const arrowLeaveHandler = () => {
    const modal = modalRef.current;
    const cover = coverRef.current;
    if (!modal || !cover) { return; }
    mouseOvered = false;
    modal.style.transition = '0.3s';

    if (checkY - mouseMovedY >= minMoveLength) {
      modal.style.bottom = '0%';
      modal.style.width = '100%';
      modal.style.height = '100%';
      modal.style.backgroundColor = '#FFFFFF';
      setTimeout(() => {
        history.push('/mypage')
      }, 330)
    } else {
      cover.style.zIndex = '1'
      modal.style.width = '80%';
      modal.style.bottom = '-80%';
    }
  }

  return (
    <div className='main__bottom__cover'
      onTouchStart={arrowHandler}
      onTouchMove={moveArrowHandler}
      onTouchEnd={arrowLeaveHandler}
      ref={coverRef}
    >
      <i
        role='button'
        tabIndex={0}
        className="fas fa-chevron-up main__arrow"
      >
        {null}
      </i>
      <div className='main__bottom__modal glassmorphism' ref={modalRef}>
        {null}
      </div>
    </div >
  )
}
