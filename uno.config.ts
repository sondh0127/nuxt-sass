import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetTheme } from './uno/theme.preset.ts'
import { sizeRules } from './uno/size.rule.ts'

// SECTION

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetTheme({
      theme: {

        light: {
          colors: {
            border: 'hsl(214.3,31.8%,91.4%)',
            input: 'hsl(214.3,31.8%,91.4%)',
            ring: 'hsl(221.2,83.2%,53.3%)',
            background: 'hsl(0,0%,100%)',
            foreground: 'hsl(222.2,84%,4.9%)',
            primary: {
              DEFAULT: 'hsl(221.2,83.2%,53.3%)',
              foreground: 'hsl(210,40%,98%)',
            },
            secondary: {
              DEFAULT: 'hsl(210,40%,96.1%)',
              foreground: 'hsl(222.2,47.4%,11.2%)',
            },
            destructive: {
              DEFAULT: 'hsl(0,84.2%,60.2%)',
              foreground: 'hsl(210,40%,98%)',
            },
            muted: {
              DEFAULT: 'hsl(210,40%,96.1%)',
              foreground: 'hsl(215.4,16.3%,46.9%)',
            },
            accent: {
              DEFAULT: 'hsl(210,40%,96.1%)',
              foreground: 'hsl(222.2,47.4%,11.2%)',
            },
            popover: {
              DEFAULT: 'hsl(0,0%,100%)',
              foreground: 'hsl(222.2,84%,4.9%)',
            },
            card: {
              DEFAULT: 'hsl(0,0%,100%)',
              foreground: 'hsl(222.2,84%,4.9%)',
            },
          },
        },
        dark: {
          border: 'hsl(217.2,32.6%,17.5%)',
          input: 'hsl(217.2,32.6%,17.5%)',
          ring: 'hsl(224.3,76.3%,48%)',
          background: 'hsl(222.2,84%,4.9%)',
          foreground: 'hsl(210,40%,98%)',
          popover: {
            DEFAULT: 'hsl(222.2,84%,4.9%)',
            foreground: 'hsl(210,40%,98%)',
          },
          primary: {
            DEFAULT: 'hsl(217.2,91.2%,59.8%)',
            foreground: 'hsl(222.2,47.4%,11.2%)',
          },
          secondary: {
            DEFAULT: 'hsl(217.2,32.6%,17.5%)',
            foreground: 'hsl(210,40%,98%)',
          },
          muted: {
            DEFAULT: 'hsl(217.2,32.6%,17.5%)',
            foreground: 'hsl(215.4,16.3%,46.9%)',
          },
          accent: {
            DEFAULT: 'hsl(217.2,32.6%,17.5%)',
            foreground: 'hsl(222.2,47.4%,11.2%)',
          },
          destructive: {
            DEFAULT: 'hsl(0,62.8%,30.6%)',
            foreground: 'hsl(210,40%,98%)',
          },
          card: {
            DEFAULT: 'hsl(222.2,84%,4.9%)',
            foreground: 'hsl(210,40%,98%)',
          },
        },
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  rules: [
    ...sizeRules,
  ],
  theme: {
    borderRadius: {
      lg: '0.5rem',
      md: 'calc(0.5rem - 2px)',
      sm: 'calc(0.5rem - 4px)',
    },
    boxShadow: {
      switch:
        'rgba(0, 0, 0, 0.3) 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 1px 2px',
    },
    animation: {
      keyframes: {
        slideDown: '{from{ height: 0 }to{ height: var(--radix-accordion-content-height) }}',
        slideUp: '{from{ height: var(--radix-accordion-content-height) }to{ height: 0 }}',
      },
      durations: {
        slideDown: '300ms',
        slideUp: '300ms',
      },
      timingFns: {
        slideDown: 'cubic-bezier(0.87, 0, 0.13, 1)',
        slideUp: 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
  },
})
