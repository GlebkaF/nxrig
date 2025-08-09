import React from 'react';

import { deviceMappings } from '../../data/deviceMappings';
import { SLOT_COLORS, processorConfig, toUnitString } from '../../lib/processorConfig.ts';
import Knob from '../Knob';

export default function CabBlock({ block }) {
  const color = SLOT_COLORS.IR;
  const typeCfg = processorConfig.IR?.types?.[block.model] || processorConfig.IR?.types?.default;
  const realName = typeCfg?.realName || deviceMappings['IR']?.[block.model];
  const cfgParams = typeCfg?.params;
  const level = Number(block.params?.CAB_Para4 ?? block.params?.level ?? 50);
  const low = Number(block.params?.CAB_Para5 ?? block.params?.lowcut ?? 50);
  const high = Number(block.params?.CAB_Para6 ?? block.params?.hicut ?? 50);
  const levelDv = toUnitString(level, cfgParams?.CAB_Para4 || cfgParams?.level || {});
  const lowDv = toUnitString(low, cfgParams?.CAB_Para5 || cfgParams?.lowcut || {});
  const highDv = toUnitString(high, cfgParams?.CAB_Para6 || cfgParams?.hicut || {});
  return (
    <li className="relative p-4 rounded bg-gray-800 border-2 w-fit" style={{ borderColor: color }}>
      <div className="font-semibold mb-2">
        {block.model}
        {realName && <span className="text-gray-400"> — {realName}</span>}
      </div>
      <div className="flex flex-wrap gap-4">
        <Knob label={`Level${levelDv ? `\n${levelDv}` : ''}`} value={level} color={color} />
        <Knob label={`Low Cut${lowDv ? `\n${lowDv}` : ''}`} value={low} color={color} />
        <Knob label={`High Cut${highDv ? `\n${highDv}` : ''}`} value={high} color={color} />
      </div>
      <span className="absolute bottom-1 right-1 px-2 py-0.5 text-xs font-semibold rounded" style={{ backgroundColor: color, color: '#000' }}>
        IR
      </span>
    </li>
  );
}