import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './routes/LadingPage';
import MyPage from './routes/MyPage';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={LandingPage} />
      <Route path="/mypage" component={MyPage} />
    </BrowserRouter>
  );
}

export default App;
