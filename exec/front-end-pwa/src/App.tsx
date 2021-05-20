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
        <p>본 서비스는 모바일 환경에 최적화되어있습니다! <br /> 노트북 또는 데스크탑을 사용할경우 Mobile-Large Size로 이용해주세요! </p>
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
