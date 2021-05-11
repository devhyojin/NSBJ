import { Switch } from 'react-router-dom';
import PublicRoute from './lib/PublicRoute';
import PrivateRoute from './lib/PrivateRoute';
import LandingPage from './routes/LandingPage';
import MainPage from './routes/MainPage';
import MyPage from './routes/MyPage';
import Chat from './routes/Chat';
import PageNotFound from './routes/PageNotFound';

function App() {
  return (
    <Switch>
      <PublicRoute exact path="/" restricted component={LandingPage} />
      <PrivateRoute path="/main" component={MainPage} />
      <PrivateRoute path="/mypage" component={MyPage} />
      <PrivateRoute path="/chat" component={Chat} />
      <PublicRoute component={PageNotFound} />
    </Switch>
  );
}

export default App;
