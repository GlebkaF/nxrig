import React from 'react';
import Knob from '../Knob';
import Toggle from '../Toggle';
import { deviceMappings } from '../../data/deviceMappings';

const slotColors = {
  Noisegate: '#10b981',
  Compressor: '#eab308',
  EFX: '#f97316',
  DLY: '#7dd3fc',
  Amp: '#ef4444',
  IR: '#3b82f6',
  EQ: '#9ca3af',
  Mod: '#a855f7',
  RVB: '#d946ef',
};

function formatLabel(key) {
  return String(key).replace(/_db$/i, ' dB').replace(/_hz$/i, ' Hz').replace(/_/g, ' ');
}

export default function GenericBlock({ block }) {
  const color = slotColors[block.slot] || '#9ca3af';
  const realName = deviceMappings[block.slot]?.[block.model];
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