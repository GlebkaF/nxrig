import React from 'react';

const DEFAULT_SIZE = 64;
const ARC_LENGTH_RATIO = 0.75;

export default function Spinner({ size = DEFAULT_SIZE, value }) {
  const stroke = size / 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex flex-col items-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="animate-spin drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
      >
        <defs>
          <linearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="25%" stopColor="#facc15" />
            <stop offset="50%" stopColor="#34d399" />
            <stop offset="75%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#spinnerGradient)"
          strokeWidth={stroke}
          strokeDasharray={`${circumference * ARC_LENGTH_RATIO} ${circumference}`}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      {value !== undefined && (
        <span className="mt-2 text-sm font-semibold text-gray-200">{value}</span>
      )}
    </div>
  );
}
