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
        <p className="guideText">본 서비스는 <span>모바일 환경</span>에 최적화되어있습니다!</p>
        <p className="guideTextDetail">❤ 노트북은 <span>Mobile-M</span>, 데스크탑은 <span>Mobile-L</span> 사이즈로 이용해주세요 ❤</p>
      </div>
      <Switch>
        <PublicRoute exact path="/" restricted component={LandingPage} />
        <PrivateRoute exact path="/main" component={MainPage} />
        <PrivateRoute exact path="/mypage" component={MyPage} />
        <PrivateRoute exact path="/chat/:regionId/:bName" component={Chat} />
        <PublicRoute path="*" component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
