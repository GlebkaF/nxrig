import React from "react";

interface DeviceBadgeProps {
  device: "mighty-plug-pro" | "mighty-space" | "guitar";
  className?: string;
}

export const DeviceBadge: React.FC<DeviceBadgeProps> = ({
  device,
  className = "",
}) => {
  const deviceConfig = {
    "mighty-plug-pro": {
      label: "NUX Mighty Plug Pro",
      bgColor: "bg-violet-500/20",
      textColor: "text-violet-400",
      borderColor: "border-violet-500/30",
    },
    "mighty-space": {
      label: "NUX Mighty Space",
      bgColor: "bg-blue-500/20",
      textColor: "text-blue-400",
      borderColor: "border-blue-500/30",
    },
    guitar: {
      label: "Guitar",
      bgColor: "bg-pink-500/20",
      textColor: "text-pink-400",
      borderColor: "border-pink-500/30",
    },
  };

  const config = deviceConfig[device];

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${config.bgColor} ${config.textColor} ${config.borderColor} ${className}`}
    >
      {config.label}
    </span>
  );
};

export const CompatibleDevices: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <DeviceBadge device="guitar" />
      <DeviceBadge device="mighty-plug-pro" />
      <DeviceBadge device="mighty-space" />
    </div>
  );
};
