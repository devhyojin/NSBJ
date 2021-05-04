import React, { useMemo, useState } from 'react'
// import { create } from 'node:domain';
// import { createStore } from 'redux';
import '../../styles/_main.scss';

interface MainTopProps {
  mode: string,
  activate: boolean,
  neighborCnt: number,
  region: string
}


export default function MainTop({ mode, activate, neighborCnt, region }: MainTopProps) {

  const name = mode === 'light' ? '짹짹이' : '찍찍이';
  const species = mode === 'light' ? '새' : '쥐';
  const deactivateExplain = `중앙의 ${species}를 눌러,상태를 활성화시켜주세요!`
  const activateExplain = `${region}에 ${neighborCnt}명의 ${name}가 있군요!`
  const [explain, setExplain] = useState(activateExplain)

  const changeActivate = () => {
    console.log(region, 'region')
    if (activate) {
      setExplain(activateExplain)
    } else {
      setExplain(deactivateExplain)
    }
  }

  useMemo(() => {
    return changeActivate()
  }, [activate])

  useMemo(() => {
    console.log(region[Symbol], '바뀀')
  }, [region])


  return (
    <div className='main__top'>
      <h2>내 주변의 {name}들</h2>
      <h5>{explain}</h5>
    </div>
  )
}
