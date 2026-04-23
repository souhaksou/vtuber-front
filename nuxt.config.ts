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
  hooks: {
    "vite:extendConfig"(config, { isClient }) {
      if (!isClient) return;
      config.build = config.build || {};
      config.build.chunkSizeWarningLimit = 1000;
      config.build.rollupOptions = config.build.rollupOptions || {};
      const output = config.build.rollupOptions.output || {};
      const outputs = Array.isArray(output) ? output : [output];

      for (const item of outputs) {
        item.manualChunks = (id: string) => {
          if (id.includes("@wangeditor/editor") || id.includes("@wangeditor/editor-for-vue")) {
            return "wangeditor";
          }
        };
      }

      config.build.rollupOptions.output = Array.isArray(output) ? outputs : outputs[0];
    },
  },
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
    },
  },
});
