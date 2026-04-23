import { openModal } from 'jenesius-vue-modal';
import errorMsg from '@/components/modal/errorMsg.vue';
import { parseApiError } from '@/utils/parseApiError';

export default function () {
  const router = useRouter();
  const { clearAdminToken } = useAdminToken();

  const handleAdminError = async (error) => {
    console.error(error);
    const parsedError = parseApiError(error);
    if (parsedError.isTokenExpired) {
      clearAdminToken();
      router.push('/login');
    } else {
      await openModal(errorMsg, { msg: parsedError.message });
    }
  };

  return { handleAdminError };
}
