export function parseApiError(error) {
  const data = error?.response?.data;
  const status = error?.response?.status ?? null;
  const backendMessage = data?.message;
  const fallbackMessage = error?.message || '網路異常，請稍後再試';

  const isNetworkError =
    !error?.response &&
    (error?.code === 'ERR_NETWORK' ||
      error?.code === 'ECONNABORTED' ||
      /network|timeout/i.test(error?.message || ''));

  return {
    success: typeof data?.success === 'boolean' ? data.success : null,
    message: backendMessage || fallbackMessage,
    status,
    isTokenExpired: backendMessage === 'TokenExpiredError',
    isNetworkError,
  };
}
