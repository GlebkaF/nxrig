import { presets } from "lib/public/presets";

export default function Home(): React.ReactElement {
  return (
    <div>
      <h1>Presets</h1>
      <ul>
        {presets.map((preset) => (
          <li key={preset.id}>{preset.title}</li>
        ))}
      </ul>
    </div>
  );
}
