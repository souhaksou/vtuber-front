import dayjs from 'dayjs';

export default defineNuxtRouteMiddleware((to, from) => {

  const token = localStorage.getItem('token');
  const expirationDate = localStorage.getItem('expirationDate');

  // 前往登入頁
  if (to.fullPath === '/login') {
    // 如果有token跟到期時間，檢查到期時間
    if (token !== null && expirationDate !== null) {
      const expiration = dayjs(expirationDate);
      const currentTime = dayjs();
      if (expiration.isAfter(currentTime)) {
        return '/admin';
      }
    }
    // 其他放行
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return;
  }
  // 如果前往的是以/admin開頭的頁面
  if (to.fullPath.startsWith('/admin')) {
    // 如果没有token，回去登入頁
    if (token === null || expirationDate === null) {
      localStorage.removeItem('token');
      localStorage.removeItem('expirationDate');
      return '/login';
    }
    // 有token但是到期
    const expiration = dayjs(expirationDate);
    const currentTime = dayjs();
    if (expiration.isBefore(currentTime)) {
      localStorage.removeItem('token');
      localStorage.removeItem('expirationDate');
      return '/login';
    }
    // 其他放行
    return;
  }
  // 其他情况下放行
  return true;
})
