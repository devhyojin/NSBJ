import React, { useRef, useEffect } from 'react';
import '../../styles/_main.scss';
import waveEffect from '../../utils/WaveEffect';

interface MainBodyProps {
  btnActivate: any;
  mode: string;
  profile_image: number;
}

export default function MainBody({ btnActivate, mode, profile_image }: MainBodyProps) {

  const baseClassName = 'my__icon absolute__center ';
  const myIcon = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const activateHandler = () => {
    const target = myIcon.current;
    const targetX = target.getBoundingClientRect().x + target.offsetWidth / 2
    const targetY = target.getBoundingClientRect().y + target.offsetHeight / 2

    waveEffect(
      targetX,
      targetY,
      mode,
    );
    btnActivate(targetX, targetY);
  };

  let imgClass = '';
  if (mode === 'light') {
    imgClass = `light__img__${profile_image}`;
  } else {
    imgClass = `dark__img__${profile_image}`;
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
