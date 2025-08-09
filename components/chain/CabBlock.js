import React from 'react';
import Knob from '../Knob';
import { deviceMappings } from '../../data/deviceMappings';
import { SLOT_COLORS, mapCabLevelToDb, mapCabLowCutToHz, mapCabHighCutToHz } from '../../lib/processorConfig';

export default function CabBlock({ block }) {
  const color = SLOT_COLORS.IR;
  const realName = deviceMappings['IR']?.[block.model];
  const level = Number(block.params?.level ?? 50);
  const low = Number(block.params?.lowcut ?? 50);
  const high = Number(block.params?.hicut ?? 50);
  const levelDb = mapCabLevelToDb(level);
  const lowHz = mapCabLowCutToHz(low);
  const hiHz = mapCabHighCutToHz(high);
  return (
    <li className="relative p-4 rounded bg-gray-800 border-2 w-fit" style={{ borderColor: color }}>
      <div className="font-semibold mb-2">
        {block.model}
        {realName && <span className="text-gray-400"> — {realName}</span>}
      </div>
      <div className="flex flex-wrap gap-4">
        <Knob label={`Level\n${levelDb} dB`} value={level} color={color} />
        <Knob label={`Low Cut\n${lowHz} Hz`} value={low} color={color} />
        <Knob label={`High Cut\n${hiHz} Hz`} value={high} color={color} />
      </div>
      <span className="absolute bottom-1 right-1 px-2 py-0.5 text-xs font-semibold rounded" style={{ backgroundColor: color, color: '#000' }}>
        IR
      </span>
    </li>
  );
}