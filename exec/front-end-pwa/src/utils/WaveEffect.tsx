import '../styles/_main.scss'



export default function WaveEffect(x: number, y: number, mode: string): void {
  const makeWave = () => {
    const wave = document.createElement('div');
    wave.style.top = `${y}px`
    wave.style.left = `${x}px`

    if (mode === 'light') {
      wave.className = 'wave__effect light__effect'
    } else {
      wave.className = 'wave__effect dark__effect'
    }
    wave.addEventListener('animationend', function () {
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


