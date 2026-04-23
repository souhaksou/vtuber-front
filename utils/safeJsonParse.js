export const safeJsonParse = (raw, fallback = null) => {
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error(error);
    return fallback;
  }
};
