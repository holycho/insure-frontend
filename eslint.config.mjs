// import url from 'node:url';
// import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';
import pluginJs from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin'; // 新版不適用
import tsParser from '@typescript-eslint/parser';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import reactPlugin from 'eslint-plugin-react'; // 新版不適用
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';

// const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
// const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  // check specific files
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}']
  },
  // config with just ignores is the replacement for `.eslintignore`
  {
    ignores: [
      'node_modules/**',
      'public/**',
      'react-app-env.d.ts',
      'reportWebVitals.ts',
      'setupTests.ts',
      'eslint.config.mjs',
      'tsconfig.json',
      'src/__tests__/*.*',
      'cypress/**/*.*',
      'cypress.config.ts'
    ]
  },
  // plugins
  {
    plugins: {
      ['@typescript-eslint']: tseslint.plugin,
      ['react-hooks']: reactHooksPlugin,
      ['import']: importPlugin
    }
  },
  // base config
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          modules: true
        },
        ecmaVersion: '2020',
        // project: './tsconfig.json'
      }
    }
  },
  {
    languageOptions:{
      globals: {
        ...globals.browser,
        ...globals.es2021
      }
    }
  },
  // extends
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  // rules（最後規則覆寫）
  {
    // 放到最上面全域啟用，此區塊就只需加規則。
    // files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    // plugins: {
    //   ['react-hooks']: reactHooksPlugin,
    // },
    rules: {
      'react/prop-types': 'off', // reactRecommended 已內建規則，預設開啟
      '@typescript-eslint/type-annotation-spacing': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-unused-expressions': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'import/no-anonymous-default-export': 'off',
      'jsx-quotes': ['error', 'prefer-double'],
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'no-trailing-spaces': 'error',
      'no-multiple-empty-lines': ['error', { "max": 1, "maxEOF": 0 }], // 新版：max 預設為 2
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  }
];