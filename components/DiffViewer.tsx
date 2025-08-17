import React from "react";
import { DiffObject } from "../lib/utils/diff";

interface DiffViewerProps {
  diff: DiffObject;
}

const DiffViewer: React.FC<DiffViewerProps> = ({ diff }) => {
  const renderDiffValue = (value: unknown): React.ReactNode => {
    if (typeof value === "object" && value !== null) {
      const diffObj = value as { before?: unknown; after?: unknown };
      if ("before" in diffObj && "after" in diffObj) {
        return (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-red-500 line-through">
                {JSON.stringify(diffObj.before)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">
                {JSON.stringify(diffObj.after)}
              </span>
            </div>
          </div>
        );
      }
      return (
        <div className="pl-4 border-l-2 border-gray-300">
          {Object.entries(value).map(([key, val]) => (
            <div key={key} className="mt-1">
              <span className="font-medium text-gray-700">{key}:</span>
              {renderDiffValue(val)}
            </div>
          ))}
        </div>
      );
    }
    return <span className="text-gray-600">{JSON.stringify(value)}</span>;
  };

  return (
    <div className="font-mono text-sm bg-gray-50 p-4 rounded-lg overflow-x-auto">
      {Object.entries(diff).map(([key, value]) => (
        <div key={key} className="mb-2">
          <span className="font-medium text-gray-900">{key}:</span>
          {renderDiffValue(value)}
        </div>
      ))}
    </div>
  );
};

export default DiffViewer;
