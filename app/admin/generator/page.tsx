import { Metadata } from "next";
import Header from "../../../components/Header";
import { GeneratorForm } from "../../../components/GeneratorForm";

export function generateStaticParams() {
  return [];
}

export const metadata: Metadata = {
  title: "AI Chain Generator",
  description: "Создайте идеальный чейн эффектов с помощью AI",
};

export default function GeneratorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <Header />
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              🎸 AI Chain Generator
            </h1>
            <p className="text-lg text-gray-600">
              Опишите желаемый звук, и AI создаст для вас идеальный чейн
              эффектов
            </p>
          </div>

          <GeneratorForm />
        </div>
      </div>
    </div>
  );
}
