/* eslint-disable react/jsx-props-no-spreading */

import { Route, Redirect } from 'react-router-dom';
import isLogin from './isLogin';

export default function PrivateRoute({ component: Component, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={(props) => (isLogin() ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );
}
