import React from 'react';

export default function SignalChain({ chain }) {
  const blockWidth = 80;
  const gap = 20;
  const height = 80;
  const width = chain.length * blockWidth + (chain.length - 1) * gap;

  const renderBlock = (block) => {
    switch (block.slot) {
      case 'Amp':
        return (
          <rect x="0" y="10" width={blockWidth} height="60" rx="4" fill="#4B5563" stroke="#9CA3AF" />
        );
      case 'IR':
        return (
          <g>
            <rect x="10" y="15" width="60" height="50" fill="#4B5563" stroke="#9CA3AF" />
            <line x1="20" y1="25" x2="60" y2="55" stroke="#9CA3AF" />
            <line x1="60" y1="25" x2="20" y2="55" stroke="#9CA3AF" />
          </g>
        );
      case 'EQ':
        return (
          <g>
            <rect x="0" y="10" width={blockWidth} height="60" fill="#4B5563" stroke="#9CA3AF" />
            <rect x="15" y="30" width="8" height="25" fill="#9CA3AF" />
            <rect x="35" y="25" width="8" height="30" fill="#9CA3AF" />
            <rect x="55" y="35" width="8" height="20" fill="#9CA3AF" />
          </g>
        );
      default:
        return (
          <g>
            <rect x="15" y="10" width="50" height="60" rx="6" fill="#4B5563" stroke="#9CA3AF" />
            <circle cx="40" cy="30" r="8" fill="#9CA3AF" />
            <circle cx="40" cy="55" r="10" fill="#9CA3AF" />
          </g>
        );
    }
  };

  return (
    <div className="mb-4 overflow-x-auto">
      <svg width={width} height={height}>
        {chain.map((block, idx) => {
          const x = idx * (blockWidth + gap);
          return (
            <g key={idx} transform={`translate(${x},0)`}>
              {renderBlock(block)}
            </g>
          );
        })}
        {chain.slice(0, -1).map((_, idx) => {
          const x1 = idx * (blockWidth + gap) + blockWidth;
          const x2 = x1 + gap;
          return (
            <line
              key={`c-${idx}`}
              x1={x1}
              y1={height / 2}
              x2={x2}
              y2={height / 2}
              stroke="#9CA3AF"
              strokeWidth="2"
            />
          );
        })}
      </svg>
      <div className="flex mt-2" style={{ width }}>
        {chain.map((_, idx) => (
          <div
            key={idx}
            className="text-center text-xs text-gray-300"
            style={{ width: blockWidth, marginRight: idx < chain.length - 1 ? gap : 0 }}
          >
            {idx + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

