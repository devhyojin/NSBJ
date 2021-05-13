/* eslint-disable react/jsx-props-no-spreading */

import { Route, Redirect } from 'react-router-dom';
import isLogin from './isLogin';

export default function PublicRoute({ component: Component, restricted, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() && restricted ? <Redirect to="/main" /> : <Component {...props} />
      }
    />
  );
}
