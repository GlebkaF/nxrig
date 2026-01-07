"use client";

import { useSearchParams } from "next/navigation";
import { presets } from "lib/public/presets";
import { PresetEditor } from "components/PresetEditor";
import { Suspense, useEffect, useState } from "react";
import { Preset } from "lib/public/interface";

interface EditorPageClientProps {
  defaultPreset: Preset;
}

function EditorContent({ defaultPreset }: EditorPageClientProps) {
  const searchParams = useSearchParams();
  const [preset, setPreset] = useState(defaultPreset);

  useEffect(() => {
    const presetId = searchParams.get("preset");
    if (presetId) {
      const foundPreset = presets.find((p) => p.id === presetId);
      if (foundPreset) {
        setPreset(foundPreset);
      }
    }
  }, [searchParams]);

  return <PresetEditor preset={preset} />;
}

export function EditorPageClient({ defaultPreset }: EditorPageClientProps) {
  return (
    <Suspense fallback={<div className="text-white">Loading editor...</div>}>
      <EditorContent defaultPreset={defaultPreset} />
    </Suspense>
  );
}
