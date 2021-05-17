import React from 'react'

export default function OtherUser(X: number, Y: number, count: number, otherShow: boolean, MODE: string) {

  const randomArray = []

  for (let i = 1; i < 3; i += 1) {
    for (let j = 0; j < 8; j += 1)
      randomArray.push({ radius: 0.15 * i, xy: 45 * j })
  }


  if (otherShow) return;
  const { availWidth } = window.screen
  for (let i = 0; i < 5; i += 1) {
    const otherDiv = document.createElement('div')
    const randomIdx = Math.floor(Math.random() * randomArray.length)
    const randomDict = randomArray[randomIdx]

    randomArray.filter(arr => arr.radius !== randomDict.radius && arr.xy !== randomDict.xy)
    console.log(randomDict)
    const randomHeight = Y + Math.sin(randomDict.xy) * randomDict.radius * availWidth
    const randomWidth = X + Math.cos(randomDict.xy) * randomDict.radius * availWidth


    console.log(randomHeight, randomWidth)
    const makeOtherUser = () => {
      otherDiv.style.top = `${randomHeight}px`
      otherDiv.style.left = `${randomWidth}px`
      otherDiv.className = `other__user ${MODE}__basic__img`
      otherDiv.addEventListener('animationend', () => {
        document.body.removeChild(otherDiv)
      })
      document.body.appendChild(otherDiv)
    }

    makeOtherUser()




  }





}
