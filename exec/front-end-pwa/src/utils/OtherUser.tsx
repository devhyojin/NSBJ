export default function OtherUser(X: number, Y: number, count: number, MODE: string) {
  if (document.body.contains(document.querySelector('.other__user'))) { return; }

  const randomArray = [{ radius: 0.19, xy: 0 }]
  for (let i = 1; i < 3; i += 1) {
    for (let j = 0; j < 8; j += 1) {
      randomArray.push({ radius: 0.19 * i, xy: 45 * j })
    }
  }



  const { availWidth } = window.screen
  for (let i = 0; i < (count - 1); i += 1) {
    const otherDiv = document.createElement('div')
    const randomIdx = Math.floor(Math.random() * randomArray.length)
    const randomDict = randomArray[randomIdx]

    randomArray.filter(arr => arr.radius !== randomDict.radius && arr.xy !== randomDict.xy)
    const randomHeight = Y + Math.sin(randomDict.xy) * randomDict.radius * availWidth
    const randomWidth = X + Math.cos(randomDict.xy) * randomDict.radius * availWidth


    console.log(randomHeight, randomWidth)
    const makeOtherUser = () => {
      otherDiv.style.top = `${randomHeight}px`
      otherDiv.style.left = `${randomWidth}px`
      otherDiv.className = `other__user ${MODE}__img__0`
      otherDiv.addEventListener('animationend', () => {
        document.body.removeChild(otherDiv)
      })
      document.body.appendChild(otherDiv)
    }

    makeOtherUser()




  }





}
