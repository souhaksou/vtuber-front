export default function () {
  const router = useRouter();

  const clearAdminToken = () => {
    if (!process.client) return;
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
  };

  const setAdminToken = (token, expirationDate) => {
    if (!process.client) return;
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate);
  };

  const getAdminTokenOrRedirect = () => {
    if (!process.client) return null;
    const token = localStorage.getItem('token');
    if (!token) {
      clearAdminToken();
      router.push('/login');
      return null;
    }
    return token;
  };

  return { getAdminTokenOrRedirect, clearAdminToken, setAdminToken };
}
