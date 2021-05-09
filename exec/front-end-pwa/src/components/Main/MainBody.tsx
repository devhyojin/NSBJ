import React, { useRef, useEffect } from 'react';
import '../../styles/_main.scss';
import waveEffect from '../../utils/WaveEffect';

interface MainBodyProps {
  btnActivate: any;
  mode: string;
}

export default function MainBody({ btnActivate, mode }: MainBodyProps) {

  const baseClassName = 'my__icon absolute__center ';
  const myIcon = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  const activateHandler = () => {
    const target = myIcon.current;
    waveEffect(
      target.getBoundingClientRect().x + target.offsetWidth / 2,
      target.getBoundingClientRect().y + target.offsetHeight / 2,
      mode,
    );
    btnActivate();
  };

  let imgClass = '';
  if (mode === 'light') {
    imgClass = 'light__basic__img';
  } else {
    imgClass = 'dark__basic__img';
  }

  return (
    <div className="main__body">
      <div
        role="button"
        tabIndex={0}
        className={baseClassName + imgClass}
        onClick={activateHandler}
        onKeyDown={undefined}
        ref={myIcon}
      >
        {null}
      </div>
    </div>
  );
}
