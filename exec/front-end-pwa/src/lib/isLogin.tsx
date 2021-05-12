const isLogin = (): boolean => {
  if (localStorage.getItem('userInfo')) {
    console.log('참');
    return true;
  }
  return false;
};

export default isLogin;
