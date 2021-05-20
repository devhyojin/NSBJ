import '../../styles/_chat.scss'

interface enterChatProps {
  enterMessage: string;
}



export default function EnterChat({ enterMessage }: enterChatProps) {
  return (
    <div className='welcome__text'>
      {enterMessage}
    </div>
  )
}
