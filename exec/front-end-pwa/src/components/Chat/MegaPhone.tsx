import React from 'react'

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


export default function MegaPhone(msg: megaPhoneProps, user_id: number) {
  const [cnt, setCnt] = React.useState(0)
  const [check, setCheck] = React.useState(false)

  React.useEffect(() => {
    const target = document.body
    const checkDiv = document.querySelector('.mega__cover')
    const checking = setTimeout(() => {
      // if (target.contains(checkDiv) && !check) {
      //   setCnt(cnt + 1)
      //   // console.log(cnt)
      // } else {
      //   setCheck(true)
      //   target.appendChild(divDom)
      // }
      setCnt(cnt + 1)
      console.log(cnt)
    }, 3000 * cnt);
    return () => clearTimeout(checking)
  }, [cnt])

  const { message, mode, bird_name, mouse_name } = msg
  const coverClass = `mega__cover cover__${mode}`

  const divDom = document.createElement('div')
  const divDom1 = document.createElement('div')
  const divDom2 = document.createElement('div')
  const divDom3 = document.createElement('div')

  divDom.className = coverClass
  divDom1.innerText = '확성기 이미지'
  divDom2.innerText = mode === 'light' ? bird_name : mouse_name
  divDom3.innerText = message

  divDom.appendChild(divDom1)
  divDom.appendChild(divDom2)
  divDom.appendChild(divDom3)

  divDom.addEventListener('animationend', () => {
    document.body.removeChild(divDom)
  })

  document.body.appendChild(divDom)
  // if (document.body)




}