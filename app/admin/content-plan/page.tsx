import { Metadata } from "next";
import Header from "../../../components/Header";
import { ContentPlanList } from "../../../components/ContentPlanList";
import contentPlanData from "../../../data/content-plan-cleaned.json";

export const metadata: Metadata = {
  title: "Content Plan | Admin",
  description: "Управление контент-планом для создания пресетов",
};

export interface ContentPlanTrack {
  artist: string;
  song: string;
  instrument: string;
  part: string;
  songsterrUrl: string;
  trackIndex: number;
}

export default function ContentPlanPage() {
  const tracks = contentPlanData.tracks as ContentPlanTrack[];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />

      <div className="container mx-auto px-4 pb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Content Plan</h1>
            <p className="text-gray-400 mt-1">
              {tracks.length} треков в очереди на генерацию
            </p>
          </div>
        </div>

        <ContentPlanList initialTracks={tracks} />
      </div>
    </div>
  );
}
