import { isProduction, isDevelopment } from "./env";

// Типы для Google Analytics событий
interface GAEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// Расширяем интерфейс Window для gtag и Яндекс.Метрики
declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      parameters?: Record<string, any>,
    ) => void;
    dataLayer: any[];
    ym: (counterId: number, method: string, ...params: any[]) => void;
  }
}

/**
 * Отправляет событие в Google Analytics через Google Tag Manager и Яндекс.Метрику
 */
export function trackEvent({ action, category, label, value }: GAEvent): void {
  // Проверяем, что мы в браузере
  if (typeof window === "undefined") return;

  try {
    if (isProduction) {
      // Отправляем событие через dataLayer (GTM)
      if (typeof window.dataLayer !== "undefined") {
        window.dataLayer.push({
          event: "custom_event",
          event_category: category,
          event_action: action,
          event_label: label,
          event_value: value,
        });
      }

      // Также отправляем через gtag, если доступен
      if (typeof window.gtag !== "undefined") {
        window.gtag("event", action, {
          event_category: category,
          event_label: label,
          value: value,
        });
      }

      // Отправляем в Яндекс.Метрику
      if (typeof window.ym !== "undefined") {
        window.ym(103809700, "reachGoal", action, {
          category: category,
          label: label,
          value: value,
        });
      }
    }
  } catch (error) {
    // В продакшене не показываем ошибки аналитики
    if (isDevelopment) {
      console.warn("Analytics tracking error:", error);
    }
  }

  // В режиме разработки логируем события в консоль
  if (isDevelopment) {
    console.log("🔍 Analytics Event:", {
      action,
      category,
      label,
      value,
      timestamp: new Date().toISOString(),
      note: "Events are only sent in production mode",
    });
  }
}

/**
 * Отправляет событие добавления в избранное
 */
export function trackAddToFavorites(
  presetId: string,
  presetName?: string,
): void {
  trackEvent({
    action: "add_to_favorites",
    category: "engagement",
    label: presetName || presetId,
    value: 1,
  });
}

/**
 * Отправляет событие удаления из избранного
 */
export function trackRemoveFromFavorites(
  presetId: string,
  presetName?: string,
): void {
  trackEvent({
    action: "remove_from_favorites",
    category: "engagement",
    label: presetName || presetId,
    value: 1,
  });
}
