import './styles/_main.scss'



export default function WaveEffect(x: number, y: number): void {

  const makeWave = () => {
    const wave = document.createElement('div');
    wave.style.top = `${y}px`
    wave.style.left = `${x}px`
    wave.className = 'waveEffect'
    wave.addEventListener('animationend', function () {
      document.body.removeChild(wave)
    })
    document.body.appendChild(wave)
  }

  for (let i = 0; i < 3; i += 1) {
    setTimeout(() => {
      makeWave()
      console.log('ddddd')
    }, 150 * i);
  }





}


