# Git Hooks

В проекте настроены автоматические проверки кода с помощью Git Hooks.

## Установка

Hooks устанавливаются автоматически при выполнении `npm install` благодаря скрипту `prepare` в package.json.

## Настроенные Hooks

### Pre-commit Hook

Запускается перед каждым коммитом и выполняет:

1. **Lint-staged** - проверка и автоматическое исправление кода в staged файлах
   - ESLint для `.js`, `.jsx`, `.ts`, `.tsx` файлов
   - Prettier для всех файлов
2. **TypeScript проверка типов** - `tsc --noEmit`

### Pre-push Hook

Запускается перед отправкой кода в репозиторий и выполняет:

1. **Тесты** - `npm run test` (Vitest)

## Конфигурация

### Lint-staged

Настройки находятся в `package.json`:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,css}": ["prettier --write"]
  }
}
```

### Husky

Hooks находятся в папке `.husky/`:

- `.husky/pre-commit` - проверки перед коммитом
- `.husky/pre-push` - тесты перед отправкой

## Ручной запуск

Если нужно запустить проверки вручную:

```bash
# Проверка типов
npm run type-check

# Линтер
npm run lint

# Тесты
npm run test

# Lint-staged (только для staged файлов)
npx lint-staged
```

## Отключение Hooks

В случае необходимости можно временно отключить hooks:

```bash
# Отключить pre-commit hook
git commit --no-verify -m "Сообщение коммита"

# Отключить pre-push hook
git push --no-verify
```

## Troubleshooting

### Ошибки TypeScript

Если есть ошибки типов, исправьте их перед коммитом или используйте `--no-verify`.

### Ошибки ESLint

ESLint автоматически исправляет большинство проблем. Если остаются ошибки, исправьте их вручную.

### Ошибки тестов

Убедитесь, что все тесты проходят перед отправкой кода.
