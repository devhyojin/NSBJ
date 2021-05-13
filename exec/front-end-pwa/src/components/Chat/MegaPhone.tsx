import React from 'react'

import '../../styles/_megaPhone.scss'

interface megaPhoneProps {
  msg: {
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
  };
  userId: number;
}


export default function MegaPhone({ msg, userId }: megaPhoneProps) {

  const { message, mode, bird_name, mouse_name } = msg
  const coverClass = `mega__cover cover__${mode}`

  return (
    <div className={coverClass}>

      <div>확성기이미지</div>
      <div>{mode === 'light' ? bird_name : mouse_name}</div>
      <div>{message}</div>
    </div>
  )
}