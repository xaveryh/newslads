import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import babelParser from '@babel/eslint-parser'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'build', 'coverage', 'node_modules','index.html']),
  {
    files: ['**/*.{js,jsx}'],
    ignores: [
      'eslint.config.js',
      'vite.config.*',
      'tailwind.config.{js,cjs,ts}',
      'postcss.config.{js,cjs,ts}',
      'scripts/**'
    ],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser },
      parser: babelParser,
      parserOptions: { 
        requireConfigFile: false,
        ecmaFeatures: { jsx: true },
        babelOptions: {
          presets: [['@babel/preset-react', {runtime: 'automatic'}]]
        }
      }
    },

    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '[A-Z]', argsIgnorePattern: '^_' }],
      'no-undef': 'error'
    },
  },
])
