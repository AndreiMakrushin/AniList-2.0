import Aura from "@primevue/themes/aura";
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const currentDir = dirname(fileURLToPath(import.meta.url))

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
  css: [
    'primeicons/primeicons.css'
  ],
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
      SUPABASE_URL: "",
      SUPABASE_KEY: "",
      ANIME_LIST: "",
      ANIME_SINGLE: "",
      ANIME_SEARCH: "",
      ANIME_SIMILAR: "",
      ANIME_POSTER: ""
    }
  },
  plugins: ["~/plugins/supabase.client"],

  imports: {
    dirs: ["shared/types/*"],
  },

  alias: {
    'shared': join(currentDir, './shared'),
    'assets': join(currentDir, './shared/assets'),
    'public': join(currentDir, './shared/public'),
  },
  components: [
    {
      path: './shared/ui',
      pathPrefix: false,
      global: true,
    },
  ],
})