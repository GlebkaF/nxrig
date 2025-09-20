# Analytics Events Documentation

Система отслеживания событий для Google Analytics (через GTM) и Яндекс.Метрики.

**Важно:** События отправляются только в production режиме (`NODE_ENV === "production"`). В режиме разработки события логируются в консоль браузера.

## Настройка в Google Tag Manager

Для правильного отслеживания событий в Google Analytics через Google Tag Manager нужно настроить следующие триггеры и теги:

### 1. Триггер для пользовательских событий

**Название:** Custom Event Trigger
**Тип:** Пользовательское событие
**Имя события:** `custom_event`

### 2. Теги для отправки в Google Analytics

**Название:** GA4 - Custom Events
**Тип:** Google Analytics: GA4 Event
**Event Name:** `{{event_action}}`
**Parameters:**

- `event_category`: `{{event_category}}`
- `event_label`: `{{event_label}}`
- `value`: `{{event_value}}`

### 3. Переменные dataLayer

Создайте следующие переменные типа "Переменная уровня данных":

- `event_action` → `event_action`
- `event_category` → `event_category`
- `event_label` → `event_label`
- `event_value` → `event_value`

## Отслеживаемые события

### Избранные пресеты

#### add_to_favorites

- **Категория:** engagement
- **Действие:** add_to_favorites
- **Метка:** Название пресета (например, "Metallica - Master of Puppets Rhythm")
- **Значение:** 1

#### remove_from_favorites

- **Категория:** engagement
- **Действие:** remove_from_favorites
- **Метка:** Название пресета
- **Значение:** 1

## Примеры событий в dataLayer

```javascript
// Добавление в избранное
window.dataLayer.push({
  event: "custom_event",
  event_category: "engagement",
  event_action: "add_to_favorites",
  event_label: "Metallica - Master of Puppets Rhythm",
  event_value: 1,
});

// Удаление из избранного
window.dataLayer.push({
  event: "custom_event",
  event_category: "engagement",
  event_action: "remove_from_favorites",
  event_label: "Metallica - Master of Puppets Rhythm",
  event_value: 1,
});
```

## Яндекс.Метрика

События также отправляются в Яндекс.Метрику через метод `reachGoal`:

```javascript
// Пример отправки цели в Яндекс.Метрику
ym(103809700, "reachGoal", "add_to_favorites", {
  category: "engagement",
  label: "Metallica - Master of Puppets Rhythm",
  value: 1,
});
```

### Настройка целей в Яндекс.Метрике

В интерфейсе Яндекс.Метрики создайте цели типа "JavaScript-событие":

1. **add_to_favorites** - добавление в избранное
2. **remove_from_favorites** - удаление из избранного

## Аналитика в Google Analytics 4

После настройки GTM, события будут автоматически отправляться в GA4. Вы можете найти их в отчетах:

1. **Realtime** → Events (для проверки в реальном времени)
2. **Engagement** → Events (для анализа популярных событий)
3. **Conversions** (если настроите события как конверсии)

### Рекомендуемые конверсии

Рекомендуется настроить как конверсии следующие события:

- `add_to_favorites` - показатель вовлеченности пользователей

### Настройка аудиторий

Можно создать аудитории на основе событий:

- Пользователи, которые добавляли пресеты в избранное
- Активные пользователи (добавляли или удаляли из избранного)
