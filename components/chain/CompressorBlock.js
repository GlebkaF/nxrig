import React from 'react';
import Knob from '../Knob';
import { processorConfig, SLOT_COLORS } from '../../lib/processorConfig';

export default function CompressorBlock({ block }) {
  const color = SLOT_COLORS.Compressor;
  const model = block.model || 'Compressor';
  const params = block.params || {};

  const cfg = processorConfig.Compressor?.types?.[model] || null;
  if (cfg?.buildUiParams) {
    const uiParams = cfg.buildUiParams(params);
    return (
      <li className="relative p-4 rounded bg-gray-800 border-2 w-fit" style={{ borderColor: color }}>
        <div className="font-semibold mb-2">{model}</div>
        <div className="flex flex-wrap gap-4">
          {uiParams.map(({ key, label, value }) => (
            <Knob key={key} label={label} value={Number(value)} color={color} />
          ))}
        </div>
        <span className="absolute bottom-1 right-1 px-2 py-0.5 text-xs font-semibold rounded" style={{ backgroundColor: color, color: '#000' }}>
          Compressor
        </span>
      </li>
    );
  }

  // Fallback generic
  const GenericBlock = require('./GenericBlock').default;
  return <GenericBlock block={block} />;
}