import React, { useState, useCallback } from 'react';
import { Chain } from '../lib/core/interface';
import { encodeChain } from '../lib/core/encoder';
import { QRCodeCanvas } from 'qrcode.react';
import Header from '../components/Header';

const AIChainGenerator: React.FC = () => {
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedChain, setGeneratedChain] = useState<Chain | null>(null);
  const [qrCode, setQrCode] = useState<string>('');
  const [showDetails, setShowDetails] = useState(false);

  const generateChain = useCallback(async () => {
    if (!description.trim()) {
      setError('Пожалуйста, введите описание желаемого звука');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedChain(null);
    setQrCode('');

    try {
      const response = await fetch('/api/generate-chain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate chain');
      }

      if (data.success && data.chain) {
        setGeneratedChain(data.chain);
        
        // Генерируем QR код
        try {
          const encoded = encodeChain(data.chain);
          setQrCode(encoded);
        } catch (encodeError) {
          console.error('Failed to encode chain:', encodeError);
        }
      } else if (data.chain) {
        // Если не удалось распарсить ответ GPT, но есть дефолтный chain
        setGeneratedChain(data.chain);
        setError(data.error || 'Использован стандартный chain');
      }
    } catch (err) {
      console.error('Error generating chain:', err);
      setError(err instanceof Error ? err.message : 'Произошла ошибка при генерации');
    } finally {
      setIsLoading(false);
    }
  }, [description]);

  const downloadQR = useCallback(() => {
    const canvas = document.querySelector('#qr-canvas canvas') as HTMLCanvasElement;
    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'ai-generated-chain-qr.png';
      link.click();
    }
  }, []);

  const copyToClipboard = useCallback(() => {
    if (generatedChain) {
      navigator.clipboard.writeText(JSON.stringify(generatedChain, null, 2));
      alert('Chain скопирован в буфер обмена!');
    }
  }, [generatedChain]);

  const getEnabledBlocksCount = useCallback(() => {
    if (!generatedChain) return 0;
    return Object.values(generatedChain).filter(block => block.enabled).length;
  }, [generatedChain]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-white mb-4">
            🤖 AI Chain Generator
          </h1>
          <p className="text-xl text-gray-300">
            Опишите желаемый звук, и GPT-4 создаст для вас идеальный chain
          </p>
        </div>

        {/* Input Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
            <label className="block text-white text-lg mb-4">
              Опишите звук, который хотите получить:
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Например: тяжелый металлический звук с плотным дисторшном и небольшим дилеем, или чистый джазовый звук с легким хорусом..."
              className="w-full h-32 px-4 py-3 bg-white/20 backdrop-blur text-white placeholder-gray-400 rounded-lg border border-white/30 focus:outline-none focus:border-purple-400 transition-colors"
              disabled={isLoading}
            />
            
            <button
              onClick={generateChain}
              disabled={isLoading || !description.trim()}
              className={`mt-6 w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 ${
                isLoading || !description.trim()
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Генерация chain...
                </span>
              ) : (
                '🎸 Сгенерировать Chain'
              )}
            </button>

            {error && (
              <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
                ⚠️ {error}
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        {generatedChain && (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Chain Overview */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-6">
                  📊 Сгенерированный Chain
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                    <span className="text-gray-300">Активных блоков:</span>
                    <span className="text-white font-semibold">{getEnabledBlocksCount()} / 9</span>
                  </div>
                </div>

                {/* Blocks List */}
                <div className="space-y-3">
                  {Object.entries(generatedChain).map(([blockKey, blockData]) => (
                    <div
                      key={blockKey}
                      className={`p-4 rounded-lg transition-all ${
                        blockData.enabled
                          ? 'bg-green-500/20 border border-green-500/50'
                          : 'bg-gray-500/20 border border-gray-500/30'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-white font-medium capitalize">
                            {blockKey}
                          </span>
                          {blockData.enabled && (
                            <span className="ml-3 text-sm text-green-400">
                              {blockData.type}
                            </span>
                          )}
                        </div>
                        <span className={`text-sm ${blockData.enabled ? 'text-green-400' : 'text-gray-500'}`}>
                          {blockData.enabled ? '✓ Включен' : '✗ Выключен'}
                        </span>
                      </div>
                      
                      {blockData.enabled && Object.keys(blockData.params).length > 0 && (
                        <div className="mt-2 pt-2 border-t border-white/10">
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(blockData.params).slice(0, 4).map(([param, value]) => (
                              <div key={param} className="text-xs">
                                <span className="text-gray-400">{param}:</span>
                                <span className="text-white ml-1">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="w-full py-3 px-4 bg-blue-600/80 hover:bg-blue-700/80 text-white rounded-lg transition-colors"
                  >
                    {showDetails ? '🙈 Скрыть JSON' : '👁️ Показать JSON'}
                  </button>
                  
                  <button
                    onClick={copyToClipboard}
                    className="w-full py-3 px-4 bg-purple-600/80 hover:bg-purple-700/80 text-white rounded-lg transition-colors"
                  >
                    📋 Копировать Chain
                  </button>
                </div>
              </div>

              {/* QR Code Section */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-6">
                  📱 QR Code
                </h2>
                
                {qrCode ? (
                  <div className="flex flex-col items-center">
                    <div id="qr-canvas" className="bg-white p-4 rounded-lg">
                      <QRCodeCanvas
                        value={qrCode}
                        size={300}
                        level="M"
                        includeMargin={false}
                      />
                    </div>
                    
                    <button
                      onClick={downloadQR}
                      className="mt-6 py-3 px-6 bg-green-600/80 hover:bg-green-700/80 text-white rounded-lg transition-colors"
                    >
                      💾 Скачать QR Code
                    </button>
                    
                    <p className="mt-4 text-sm text-gray-400 text-center">
                      Отсканируйте этот QR код в приложении NUX для загрузки chain
                    </p>
                  </div>
                ) : (
                  <div className="text-center text-gray-400">
                    <p>QR код не может быть сгенерирован</p>
                    <p className="text-sm mt-2">Возможно, chain слишком сложный для кодирования</p>
                  </div>
                )}
              </div>
            </div>

            {/* JSON Details */}
            {showDetails && (
              <div className="mt-8 bg-black/50 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-4">
                  JSON структура Chain
                </h3>
                <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto">
                  <code className="text-green-400 text-sm">
                    {JSON.stringify(generatedChain, null, 2)}
                  </code>
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Examples Section */}
        {!generatedChain && !isLoading && (
          <div className="max-w-4xl mx-auto mt-12">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">
                💡 Примеры описаний
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Чистый джазовый звук с теплым тоном и легкой реверберацией',
                  'Агрессивный металлический звук с мощным дисторшном',
                  'Винтажный блюзовый тон с легким овердрайвом',
                  'Эмбиентный звук с глубокой реверберацией и дилеем',
                  'Фанковый звук с компрессором и вау-эффектом',
                  'Классический рок звук в стиле 70-х'
                ].map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setDescription(example)}
                    className="text-left p-3 bg-white/10 hover:bg-white/20 rounded-lg text-gray-300 hover:text-white transition-all"
                  >
                    "{example}"
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIChainGenerator;