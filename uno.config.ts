import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { grass, green, mauve } from '@radix-ui/colors'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'Inter',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  theme: {
    colors: {
      ...mauve,
      ...green,
      ...grass,
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
  },
})
