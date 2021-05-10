import React from 'react';
import { Route } from 'react-router-dom';
import LandingPage from './routes/LandingPage';
import MainPage from './routes/MainPage';
import MyPage from './routes/MyPage';
import Chat from './routes/Chat';

function App() {
  return (
    <div>
      <Route path="/" exact component={LandingPage} />
      <Route path="/main" component={MainPage} />
      <Route path="/mypage" component={MyPage} />
      <Route path="/chat/:regionId" component={Chat} />
    </div>
  );
}

export default App;
