import React from "react";
import { SLOT_COLORS, processorConfig } from "../../lib/processorConfig";
import Knob from "../Knob";
import Toggle from "../Toggle";
import { BaseBlock } from "../types/chain";

interface GenericBlockProps {
  block: BaseBlock;
}

function formatLabel(key: string): string {
  return String(key)
    .replace(/_db$/i, " dB")
    .replace(/_hz$/i, " Hz")
    .replace(/_/g, " ");
}

const GenericBlock: React.FC<GenericBlockProps> = ({ block }) => {
  const color =
    SLOT_COLORS[block.slot as keyof typeof SLOT_COLORS] || "#9ca3af";
  const slotCfg = processorConfig[block.slot as keyof typeof processorConfig];
  const typeCfg = slotCfg?.types?.[block.model];
  const realName = typeCfg?.realName;

  if (slotCfg && slotCfg.types && !typeCfg && block.slot !== "EQ") {
    return (
      <li
        className="relative p-4 rounded bg-gray-800 border-2 w-fit"
        style={{ borderColor: color }}
      >
        <div className="font-semibold mb-2">
          {block.model}
          {realName && <span className="text-gray-400"> — {realName}</span>}
        </div>
        <div className="text-sm text-gray-300">не поддерживается</div>
        <span
          className="absolute bottom-1 right-1 px-2 py-0.5 text-xs font-semibold rounded"
          style={{ backgroundColor: color, color: "#000" }}
        >
          {block.slot}
        </span>
      </li>
    );
  }

  return (
    <li
      className="relative p-4 rounded bg-gray-800 border-2 w-fit"
      style={{ borderColor: color }}
    >
      <div className="font-semibold mb-2">
        {block.model}
        {realName && <span className="text-gray-400"> — {realName}</span>}
      </div>
      {block.slot === "EQ" ? (
        <div className="text-xs text-gray-300">
          EQ visualization handled elsewhere
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {Object.entries(block.params || {}).map(([key, value]) => {
            const meta = typeCfg?.params?.[key] || {};
            const label = meta.label || formatLabel(key);
            return String(key).toLowerCase() === "bright" ? (
              <Toggle
                key={key}
                label={label}
                value={Number(value)}
                color={color}
              />
            ) : (
              <Knob
                key={key}
                label={label}
                value={Number(value)}
                color={color}
              />
            );
          })}
        </div>
      )}
      <span
        className="absolute bottom-1 right-1 px-2 py-0.5 text-xs font-semibold rounded"
        style={{ backgroundColor: color, color: "#000" }}
      >
        {block.slot}
      </span>
    </li>
  );
};

export default GenericBlock;
