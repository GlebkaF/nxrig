import React from 'react';
import Knob from '../Knob';

const color = '#7dd3fc';

function mapTimeToMs(v) {
  // 0 -> 752 ms, 100 -> 61 ms (inverse linear)
  const x = Number(v);
  const ms = 752 - (x / 100) * (752 - 61);
  return Math.round(ms);
}

export default function DelayBlock({ block }) {
  const params = block.params || {};
  const model = block.model || 'Digital Delay';

  if (model === 'Digital Delay' || model === 'Digital') {
    const timeVal = Number(params.time ?? 50);
    const feedbackVal = Number(params.feedback ?? 50);
    const mixVal = Number(params.mix ?? 50);
    const timeMs = mapTimeToMs(timeVal);

    return (
      <li className="relative p-4 rounded bg-gray-800 border-2 w-fit" style={{ borderColor: color }}>
        <div className="font-semibold mb-2">{model}</div>
        <div className="flex flex-wrap gap-4">
          <Knob label={`E.Level`} value={mixVal} color={color} />
          <Knob label={`F.Back`} value={feedbackVal} color={color} />
          <Knob label={`D.Time\n${timeMs} ms`} value={timeVal} color={color} />
        </div>
        <span className="absolute bottom-1 right-1 px-2 py-0.5 text-xs font-semibold rounded" style={{ backgroundColor: color, color: '#000' }}>
          DLY
        </span>
      </li>
    );
  }

  // Fallback generic rendering
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