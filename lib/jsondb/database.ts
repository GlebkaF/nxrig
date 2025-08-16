import fs from "fs/promises";
import path from "path";
import type { GenerationRecord, JsonDatabase, GenerationStats } from "./types";

class GenerationDatabase {
  private dbPath: string;
  private lockPath: string;

  constructor() {
    this.dbPath = path.join(process.cwd(), "data", "generations.json");
    this.lockPath = path.join(process.cwd(), "data", "db.lock");
  }

  // Создание директории для данных, если её нет
  private async ensureDataDir(): Promise<void> {
    const dataDir = path.dirname(this.dbPath);
    await fs.mkdir(dataDir, { recursive: true });
  }

  // Простая блокировка для предотвращения одновременной записи
  private async acquireLock(): Promise<void> {
    try {
      await fs.writeFile(this.lockPath, process.pid.toString(), { flag: "wx" });
    } catch (error) {
      // Ждём и пробуем снова
      await new Promise((resolve) => setTimeout(resolve, 100));
      return this.acquireLock();
    }
  }

  private async releaseLock(): Promise<void> {
    try {
      await fs.unlink(this.lockPath);
    } catch (error) {
      // Игнорируем ошибки при удалении блокировки
    }
  }

  // Чтение базы данных
  async read(): Promise<JsonDatabase> {
    await this.ensureDataDir();

    try {
      const data = await fs.readFile(this.dbPath, "utf-8");
      return JSON.parse(data) as JsonDatabase;
    } catch (error) {
      // Если файл не существует, создаём пустую базу
      const emptyDb: JsonDatabase = {
        generations: [],
        meta: {
          version: "1.0.0",
          lastUpdated: new Date().toISOString(),
        },
      };
      await this.write(emptyDb);
      return emptyDb;
    }
  }

  // Запись базы данных
  private async write(db: JsonDatabase): Promise<void> {
    await this.ensureDataDir();
    db.meta.lastUpdated = new Date().toISOString();
    await fs.writeFile(this.dbPath, JSON.stringify(db, null, 2), "utf-8");
  }

  // Добавление новой генерации
  async addGeneration(
    generation: Omit<GenerationRecord, "id">
  ): Promise<string> {
    await this.acquireLock();

    try {
      const db = await this.read();

      // Генерируем уникальный ID
      const id = this.generateId();
      const newGeneration: GenerationRecord = {
        ...generation,
        id,
      };

      db.generations.unshift(newGeneration); // Добавляем в начало массива (новые первыми)
      await this.write(db);

      console.log(`✅ Генерация сохранена в базу с ID: ${id}`);
      return id;
    } finally {
      await this.releaseLock();
    }
  }

  // Получение всех генераций
  async getAllGenerations(): Promise<GenerationRecord[]> {
    const db = await this.read();
    return db.generations;
  }

  // Получение генерации по ID
  async getGenerationById(id: string): Promise<GenerationRecord | null> {
    const db = await this.read();
    return db.generations.find((gen) => gen.id === id) || null;
  }

  // Получение последних N генераций
  async getLatestGenerations(limit: number = 10): Promise<GenerationRecord[]> {
    const db = await this.read();
    return db.generations.slice(0, limit);
  }

  // Удаление генерации по ID
  async deleteGeneration(id: string): Promise<boolean> {
    await this.acquireLock();

    try {
      const db = await this.read();
      const initialLength = db.generations.length;
      db.generations = db.generations.filter((gen) => gen.id !== id);

      if (db.generations.length < initialLength) {
        await this.write(db);
        console.log(`✅ Генерация ${id} удалена из базы`);
        return true;
      }
      return false;
    } finally {
      await this.releaseLock();
    }
  }

  // Генерация уникального ID
  private generateId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 9);
    return `gen_${timestamp}_${random}`;
  }

  // Получение статистики
  async getStats(): Promise<GenerationStats> {
    const db = await this.read();
    const genresCount: Record<string, number> = {};

    db.generations.forEach((gen) => {
      const genre = gen.proDescription.genre;
      genresCount[genre] = (genresCount[genre] || 0) + 1;
    });

    return {
      totalGenerations: db.generations.length,
      latestGeneration: db.generations[0]?.timestamp || null,
      genresCount,
    };
  }
}

// Экспортируем singleton экземпляр
export const generationDb = new GenerationDatabase();
