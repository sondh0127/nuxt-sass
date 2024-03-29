import { pwa } from './config/pwa'
import { appDescription } from './constants/index'

const sharedPresets = [
  {
    from: 'drizzle-orm',
    imports: [
      'eq',
      'ne',
      'gt',
      'gte',
      'lt',
      'lte',
      'asc',
      'desc',
    ],
  },
  {
    from: 'drizzle-zod',
    imports: [
      'createInsertSchema',
      'createSelectSchema',
    ],
  },
  {
    from: 'zod',
    imports: [
      'z',
    ],
  },
]

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    // '@vite-pwa/nuxt',
    '@vue-macros/nuxt',
    '@nuxt/devtools',
    'radix-vue/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@vee-validate/nuxt',
    'nuxt-module-eslint-config',
    '@hebilicious/vue-query-nuxt',
  ],
  features: {
    // For UnoCSS
    inlineStyles: false,
  },

  eslintConfig: {
    setup: false,
  },
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'SForm',
      Field: 'SFormField',
    },
  },
  macros: {
    betterDefine: false,
  },
  googleFonts: {
    families: {
      Roboto: true,
      Inter: true,
      Montserrat: true,
    },
    download: true,
  },
  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  css: [
    '@unocss/reset/tailwind.css',
    'vue-json-pretty/lib/styles.css',
  ],
  // vueuse
  vueuse: {
    ssrHandlers: true,
  },

  colorMode: {
    classSuffix: '',
  },

  vite: {

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

  // pwa,

  devtools: {
    enabled: true,
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
    imports: {
      dirs: ['./server/db'],
      presets: [
        ...sharedPresets,
      ],
    },
    experimental: {
      asyncContext: true,
    },
  },
  imports: {
    dirs: ['db', 'stores'],
    imports: [
      {
        name: 'klona',
        from: 'klona',
      },
      {
        name: 'destr',
        from: 'destr',
      },
      {
        name: 'cva',
        from: 'class-variance-authority',
      },
      {
        name: 'toTypedSchema',
        from: '@vee-validate/zod',
      },
      {
        name: 'useToast',
        from: '@/components/s/toast/use-toast.ts',
      },
    ],
    presets: [
      ...sharedPresets,
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
