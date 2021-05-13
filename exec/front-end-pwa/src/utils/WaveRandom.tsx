import '../styles/_randomWave.scss'



export default function WaveRandom(MODE: string) {
  const { availHeight, availWidth } = window.screen;
  const randomHeight = availHeight * Math.random();
  const randomWidth = availWidth * Math.random();
  const randomNum = Math.random();


  const makeWave = () => {
    const wave = document.createElement('div');
    wave.style.top = `${randomHeight}px`;
    wave.style.left = `${randomWidth}px`;

    wave.classList.add('wave__effect')

    if (randomNum < 0.33) {
      wave.classList.add('wave__small')
    } else if (randomNum < 0.66) {
      wave.classList.add('wave__middle')
    } else {
      wave.classList.add('wave__big')
    }

    if (MODE === 'light') {
      wave.classList.add('light__mode')
    } else {
      wave.classList.add('dark__mode')
    }

    wave.addEventListener('animationend', () => {
      document.body.removeChild(wave)
    })
    document.body.appendChild(wave)
  }


  for (let i = 0; i < 3; i += 1) {
    setTimeout(() => {
      makeWave()
    }, 150 * i);
  }
}
