// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  //  ssr: false,
  routeRules: {
    "/login/**": { ssr: false },
    "/admin/**": { ssr: false }, // 僅在客戶端渲染
  },
  modules: ["@master/css.nuxt", "nuxt-3-axios"],
  css: ["@/assets/css/main.css", "bootstrap-icons/font/bootstrap-icons.css"],
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
    },
  },
});
