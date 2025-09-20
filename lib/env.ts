/**
 * Единый источник истины для определения окружения
 * Single source of truth for environment detection
 */

/**
 * Определяет, работает ли приложение в production режиме
 */
export const isProduction = process.env.NODE_ENV === "production";

/**
 * Определяет, работает ли приложение в development режиме
 */
export const isDevelopment = !isProduction;

/**
 * Определяет, работает ли приложение в test режиме
 */
export const isTest = process.env.NODE_ENV === "test";
