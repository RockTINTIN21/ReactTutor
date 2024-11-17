import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  { ignores: ['dist'] }, // Игнорируем папку сборки
  {
    files: ['**/*.{js,jsx,ts,tsx}'], // Файлы для проверки
    languageOptions: {
      ecmaVersion: 'latest', // Последняя версия ECMAScript
      sourceType: 'module', // Модульный синтаксис
      parser: tsParser, // TypeScript-парсер
      globals: globals.browser, // Глобальные переменные браузера
    },
    settings: {
      react: {
        version: 'detect', // Автоопределение версии React
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,

      // Правила форматирования
      'semi': ['error', 'always'], // Точки с запятыми
      'quotes': ['error', 'single'], // Одинарные кавычки
      'indent': ['error', 2], // Отступ в 2 пробела
      'comma-dangle': ['error', 'always-multiline'], // Запятая в последнем элементе
      'eol-last': ['error', 'always'], // Пустая строка в конце файла
      'no-trailing-spaces': 'error', // Убираем лишние пробелы
      'space-infix-ops': 'error', // Пробелы вокруг операторов
      'linebreak-style': ['error', 'unix'], // Используем LF вместо CRLF
      'react/jsx-indent': ['error', 2], // Отступ в JSX
      'react/jsx-indent-props': ['error', 2], // Отступ для атрибутов JSX
      'react/jsx-no-target-blank': 'off', // Отключаем предупреждение для target="_blank"
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // Отключаем дублирующее правило
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowShortCircuit: true, allowTernary: true },
      ],
    },
  },
];
