import js from '@eslint/js'
import globals from 'globals'
import * as tseslint from 'typescript-eslint'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from './prettier.config.js'

export default [
  {
    ignores: ['dist', 'node_modules']
  },
  {
    files: ['**/*.{js,ts}'],

    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        global: 'readonly',
        XMLHttpRequestBodyInit: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly'
      },
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      prettier: prettierPlugin
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended[0].rules,
      ...prettierPlugin.configs.recommended.rules,
      'prettier/prettier': ['warn', prettierConfig],
      'mocha/no-exclusive-tests': 'off',
      'mocha/handle-done-callback': 'off',
      'no-unused-vars': 'off',
      'no-undef': 'error',
      'no-prototype-builtins': 'off',
      'import/no-extraneous-dependencies': 'off'
    }
  }
]
