import React from 'react';
import Knob from '../Knob';

const color = '#eab308';

export default function CompressorBlock({ block }) {
  const model = block.model || 'Compressor';
  const params = block.params || {};

  if (model === 'K Comp') {
    const sustain = Number(params.Sustain ?? params.sustain ?? 50);
    const level = Number(params.Level ?? params.level ?? 50);
    const clipping = Number(params.Clipping ?? params.Attack ?? params.attack ?? 0);
    return (
      <li className="relative p-4 rounded bg-gray-800 border-2 w-fit" style={{ borderColor: color }}>
        <div className="font-semibold mb-2">{model}</div>
        <div className="flex flex-wrap gap-4">
          <Knob label="Sustain" value={sustain} color={color} />
          <Knob label="Level" value={level} color={color} />
          <Knob label="Clipping" value={clipping} color={color} />
        </div>
        <span className="absolute bottom-1 right-1 px-2 py-0.5 text-xs font-semibold rounded" style={{ backgroundColor: color, color: '#000' }}>
          Compressor
        </span>
      </li>
    );
  }

  const GenericBlock = require('./GenericBlock').default;
  return <GenericBlock block={block} />;
}