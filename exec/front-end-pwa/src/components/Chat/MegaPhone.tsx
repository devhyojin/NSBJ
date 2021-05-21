import '../../styles/_megaPhone.scss'

interface megaPhoneProps {
  badge: any;
  bird_name: string;
  message: string;
  mode: string;
  mouse_name: string;
  profile_img: number;
  room_id: number;
  sender_id: string;
  sent_at: string;
  type: string;
}

export default function MegaPhone(chat: megaPhoneProps, mode: string) {

  const showingChat = () => {
    target.appendChild(superChatDiv)
  }

  const nick = mode === 'light' ? chat.bird_name : chat.mouse_name;

  // div 생성
  const target = document.body
  const superChatDiv = document.createElement('div')
  const iconDiv = document.createElement('div')
  const nickDiv = document.createElement('div')
  const messageDiv = document.createElement('div')
  const messageSpan = document.createElement('span')

  messageDiv.appendChild(messageSpan)
  superChatDiv.classList.add(`mega__cover`)
  superChatDiv.classList.add(`cover__${mode}`)

  iconDiv.className = 'mega__icon'
  messageDiv.className = 'mega__message'
  nickDiv.innerText = nick
  messageSpan.innerText = chat.message

  superChatDiv.addEventListener('animationend', () => {
    target.removeChild(superChatDiv)
  })

  superChatDiv.append(iconDiv, nickDiv, messageDiv)

  target.appendChild(superChatDiv)
  showingChat()
}