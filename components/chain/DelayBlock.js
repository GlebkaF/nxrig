import React from 'react';

import { SLOT_COLORS, processorConfig, toUnitString } from '../../lib/processorConfig.ts';
import Knob from '../Knob';

export default function DelayBlock({ block }) {
  const color = SLOT_COLORS.DLY;
  const params = block.params || {};
  const model = block.model || 'Digital Delay';

  const typeCfg = processorConfig.DLY?.types?.[model] || processorConfig.DLY?.types?.[processorConfig.DLY?.types?.[model]?.aliasOf] || null;
  const cfgParams = typeCfg?.params;
  if (cfgParams) {
    const entries = Object.entries(cfgParams);
    return (
      <li className="relative p-4 rounded bg-gray-800 border-2 w-fit" style={{ borderColor: color }}>
        <div className="font-semibold mb-2">{model}</div>
        <div className="flex flex-wrap gap-4">
          {entries.map(([key, meta]) => {
            const effectiveVal = params[key] ?? (key === 'DLY_Para1' ? params.mix : key === 'DLY_Para2' ? params.feedback : key === 'DLY_Para3' ? params.time : undefined);
            const val = Number(effectiveVal ?? 50);
            const dv = toUnitString(val, meta);
            const label = dv ? `${meta.label}\n${dv}` : meta.label;
            return <Knob key={key} label={label} value={val} color={color} />;
          })}
        </div>
        <span className="absolute bottom-1 right-1 px-2 py-0.5 text-xs font-semibold rounded" style={{ backgroundColor: color, color: '#000' }}>
          DLY
        </span>
      </li>
    );
  }

  // Fallback generic
  return (
    <li className="relative p-4 rounded bg-gray-800 border-2 w-fit" style={{ borderColor: color }}>
      <div className="font-semibold mb-2">{model}</div>
      <div className="flex flex-wrap gap-4">
        {Object.entries(params).map(([k, v]) => (
          <Knob key={k} label={k} value={Number(v)} color={color} />
        ))}
      </div>
      <span className="absolute bottom-1 right-1 px-2 py-0.5 text-xs font-semibold rounded" style={{ backgroundColor: color, color: '#000' }}>
        DLY
      </span>
    </li>
  );
}