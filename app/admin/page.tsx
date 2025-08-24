import { Metadata } from "next";
import Link from "next/link";
import Header from "../../components/Header";
import { GenerationsList } from "../../components/GenerationsList";

export function generateStaticParams() {
  return [];
}

export const metadata: Metadata = {
  title: "Guitar Chain Generator | Каталог генераций",
  description: "Каталог всех сгенерированных гитарных цепочек эффектов",
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />

      <div className="container mx-auto px-4 pb-8">
        {/* Заголовок каталога */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Каталог генераций</h1>
          <Link
            href="/admin/generator"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Создать новую генерацию
          </Link>
        </div>

        <GenerationsList />
      </div>
    </div>
  );
}
