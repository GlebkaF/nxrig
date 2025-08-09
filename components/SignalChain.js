import React, { useEffect, useState } from 'react';
import Knob from './Knob';
import Toggle from './Toggle';
import { deviceMappings } from '../data/deviceMappings';

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
  return key
    .replace(/_db$/i, ' dB')
    .replace(/_hz$/i, ' Hz')
    .replace(/_/g, ' ');
}

function EqDisplay({ params, color = '#9ca3af' }) {
  const freqs = Object.keys(params);
  const [levels, setLevels] = useState(
    freqs.reduce((acc, f) => ({ ...acc, [f]: 50 }), {})
  );

  useEffect(() => {
    setLevels(
      Object.fromEntries(
        Object.entries(params).map(([k, v]) => [k, Number(v)])
      )
    );
  }, [params]);

  return (
    <div className="flex items-center space-x-3 p-4 bg-gray-900 rounded-lg border border-gray-700">
      {freqs.map((freq) => {
        const val = Number(levels[freq]);
        const db = ((val - 50) / 50) * 15;
        const rounded = Math.round(db * 10) / 10;
        return (
          <div key={freq} className="flex flex-col items-center">
            <span className="mb-1 text-xs text-gray-200">
              {rounded === 0
                ? '0'
                : `${rounded > 0 ? '+' : ''}${rounded.toFixed(1)}`} dB
            </span>
            <div className="relative w-4 h-20 bg-gray-800 rounded overflow-hidden">
              <div
                className="absolute left-0 w-full h-0.5"
                style={{
                  top: `${100 - val}%`,
                  backgroundColor: color,
                  transform: 'translateY(-50%)',
                }}
              />
              <div
                className="absolute top-1/2 left-0 w-full h-px"
                style={{ backgroundColor: color }}
              />
            </div>
            <span className="mt-1 text-xs text-gray-400">{freq.replace('Hz', ' Hz')}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function SignalChain({ data }) {
  if (!data || !Array.isArray(data.chain)) return null;
  return (
    <ol className="flex flex-wrap items-start gap-4 mb-4 pr-4">
      {data.chain.map((block, idx) => {
        const realName = deviceMappings[block.slot]?.[block.model];
        const color = slotColors[block.slot] || '#9ca3af';
        return (
          <li
            key={idx}
            className="relative p-4 rounded bg-gray-800 border-2 w-fit"
            style={{ borderColor: color }}
          >
            <div className="font-semibold mb-2">
              {block.model}
              {realName && <span className="text-gray-400"> — {realName}</span>}
            </div>
            {block.slot === 'EQ' ? (
              <EqDisplay params={block.params || {}} color={color} />
            ) : (
              <div className="flex flex-wrap gap-4">
                {Object.entries(block.params || {}).map(([key, value]) =>
                  key.toLowerCase() === 'bright' ? (
                    <Toggle
                      key={key}
                      label={formatLabel(key)}
                      value={Number(value)}
                      color={color}
                    />
                  ) : (
                    <Knob
                      key={key}
                      label={formatLabel(key)}
                      value={Number(value)}
                      color={color}
                    />
                  )
                )}
              </div>
            )}
            <span
              className="absolute bottom-1 right-1 px-2 py-0.5 text-xs font-semibold rounded"
              style={{ backgroundColor: color, color: '#000' }}
            >
              {block.slot}
            </span>
          </li>
        );
      })}
    </ol>
  );
}