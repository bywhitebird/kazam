import { definePreset } from '@pandacss/dev'

export const whitebirdPreset = definePreset({
  theme: {
    tokens: {
      colors: {
        black: {
          0: { value: '#000000' },
          100: { value: '#1a1a1a' },
          200: { value: '#333333' },
          300: { value: '#4d4d4d' },
          400: { value: '#666666' },
          500: { value: '#808080' },
          600: { value: '#999999' },
          700: { value: '#b3b3b3' },
          800: { value: '#cccccc' },
          900: { value: '#e5e5e5' },
          950: { value: '#f2f2f2' },
          1000: { value: '#ffffff' },
        },
        white: {
          0: { value: '#ffffff' },
          100: { value: '#f2f2f2' },
          200: { value: '#e5e5e5' },
          300: { value: '#cccccc' },
          400: { value: '#b3b3b3' },
          500: { value: '#999999' },
          600: { value: '#808080' },
          700: { value: '#666666' },
          800: { value: '#4d4d4d' },
          900: { value: '#333333' },
          950: { value: '#1a1a1a' },
          1000: { value: '#000000' },
        },
        blue: {
          300: { value: '#6292F9' },
          400: { value: '#306EF7' },
          500: { value: '#135BF6' },
        },
      },
      spacing: {
        xxsmall: { value: '0.375rem' },
        xsmall: { value: '0.75rem' },
        small: { value: '0.5rem' },
        medium: { value: '1rem' },
        large: { value: '2rem' },
      },
    },
    semanticTokens: {
      colors: {
        appBackground: {
          value: { base: '{colors.black.0}', _osLight: '{colors.white.0}', _osDark: '{colors.black.0}' },
        },
        cardBackground: {
          value: { base: '{colors.black.100}', _osLight: '{colors.white.100}', _osDark: '{colors.black.100}' },
        },
        codeBlockBackground: {
          value: { base: '{colors.black.100}', _osLight: '{colors.white.100}', _osDark: '{colors.black.100}' },
        },
        uiElementBackground: {
          value: { base: '{colors.black.100}', _osLight: '{colors.white.100}', _osDark: '{colors.black.100}' },
        },
        uiElementBackgroundHover: {
          value: { base: '{colors.black.200}', _osLight: '{colors.white.200}', _osDark: '{colors.black.200}' },
        },
        border: {
          value: { base: '{colors.black.400}', _osLight: '{colors.white.400}', _osDark: '{colors.black.400}' },
        },
        borderHover: {
          value: { base: '{colors.black.500}', _osLight: '{colors.white.500}', _osDark: '{colors.black.500}' },
        },
        highContrastForeground: {
          value: { base: '{colors.black.1000}', _osLight: '{colors.white.1000}', _osDark: '{colors.black.1000}' },
        },
        lowContrastForeground: {
          value: { base: '{colors.black.600}', _osLight: '{colors.white.600}', _osDark: '{colors.black.600}' },
        },
        link: {
          value: { base: '{colors.blue.400}', _osLight: '{colors.blue.400}', _osDark: '{colors.blue.400}' },
        },
        linkHover: {
          value: { base: '{colors.blue.500}', _osLight: '{colors.blue.500}', _osDark: '{colors.blue.300}' },
        },
      },
    },
    textStyles: {
      heading1: {
        value: {
          fontFamily: 'Space Mono',
          fontSize: '2.5rem',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: '1.2',
          letterSpacing: '-0.06em',
          textTransform: 'uppercase',
        },
      },
      heading2: {
        value: {
          fontFamily: 'Space Mono',
          fontSize: '2rem',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: '1.2',
          letterSpacing: '-0.06em',
          textTransform: 'uppercase',
        },
      },
      heading3: {
        value: {
          fontFamily: 'Space Grotesk',
          fontSize: '1.5rem',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: '1.2',
          letterSpacing: '-0.06em',
        },
      },
      body: {
        value: {
          fontFamily: 'Space Grotesk',
          fontSize: '1rem',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: '1.5',
        },
      },
      label: {
        value: {
          fontFamily: 'Space Mono',
          fontSize: '1rem',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: '1',
          letterSpacing: '-0.06em',
          textTransform: 'uppercase',
        },
      },
    },
  },
})
