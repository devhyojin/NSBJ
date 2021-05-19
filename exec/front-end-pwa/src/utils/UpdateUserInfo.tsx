import React from 'react'
import axios from 'axios'

const SERVER_URL = process.env.REACT_APP_URL

export default function UpdateUserInfo(mode: string) {
  const userInfo = localStorage.getItem('userInfo') ? localStorage.getItem('userInfo') : null

  const updateUser = (id: string, token: string) => {
    axios.get(`${SERVER_URL}/login/google`, {
      params: {
        google_id: id,
        mode,
        token
      }
    })
      .then(res => {
        localStorage.setItem('userInfo', JSON.stringify(res.data.data.user))
      })
      .catch(err => console.log(err))

  }


  if (userInfo !== null) {
    const { id, token } = JSON.parse(userInfo)
    updateUser(id, token)
  }


}