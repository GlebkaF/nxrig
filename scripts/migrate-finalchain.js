import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Читаем файл с данными
const generationsPath = path.join(__dirname, "..", "data", "generations.json");
const data = JSON.parse(fs.readFileSync(generationsPath, "utf8"));

// Мигрируем данные
data.generations = data.generations.map((generation) => {
  // Если уже есть versions, пропускаем
  if (generation.versions && generation.versions.length > 0) {
    const { finalChain, ...rest } = generation;
    return rest;
  }

  // Создаем версию из finalChain
  const version = {
    chain: generation.finalChain,
    prompt: generation.originalPrompt,
    timestamp: generation.timestamp,
  };

  // Удаляем finalChain и добавляем versions
  const { finalChain, ...rest } = generation;
  return {
    ...rest,
    versions: [version],
  };
});

// Обновляем meta информацию
data.meta.lastUpdated = new Date().toISOString();

// Сохраняем обновленные данные
fs.writeFileSync(generationsPath, JSON.stringify(data, null, 2));
