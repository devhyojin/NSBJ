import { Switch } from 'react-router-dom';
import PublicRoute from './lib/PublicRoute';
import PrivateRoute from './lib/PrivateRoute';
import LandingPage from './routes/LandingPage';
import MainPage from './routes/MainPage';
import MyPage from './routes/MyPage';
import Chat from './routes/Chat';
import PageNotFound from './routes/PageNotFound';
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
        <p>본 서비스는 모바일 환경에 최적화되어있습니다!</p>
      </div>
      <Switch>
        <PublicRoute exact path="/" restricted component={LandingPage} />
        <PrivateRoute path="/main" component={MainPage} />
        <PrivateRoute path="/mypage" component={MyPage} />
        <PrivateRoute path="/chat/:regionId/:bName/:neighborCnt" component={Chat} />
      </Switch>
    </div>
  );
}

export default App;
