import React from 'react';
import Knob from '../Knob';
import { deviceMappings } from '../../data/deviceMappings';

const color = '#3b82f6';

function mapLevelToDb(v) {
  // -12dB -> 0, 0dB -> 50, +12dB -> 100
  const x = Number(v);
  const db = (x - 50) * (12 / 50);
  return Math.round(db * 10) / 10;
}
function mapLowCutToHz(v) {
  // 0->20Hz, 50->160Hz, 100->300Hz (piecewise linear)
  const x = Number(v);
  if (x <= 50) return Math.round(20 + (x / 50) * (160 - 20));
  return Math.round(160 + ((x - 50) / 50) * (300 - 160));
}
function mapHiCutToHz(v) {
  // 0->5k, 50->10k, 100->20k (piecewise linear)
  const x = Number(v);
  if (x <= 50) return Math.round(5000 + (x / 50) * (10000 - 5000));
  return Math.round(10000 + ((x - 50) / 50) * (20000 - 10000));
}

export default function CabBlock({ block }) {
  const realName = deviceMappings['IR']?.[block.model];
  const levelDb = mapLevelToDb(block.params?.Level ?? block.params?.Level_db ?? 50);
  const lowHz = mapLowCutToHz(block.params?.Low_Cut ?? block.params?.Low_Cut_hz ?? block.params?.LowCut ?? block.params?.lowcut ?? 50);
  const hiHz = mapHiCutToHz(block.params?.High_Cut ?? block.params?.High_Cut_hz ?? block.params?.HighCut ?? block.params?.hicut ?? 50);
  return (
    <li className="relative p-4 rounded bg-gray-800 border-2 w-fit" style={{ borderColor: color }}>
      <div className="font-semibold mb-2">
        {block.model}
        {realName && <span className="text-gray-400"> — {realName}</span>}
      </div>
      <div className="flex flex-wrap gap-4">
        <Knob label={`Level\n${levelDb} dB`} value={Number(block.params?.Level ?? block.params?.Level_db ?? 50)} color={color} />
        <Knob label={`Low Cut\n${lowHz} Hz`} value={Number(block.params?.Low_Cut_hz ?? block.params?.Low_Cut ?? block.params?.lowcut ?? 50)} color={color} />
        <Knob label={`High Cut\n${hiHz} Hz`} value={Number(block.params?.High_Cut_hz ?? block.params?.High_Cut ?? block.params?.hicut ?? 50)} color={color} />
      </div>
      <span className="absolute bottom-1 right-1 px-2 py-0.5 text-xs font-semibold rounded" style={{ backgroundColor: color, color: '#000' }}>
        IR
      </span>
    </li>
  );
}