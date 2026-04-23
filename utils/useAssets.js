const images = import.meta.glob('~/assets/images/**/*', { eager: true, import: 'default' });

export const getImgUrl = (filename) => {
  const url = `/assets/images/${String(filename).replace(/^(\.\/+|\/+)/, '')}`;
  return images[url];
};

