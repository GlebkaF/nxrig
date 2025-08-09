import React, { useEffect, useState } from 'react';

import CabBlock from './chain/CabBlock';
import CompressorBlock from './chain/CompressorBlock';
import DelayBlock from './chain/DelayBlock';
import GenericBlock from './chain/GenericBlock';

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
              {rounded === 0 ? '0' : `${rounded > 0 ? '+' : ''}${rounded.toFixed(1)}`} dB
            </span>
            <div className="relative w-4 h-20 bg-gray-800 rounded overflow-hidden">
              <div className="absolute left-0 w-full h-0.5" style={{ top: `${100 - val}%`, backgroundColor: color, transform: 'translateY(-50%)' }} />
              <div className="absolute top-1/2 left-0 w-full h-px" style={{ backgroundColor: color }} />
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
  const visibleChain = data.chain.filter((b) => b.enabled !== false);
  return (
    <ol className="flex flex-wrap items-start gap-4 mb-4 pr-4">
      {visibleChain.map((block, idx) => {
        if (block.slot === 'EQ') {
          return (
            <li key={idx} className="relative p-4 rounded bg-gray-800 border-2 w-fit" style={{ borderColor: '#9ca3af' }}>
              <div className="font-semibold mb-2">{block.model}</div>
              <EqDisplay params={block.params || {}} color="#9ca3af" />
              <span className="absolute bottom-1 right-1 px-2 py-0.5 text-xs font-semibold rounded" style={{ backgroundColor: '#9ca3af', color: '#000' }}>
                EQ
              </span>
            </li>
          );
        }
        if (block.slot === 'Cabinet') {
          return <CabBlock key={idx} block={block} />;
        }
        if (block.slot === 'Delay') {
          return <DelayBlock key={idx} block={block} />;
        }
        if (block.slot === 'Compressor') {
          return <CompressorBlock key={idx} block={block} />;
        }
        return <GenericBlock key={idx} block={block} />;
      })}
    </ol>
  );
}