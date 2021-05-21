const isLogin = (): boolean => {
  if (localStorage.getItem('userInfo')) {
    return true;
  }
  return false;
};

export default isLogin;
