import { pwa } from './config/pwa'
import { appDescription } from './constants/index'

export default defineNuxtConfig({
  modules: [
    '@anu-vue/nuxt',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
    '@nuxtjs/supabase',
    '@nuxt/devtools',
    '@vue-macros/nuxt',
  ],
  anu: {
    themes: {
      light: {
        colors: {
          primary: '350, 73%, 66.3%',
        },
      },
    },
  },

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    inlineSSRStyles: false,
    renderJsonPayloads: true,
  },

  css: [
    '@unocss/reset/tailwind.css',
  ],

  colorMode: {
    classSuffix: '',
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
      ignore: ['/hi'],
    },
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

})
