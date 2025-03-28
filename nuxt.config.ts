
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@pinia/nuxt",
  ],
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }
      ]
    }
  },

  dir: {
    pages: 'app/routes',
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
  runtimeConfig:{
    public:{
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NUXT_PUBLIC_SUPABASE_KEY
    }
  },
  plugins: ["~/plugins/supabase.client"],

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