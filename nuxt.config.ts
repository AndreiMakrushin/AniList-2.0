
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@pinia/nuxt",
  ],

  dir: {
    pages: 'app/routes',
    plugins: 'app/plugins',
    layouts: 'app/layouts',
    middleware: 'app/middleware',
    modules: 'app/modules',
    assets: 'shared/assets',
    public: 'shared/public',
    static: 'shared/static',
  },
  tailwindcss: {
    viewer: false,
    configPath: "nuxt-tailwind.config",
  },

  imports: {
    dirs: ["shared/types/*"],
  },

  alias: {
    assets: './shared/assets',
    public: './shared/public',
  },
  components: [
    {
      path: './shared/ui',
      pathPrefix: false,
      global: true,
    },
  ],
})