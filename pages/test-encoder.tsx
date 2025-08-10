/* eslint-disable @typescript-eslint/typedef */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState, useEffect } from 'react';
import { encodeDefaultChain, debugEncoding } from '../lib/core/encoder';
import { createDefaultChain } from '../lib/core/helpers/create-default-chain';

interface DebugItem {
  index: number;
  value: number;
  description: string;
}

export default function TestEncoderPage(): React.ReactElement {
  const [defaultChain, setDefaultChain] = useState<ReturnType<typeof createDefaultChain> | null>(null);
  const [qrCode, setQrCode] = useState<string>('');
  const [bytes, setBytes] = useState<number[]>([]);
  const [debugInfo, setDebugInfo] = useState<DebugItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      // Создаем дефолтный чейн
      const chain = createDefaultChain();
      setDefaultChain(chain);

      // Энкодируем его
      const encoded = encodeDefaultChain();
      setQrCode(encoded.qrCode);
      setBytes(encoded.bytes);

      // Получаем отладочную информацию
      const debug = debugEncoding(chain);
      setDebugInfo(debug.debug);

      setIsLoading(false);
    } catch (error) {
      console.error('Ошибка при энкодинге:', error);
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Загрузка энкодера...</p>
        </div>
      </div>
    );
  }

  const nonZeroBytes = bytes.filter(b => b !== 0);
  const enabledBlocks = defaultChain ? Object.values(defaultChain).filter(block => block.enabled) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🎸 Chain Encoder Test
          </h1>
          <p className="text-lg text-gray-600">
            Тестирование нового энкодера для конвертации чейна в QR код
          </p>
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Описание:</strong> Этот энкодер принимает дефолтный чейн эффектов из{' '}
                <code className="bg-blue-100 px-2 py-1 rounded">create-default-chain.ts</code>, 
                мапит его на конфигурацию из{' '}
                <code className="bg-blue-100 px-2 py-1 rounded">config.ts</code>{' '}
                и генерирует байтовый массив для QR кода. Конфиг является источником истины для структуры байтов.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">{bytes.length}</div>
            <div className="text-sm text-gray-600 mt-1">Всего байтов</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600">{nonZeroBytes.length}</div>
            <div className="text-sm text-gray-600 mt-1">Ненулевых байтов</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-purple-600">{qrCode.length}</div>
            <div className="text-sm text-gray-600 mt-1">Длина QR кода</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-orange-600">{enabledBlocks.length}</div>
            <div className="text-sm text-gray-600 mt-1">Активных блоков</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Default Chain JSON */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                📋 Дефолтный чейн (JSON)
              </h2>
            </div>
            <div className="p-6">
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm max-h-96 overflow-y-auto">
                {JSON.stringify(defaultChain, null, 2)}
              </pre>
            </div>
          </div>

          {/* QR Code */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                📱 QR код (строка)
              </h2>
            </div>
            <div className="p-6">
              <div className="bg-green-50 border-2 border-green-200 p-4 rounded-lg">
                <code className="text-xs break-all leading-relaxed font-mono">
                  {qrCode}
                </code>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p><strong>Длина:</strong> {qrCode.length} символов</p>
                <p><strong>Формат:</strong> Каждый байт представлен 3 цифрами</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bytes Visualization */}
        <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              🔢 Байтовый массив (визуализация)
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-10 gap-2 text-xs font-mono">
              {bytes.map((byte, index) => {
                const isNonZero = byte !== 0;
                const isHeader = debugInfo.some(item => item.index === index && item.description.startsWith('Head_'));
                
                return (
                  <div
                    key={index}
                    className={`
                      p-2 text-center rounded border transition-all duration-200
                      ${isNonZero 
                        ? isHeader 
                          ? 'bg-yellow-100 border-yellow-400 font-bold text-yellow-800' 
                          : 'bg-green-100 border-green-400 font-bold text-green-800'
                        : 'bg-gray-50 border-gray-200 text-gray-500'
                      }
                    `}
                    title={`Index ${index}: ${byte} ${debugInfo.find(item => item.index === index)?.description || ''}`}
                  >
                    {index}:{byte}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Debug Table */}
        <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              🔍 Отладочная информация (ненулевые байты)
            </h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Индекс
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Значение
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Описание
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Тип
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {debugInfo.map((item) => (
                    <tr key={item.index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                        {item.index}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                        {item.value}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                        {item.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`
                          inline-flex px-2 py-1 text-xs font-semibold rounded-full
                          ${item.description.startsWith('Head_') 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-green-100 text-green-800'
                          }
                        `}>
                          {item.description.startsWith('Head_') ? 'Header' : 'Parameter'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            ✅ Энкодер успешно использует <code>config.ts</code> как источник истины для структуры байтов
          </p>
        </div>
      </div>
    </div>
  );
}