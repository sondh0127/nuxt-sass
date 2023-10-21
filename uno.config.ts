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
        dark: {
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
              DEFAULT: 'hsl(var(--muted))',
              foreground: 'hsl(var(--muted-foreground))',
            },
            accent: {
              DEFAULT: 'hsl(var(--accent))',
              foreground: 'hsl(var(--accent-foreground))',
            },
            popover: {
              DEFAULT: 'hsl(var(--popover))',
              foreground: 'hsl(var(--popover-foreground))',
            },
            card: {
              DEFAULT: 'hsl(0,0%,100%)',
              foreground: 'hsl(222.2,84%,4.9%)',
            },
          },
        },
        light: {
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
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)',
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
