import React, { useCallback } from "react";
import { Blocks, Chain } from "../../lib/core/interface";
import { config } from "../../lib/core/config";

interface ChainEditorProps {
  chain: Chain;
  onChange: (chain: Chain) => void;
  disabled?: boolean;
}

const ChainEditor: React.FC<ChainEditorProps> = ({
  chain,
  onChange,
  disabled = false,
}) => {
  // Функции для обновления чейна
  const updateBlockEnabled = useCallback(
    (blockKey: keyof Chain, enabled: boolean) => {
      onChange({
        ...chain,
        [blockKey]: {
          ...chain[blockKey],
          enabled,
        },
      });
    },
    [chain, onChange]
  );

  const updateBlockType = useCallback(
    (blockKey: keyof Chain, type: string) => {
      onChange({
        ...chain,
        [blockKey]: {
          ...chain[blockKey],
          type,
        },
      });
    },
    [chain, onChange]
  );

  const updateBlockParam = useCallback(
    (blockKey: keyof Chain, paramName: string, value: number) => {
      onChange({
        ...chain,
        [blockKey]: {
          ...chain[blockKey],
          params: {
            ...chain[blockKey].params,
            [paramName]: value,
          },
        },
      });
    },
    [chain, onChange]
  );

  const getBlockTypes = (blockKey: Blocks): string[] => {
    return config.blocks[blockKey].types.map((t) => t.label);
  };

  const getBlockParams = (
    blockKey: keyof Chain
  ): { label: string; encodeIndex: number }[] => {
    const blockType = chain[blockKey].type as string;
    const blockConfig = config.blocks[blockKey as Blocks];
    const typeConfig = blockConfig.types.find((t) => t.label === blockType);
    return typeConfig?.params || [];
  };

  return (
    <div className="space-y-6">
      {Object.entries(chain).map(([blockKey, blockData]) => {
        const blockTypes = getBlockTypes(blockKey as Blocks);
        const blockParams = getBlockParams(blockKey as keyof Chain);

        return (
          <div
            key={blockKey}
            className={`border rounded-lg p-4 transition-colors ${
              blockData.enabled && !disabled
                ? "bg-green-50 border-green-200"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <div
              className={`flex items-center justify-between ${blockData.enabled ? "mb-4" : ""}`}
            >
              <h3 className="text-lg font-medium text-gray-900 capitalize">
                {blockKey}
              </h3>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={blockData.enabled}
                  onChange={(e) => {
                    updateBlockEnabled(
                      blockKey as keyof Chain,
                      e.target.checked
                    );
                  }}
                  disabled={disabled}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {blockData.enabled ? "Включен" : "Выключен"}
                </span>
              </label>
            </div>

            {/* Type Selector */}
            {blockData.enabled && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Тип эффекта
                </label>
                <select
                  value={blockData.type}
                  onChange={(e) => {
                    updateBlockType(blockKey as keyof Chain, e.target.value);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:bg-gray-100"
                  disabled={disabled}
                >
                  {blockTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Parameters */}
            {blockData.enabled && blockParams.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">Параметры</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {blockParams.map((param) => {
                    const params = blockData.params as Record<string, number>;
                    const currentValue = params[param.label] || 0;

                    return (
                      <div key={param.label}>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          {param.label}
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={currentValue}
                            onChange={(e) => {
                              updateBlockParam(
                                blockKey as keyof Chain,
                                param.label,
                                parseInt(e.target.value)
                              );
                            }}
                            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
                            disabled={!blockData.enabled || disabled}
                          />
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={currentValue}
                            onChange={(e) => {
                              updateBlockParam(
                                blockKey as keyof Chain,
                                param.label,
                                parseInt(e.target.value) || 0
                              );
                            }}
                            className="w-16 p-1 text-xs border border-gray-300 rounded text-center disabled:opacity-50 disabled:bg-gray-100"
                            disabled={!blockData.enabled || disabled}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ChainEditor;
