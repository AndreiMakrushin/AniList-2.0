// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  dir: {
    pages: "app/routes",
    plugins: "app/plugins",
    layouts: "app/layouts",
    middleware: "app/middleware",
    modules: "app/modules",
    assets: "shared/assets",
    public: "shared/public",
    static: "shared/static",
  },

  alias: {
    assets: "./shared/assets",
    public: "./shared/public",
  },
  components: [
    {
      path: "./shared/ui",
      pathPrefix: false,
      global: true,
    },
  ],
});
