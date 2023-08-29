import { pwa } from './config/pwa'
import { appDescription } from './constants/index'

export default defineNuxtConfig({
  build: {
    transpile: ['trpc-nuxt'],
  },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@element-plus/nuxt',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
    '@nuxtjs/supabase',
    '@vue-macros/nuxt',
    '@nuxt/devtools',
    'radix-vue/nuxt',
  ],
  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    inlineSSRStyles: false,
    renderJsonPayloads: true,
  },

  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/scss/index.scss',
  ],
  // vueuse
  vueuse: {
    ssrHandlers: true,
  },

  colorMode: {
    classSuffix: '',
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    // prerender: {
    //   crawlLinks: false,
    //   routes: ['/'],
    //   ignore: ['/hi'],
    // },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/element/index.scss" as element;',
        },
      },
    },
  },

  elementPlus: {
    icon: 'ElIcon',
    importStyle: 'scss',
    themes: ['dark'],
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },

  pwa,

  devtools: {
    enabled: true,
    componentInspector: {
      toggleComboKey: 'meta-shift-x',
    },
  },
  imports: {
    dirs: ['./stores'],
    imports: [
      {
        name: 'klona',
        from: 'klona',
      },
      {
        name: 'cva',
        from: 'class-variance-authority',
      },
    ],
    presets: [
      {
        from: '@tanstack/vue-query',
        imports: [
          'useQuery',
          'useInfiniteQuery',
          'useMutation',
          'useIsFetching',
          'useIsMutating',
          'useQueryClient',
          'useQueries',
        ],
      },
    ],
  },
  components: [
    { path: '~/components', extensions: ['vue'] },
  ],
  runtimeConfig: {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    stripeEndpointSecret: process.env.STRIPE_ENDPOINT_SECRET,
    subscriptionGraceDays: 3,
    initialPlanName: 'Free Trial',
    initialPlanActiveMonths: 1,
    openAIKey: process.env.OPENAI_API_KEY,
    public: {
      debugMode: true,
      siteRootUrl: process.env.URL || 'http://localhost:3000', // URL env variable is provided by netlify by default
    },
  },
})
