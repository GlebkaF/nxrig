import React, { useCallback } from "react";
import { Blocks, Chain } from "../../lib/core/interface";
import { config } from "../../lib/core/config";

// Цвета для блоков из конфигурации
const SLOT_COLORS: Record<string, string> = {
  noisegate: "#10b981",
  compressor: "#eab308",
  effect: "#f97316",
  delay: "#7dd3fc",
  amplifier: "#ef4444",
  cabinet: "#3b82f6",
  eq: "#6b7280", // более насыщенный серый, чем у выключенных блоков
  modulation: "#a855f7",
  reverb: "#d946ef",
};

interface ChainEditorProps {
  chain: Chain;
  onChange: (chain: Chain) => void;
  readonly?: boolean;
}

const ChainEditor: React.FC<ChainEditorProps> = ({
  chain,
  onChange,
  readonly = false,
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

  const getTypeDisplayName = (blockKey: Blocks, typeLabel: string): string => {
    const blockConfig = config.blocks[blockKey];
    const typeConfig = blockConfig.types.find((t) => t.label === typeLabel);
    const realName = typeConfig?.realName;

    // Если realName отличается от label, добавляем его в скобках
    if (realName && realName !== typeLabel) {
      return `${typeLabel} — ${realName}`;
    }
    return typeLabel;
  };

  const getBlockColor = (blockKey: string): string => {
    return SLOT_COLORS[blockKey.toLowerCase()] || "#6b7280";
  };

  const hexToRgba = (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r.toString()}, ${g.toString()}, ${b.toString()}, ${alpha.toString()})`;
  };

  const getBlockStyles = (
    blockKey: string,
    enabled: boolean
  ): React.CSSProperties => {
    const color = getBlockColor(blockKey);
    if (enabled) {
      return {
        backgroundColor: hexToRgba(color, 0.25),
        borderColor: hexToRgba(color, 0.6),
        borderWidth: "2px",
      };
    }
    return {
      backgroundColor: "#26282c",
      borderColor: "rgba(255, 255, 255, 0.2)",
      borderWidth: "1px",
    };
  };

  return (
    <div className="space-y-6">
      {Object.entries(chain).map(([blockKey, blockData]) => {
        const blockTypes = getBlockTypes(blockKey as Blocks);
        const blockParams = getBlockParams(blockKey as keyof Chain);

        return (
          <div
            key={blockKey}
            className="rounded-lg p-4 transition-all border"
            style={getBlockStyles(blockKey, blockData.enabled)}
          >
            <div
              className={`flex items-center justify-between ${blockData.enabled ? "mb-4" : ""}`}
            >
              <div
                className="px-3 py-1 rounded-md text-sm font-medium text-white shadow-sm"
                style={{
                  backgroundColor: blockData.enabled
                    ? getBlockColor(blockKey)
                    : "#474b54", // серый для выключенных блоков
                }}
              >
                {blockKey.toUpperCase()}
              </div>
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
                  disabled={readonly}
                  className="rounded border-gray-600 bg-gray-800 text-blue-400 focus:ring-blue-500 disabled:opacity-80"
                />
                <span className="ml-2 text-sm text-white">
                  {blockData.enabled ? "Enabled" : "Disabled"}
                </span>
              </label>
            </div>

            {/* Type Selector */}
            {blockData.enabled && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-white mb-2">
                  Type
                </label>
                <select
                  value={blockData.type}
                  onChange={(e) => {
                    updateBlockType(blockKey as keyof Chain, e.target.value);
                  }}
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:opacity-80 text-white"
                  disabled={readonly}
                >
                  {blockTypes.map((type) => (
                    <option key={type} value={type} className="bg-gray-900">
                      {getTypeDisplayName(blockKey as Blocks, type)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Parameters */}
            {blockData.enabled && blockParams.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-white">Parameters</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {blockParams.map((param) => {
                    const params = blockData.params as Record<string, number>;
                    const currentValue = params[param.label] || 0;

                    return (
                      <div key={param.label}>
                        <label className="block text-xs font-medium text-white mb-1">
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
                            className="flex-1 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer disabled:opacity-80"
                            disabled={!blockData.enabled || readonly}
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
                            className="w-16 p-1 text-xs bg-gray-800 border border-gray-600 rounded text-center text-white disabled:opacity-80"
                            disabled={!blockData.enabled || readonly}
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
