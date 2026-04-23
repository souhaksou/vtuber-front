export default function () {
  const router = useRouter();

  const getAdminTokenOrRedirect = () => {
    if (!process.client) {
      return null;
    }
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.removeItem('token');
      localStorage.removeItem('expirationDate');
      router.push('/login');
      return null;
    }
    return token;
  };

  return {
    getAdminTokenOrRedirect
  };
}
