import { Switch } from 'react-router-dom';
import PublicRoute from './lib/PublicRoute';
import PrivateRoute from './lib/PrivateRoute';
import LandingPage from './routes/LandingPage';
import MainPage from './routes/MainPage';
import MyPage from './routes/MyPage';
import Chat from './routes/Chat';

function App() {
  return (
    <Switch>
      <PublicRoute exact path="/" restricted component={LandingPage} />
      <PrivateRoute path="/main" component={MainPage} />
      <PrivateRoute path="/mypage" component={MyPage} />
      <PrivateRoute path="/chat" component={Chat} />
    </Switch>
  );
}

export default App;
