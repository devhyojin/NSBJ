import React from 'react';
import { Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import LandingPage from './routes/LandingPage';
import MainPage from './routes/MainPage';
import MyPage from './routes/MyPage';

function App() {
  return (
    <div>
      <Route path="/" exact component={LandingPage} />
      <Route path="/main" component={MainPage} />
      <Route path="/mypage" component={MyPage} />
    </div>
  );
}

export default hot(module)(App);
