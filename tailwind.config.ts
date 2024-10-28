import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#F31260',
              '50': '#fff0f3',
              '100': '#ffe2e8',
              '200': '#ffc9d7',
              '300': '#ff9cb6',
              '400': '#ff6591',
              '500': '#ff306e',
              '600': '#f31260',
              '700': '#cd034e',
              '800': '#ab0649',
              '900': '#520020',
              foreground: '#FFFFFF',
            },
          },
        },
      },
    }),
  ],
};
export default config;
