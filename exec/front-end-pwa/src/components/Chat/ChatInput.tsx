import React from 'react'

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

  const sendMessageHandler = (): any => {
    const inputValue = inputRef.current.value
    if (!inputValue) return;
    sendMessage(inputValue, sendType)
    inputRef.current.value = ''
    if (megaPhoneState) {
      setMegaPhone()
    }
  }

  const setMegaPhoneHandler = () => {
    if (megaPhoneCnt === 0) {
      alert('메가폰다씀!')
    } else {
      setMegaPhone()
    }
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
      />
      <button type='button' onClick={sendMessageHandler} >
        <i className="fas fa-paper-plane">{null}</i>
      </button>
    </div>
  )
}
