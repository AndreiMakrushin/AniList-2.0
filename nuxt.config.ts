import Aura from "@primevue/themes/aura";
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
ssr: false,

vite: {
  build: {
    rollupOptions: {
      external: ['quill', 'chart.js/auto']
    }
  }
},
build: {
  transpile: ['primevue', 'quill']
},

  modules: [
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@primevue/nuxt-module"
  ],
  css: ["./shared/assets/css/main.css","primeicons/primeicons.css"],
  primevue: {
    autoImport: true,
    options: {
      theme: {
        preset: Aura,
        options: {
          prefix: "p",
          darkModeSelector: ".fake-app-dark",
          cssLayer: {
            name: "primevue",
            order: "tailwind-base, primevue, tailwind-utilities",
          },
        },
      },
    },
    components: {
      exclude: ['Form', 'FormField'],
      include: "*",
      prefix: "Prime"
    },
  },
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
      supabaseKey: process.env.NUXT_PUBLIC_SUPABASE_KEY,
      animeList: process.env.NUXT_PUBLIC_ANIME_LIST,
      animeSingle: process.env.NUXT_PUBLIC_ANIME_SINGLE,
      animeSearch: process.env.NUXT_PUBLIC_ANIME_SEARCH,
      animeSimilar: process.env.NUXT_PUBLIC_ANIME_SIMILAR,
      animePoster: process.env.NUXT_PUBLIC_ANIME_POSTER
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