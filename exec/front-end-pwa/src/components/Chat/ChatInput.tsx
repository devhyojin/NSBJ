import React from 'react'

interface ChatInputProps {
  sendMessage(content: string, type: string): any;
  setMegaPhone(): void;
  megaPhoneState: boolean;
}


export default function ChatInput({ sendMessage, setMegaPhone, megaPhoneState }: ChatInputProps) {
  const inputRef = React.useRef() as React.MutableRefObject<HTMLInputElement>
  const [placeHolderMessage, setPlaceHolderMessage] = React.useState('')
  const [sendType, setSendType] = React.useState('TALK')


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
    setMegaPhone()
  }

  return (
    <div className='chat__input__cover'>
      <button type='button' onClick={setMegaPhoneHandler}>확</button>
      <input
        className={megaPhoneState ? 'mega__activate' : 'mega__deactivate'}
        type="text"
        ref={inputRef}
        placeholder={placeHolderMessage}
      />
      {/* <div className={megaPhoneState ? 'mega__activate' : 'mega__deactivate'}>
        <span>{null}</span>
        <span>{null}</span>
        <span>{null}</span>
        <span>{null}</span>
      </div> */}
      <button type='button' onClick={sendMessageHandler} >
        <i className="fas fa-paper-plane">{null}</i>
      </button>
    </div>
  )
}
