import React from 'react';
import { Route } from 'react-router-dom';
import LandingPage from './routes/LandingPage';
import MainPage from './routes/MainPage';
import MyPage from './routes/MyPage';
import Chat from './routes/Chat';
import birdBasic from './assets/characters/bird/bird_basic.gif';
import mouseBasic from './assets/characters/mouse/mouse_basic.gif';
import './styles/_screenGuide.scss';

function App() {
  return (
    <div className="app">
      <div className="screenGuide">
        <div className="characters">
          <img src={birdBasic} alt="노말짹" />
          <img src={mouseBasic} alt="노말찍" />
        </div>
        {/* <span role="img" aria-label="wink">
          😉
        </span> */}
        <p>본 서비스는 모바일 환경에 최적화되어있습니다!</p>
      </div>
      <Route path="/" exact component={LandingPage} />
      <Route path="/main" component={MainPage} />
      <Route path="/mypage" component={MyPage} />
      <Route path="/chat/:regionId" component={Chat} />
    </div>
  );
}

export default App;
