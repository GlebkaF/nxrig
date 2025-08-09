import React from 'react';

import { processorConfig, SLOT_COLORS, toUnitString } from '../../lib/processorConfig';
import Knob from '../Knob';
import GenericBlock from './GenericBlock';

export default function CompressorBlock({ block }) {
  const color = SLOT_COLORS.Compressor;
  const model = block.model || 'Compressor';
  const params = block.params || {};
  const cfg = processorConfig.Compressor?.types?.[model] || null;
  const cfgParams = cfg?.params;
  if (cfgParams) {
    const entries = Object.entries(cfgParams);
    return (
      <li className="relative p-4 rounded bg-gray-800 border-2 w-fit" style={{ borderColor: color }}>
        <div className="font-semibold mb-2">{model}</div>
        <div className="flex flex-wrap gap-4">
          {entries.map(([key, meta]) => {
            const val = Number(params[key] ?? 50);
            const dv = toUnitString(val, meta);
            const label = dv ? `${meta.label}\n${dv}` : meta.label;
            return <Knob key={key} label={label} value={val} color={color} />;
          })}
        </div>
        <span className="absolute bottom-1 right-1 px-2 py-0.5 text-xs font-semibold rounded" style={{ backgroundColor: color, color: '#000' }}>
          Compressor
        </span>
      </li>
    );
  }
  return <GenericBlock block={block} />;
}