import React from 'react';
import Knob from '../Knob';
import Toggle from '../Toggle';
import { deviceMappings } from '../../data/deviceMappings';
import { processorConfig, SLOT_COLORS, realNames } from '../../lib/processorConfig';

function formatLabel(key) {
  return String(key).replace(/_db$/i, ' dB').replace(/_hz$/i, ' Hz').replace(/_/g, ' ');
}

export default function GenericBlock({ block }) {
  const color = SLOT_COLORS[block.slot] || '#9ca3af';
  const realName = realNames[block.slot]?.[block.model] || deviceMappings[block.slot]?.[block.model];

  // Unsupported type check
  const slotCfg = processorConfig[block.slot];
  const typeKnown = !!slotCfg?.types?.[block.model] || block.slot === 'EFX' || block.slot === 'Amp' || block.slot === 'Mod' || block.slot === 'RVB' || block.slot === 'EQ';
  if (slotCfg && slotCfg.types && !slotCfg.types[block.model] && block.slot !== 'EQ') {
    return (
      <li className="relative p-4 rounded bg-gray-800 border-2 w-fit" style={{ borderColor: color }}>
        <div className="font-semibold mb-2">{block.model}{realName && <span className="text-gray-400"> — {realName}</span>}</div>
        <div className="text-sm text-gray-300">не поддерживается</div>
        <span className="absolute bottom-1 right-1 px-2 py-0.5 text-xs font-semibold rounded" style={{ backgroundColor: color, color: '#000' }}>
          {block.slot}
        </span>
      </li>
    );
  }

  return (
    <li className="relative p-4 rounded bg-gray-800 border-2 w-fit" style={{ borderColor: color }}>
      <div className="font-semibold mb-2">
        {block.model}
        {realName && <span className="text-gray-400"> — {realName}</span>}
      </div>
      {block.slot === 'EQ' ? (
        <div className="text-xs text-gray-300">EQ visualization handled elsewhere</div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {Object.entries(block.params || {}).map(([key, value]) =>
            String(key).toLowerCase() === 'bright' ? (
              <Toggle key={key} label={formatLabel(key)} value={Number(value)} color={color} />
            ) : (
              <Knob key={key} label={formatLabel(key)} value={Number(value)} color={color} />
            )
          )}
        </div>
      )}
      <span className="absolute bottom-1 right-1 px-2 py-0.5 text-xs font-semibold rounded" style={{ backgroundColor: color, color: '#000' }}>
        {block.slot}
      </span>
    </li>
  );
}