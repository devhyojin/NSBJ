export default function RemoveEffect() {
  const { body } = document
  const targetWave = document.querySelectorAll('.wave__effect')
  const targetOther = document.querySelectorAll('.other__user')

  if (targetOther) {
    targetOther.forEach(other => {
      body.removeChild(other)
    })
  }
  if (targetWave) {
    targetWave.forEach(wave => body.removeChild(wave))
  }


}
