import React from 'react'

export default function TextToSpeech(message: string): void {
  console.log(message)

  let voices = []

  const setVoiceList = () => {
    voices = window.speechSynthesis.getVoices()
  }


  // if (window.speechSynthesis.onvoiceschanged !== undefined) {
  //   window.speechSynthesis.onvoiceschanged = setVoiceList()
  // }


  if (!window.speechSynthesis) {
    alert('음성 재생을 지원하지 않는 브라우저 임')
  }






}
