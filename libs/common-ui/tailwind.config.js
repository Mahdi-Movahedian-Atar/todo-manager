const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      containers: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
    },
    colors: {
      primary: { light: '#bfc2d5', middle: '#798886', dark: '#27282c' },
      secondary: { light: '#27282c', middle: '#797c88', dark: '#bec1d4' },
      accent: { primary: '#e600ff', middle: '#7343ec', secondary: '#e178ec' },
      text: { light: '#000000', middle: '#818181', dark: '#ffffff' },
      placeholderText: { light: '#545454', dark: '#b7b7b7' },
      inputText: { light: '#000000', dark: '#ffffff' },
      danger: { primary: '#ff0000', middle: '#ec5743', secondary: '#ec7878' },
      warning: { primary: '#ff6200', middle: '#ecc543', secondary: '#ecac78' },
      success: { primary: '#5eff00', middle: '#43ec87', secondary: '#a3ec78' },
    },
    keyframes: {
      shake: {
        '0%': { transform: 'rotate(0deg)' },
        '10%': { transform: 'rotate(3deg)' },
        '20%': { transform: 'rotate(-3deg)' },
        '30%': { transform: 'rotate(3deg)' },
        '40%': { transform: 'rotate(-3deg)' },
        '50%': { transform: 'rotate(3deg)' },
        '60%': { transform: 'rotate(-3deg)' },
        '100%': { transform: 'rotate(0deg)' },
      },
    },
    animation: {
      shake: 'shake 0.5s ease-in-out',
    },
  },
  plugins: [require('@tailwindcss/container-queries')],
};
