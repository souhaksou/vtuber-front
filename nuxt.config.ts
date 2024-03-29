// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  modules: ["@master/css.nuxt"],
  css: ["@/assets/css/main.css", "bootstrap-icons/font/bootstrap-icons.css"],
});
