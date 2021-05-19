import React from 'react'

import '../../styles/_megaPhone.scss'

interface ChatInputProps {
  sendMessage(content: string, type: string): any;
  setMegaPhone(): void;
  megaPhoneState: boolean;
  megaPhoneCnt: number;
  mode: string;
}


export default function ChatInput({ sendMessage, setMegaPhone, megaPhoneState, megaPhoneCnt, mode }: ChatInputProps) {
  const inputRef = React.useRef() as React.MutableRefObject<HTMLInputElement>
  const [placeHolderMessage, setPlaceHolderMessage] = React.useState('')
  const [sendType, setSendType] = React.useState('TALK')
  const btnClassName = `mega__phone__btn ${mode}__mega__btn`
  const cntClassName = `mega__phone__cnt ${mode}__mega__cnt`

  React.useEffect(() => {
    if (megaPhoneState) {
      setSendType('ANNOUNCE')
      setPlaceHolderMessage('확성기가 활성화 되었슴둥')
    } else {
      setSendType('TALK')
      setPlaceHolderMessage('')
    }
  }, [megaPhoneState])

  const sendMessageHandler = (event): any => {
    const { type } = event

    if (type === 'click' || event.code === 'Enter') {
      const inputValue = inputRef.current.value
      if (!inputValue) return;
      sendMessage(inputValue, sendType)
      inputRef.current.value = ''
      if (megaPhoneState) {
        setMegaPhone()
      }
    }
  }

  const setMegaPhoneHandler = () => {
    if (megaPhoneCnt === 0) {
      alert('메가폰다씀!')
    } else if (megaPhoneState === true) {
      setMegaPhone()
    } else {
      megaPhoneUseConfirm()
    }
  }

  const megaPhoneUseConfirm = () => {
    const { body } = document
    const confirmModal = document.createElement('div')
    const confirmModalBg = document.createElement('div')
    const btnCover = document.createElement('div')
    const yesBtn = document.createElement('button')
    const noBtn = document.createElement('button')
    const confirmSpan = document.createElement('span')


    confirmSpan.innerText = '확성기 기능을 사용하시겠습니까?\n사용한 후에는 하나 차감됩니다.'
    yesBtn.innerText = 'Yes'
    noBtn.innerText = 'No'

    confirmModal.appendChild(confirmSpan)
    btnCover.appendChild(yesBtn)
    btnCover.appendChild(noBtn)
    confirmModal.appendChild(btnCover)
    confirmModalBg.appendChild(confirmModal)

    confirmModalBg.className = `confirm__modal__bg glassmorphism ${mode}__confirm`
    confirmModal.className = 'confirm__modal'
    btnCover.className = 'confirm__btn__cover'
    yesBtn.className = 'yes__btn confirm__btn'
    noBtn.className = 'no__btn confirm__btn'

    confirmModalBg.addEventListener('click', () => {
      body.removeChild(confirmModalBg)
    })

    yesBtn.addEventListener('click', () => {
      setMegaPhone()
    })

    body.appendChild(confirmModalBg)





    return true
  }



  return (
    <div className='chat__input__cover'>
      <button className={btnClassName} type='button' onClick={setMegaPhoneHandler}>
        <div className={cntClassName}>
          <span>{megaPhoneCnt}</span>
        </div>
      </button>
      <input
        className={megaPhoneState ? 'mega__activate' : 'mega__deactivate'}
        type="text"
        ref={inputRef}
        placeholder={placeHolderMessage}
        onKeyUp={sendMessageHandler}
      />
      <button type='button' onClick={sendMessageHandler} >
        <i className="fas fa-paper-plane">{null}</i>
      </button>
    </div>
  )
}
