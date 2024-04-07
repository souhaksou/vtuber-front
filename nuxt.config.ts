// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  modules: ["@master/css.nuxt","nuxt-3-axios"],
  css: ["@/assets/css/main.css", "bootstrap-icons/font/bootstrap-icons.css"],
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
    },
  },
});
