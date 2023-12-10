import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { sizeRules } from './uno/size.rule'
import { presetShadcn } from './uno/preset.shadcn'

// SECTION

export default defineConfig({
  presets: [
    presetUno(),
    presetShadcn(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  rules: [
    ...sizeRules,
  ],
  shortcuts: [
    {
      'animate-accordion-up': 'accordion-up',
      'animate-accordion-down': 'accordion-down',
    },
  ],
  theme: {
    animation: {
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
