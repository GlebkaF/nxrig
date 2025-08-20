import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import Head from "next/head";
import { PresetDetails } from "components/PresetDetails";
import { Preset } from "lib/public/interface";
import { presets } from "lib/public/presets";
import Header from "components/Header";
import Footer from "components/Footer";
import { createSlug } from "lib/utils/create-slug";

interface PresetPageProps {
  preset: Preset;
}

const PresetPage: NextPage<PresetPageProps> = ({ preset }) => {
  const title = `${preset.origin.song} ${preset.origin.part} – NUX Mighty Plug Pro Patch | Free Guitar Preset`;
  const description = `Play ${preset.origin.song} ${preset.origin.part} with authentic tone using this free NUX Mighty Plug Pro patch. Download the guitar preset, inspired by ${preset.origin.artist}, and load it on your Mighty Plug Pro.`;

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {/* Можно добавить og:image с изображением пресета, если оно будет доступно */}
      </Head>
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto">
          <PresetDetails preset={preset} />
        </div>
      </main>
      <Footer>
        <div className="container mx-auto">
          <p className="text-gray-300">
            This patch for {preset.origin.song} {preset.origin.part} by{" "}
            {preset.origin.artist} is designed for the NUX Mighty Plug Pro. It
            recreates the original tone with authentic dynamics, perfect for
            practicing the song or performing live. Download the patch, load it
            into your device, and play with the legendary {preset.origin.artist}{" "}
            sound.
          </p>
        </div>
      </Footer>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = presets.map((preset) => ({
    params: {
      artist: createSlug(preset.origin.artist),
      "song-slug": preset.slug,
    },
  }));

  return {
    paths,
    fallback: false, // показывать 404 для несуществующих путей
  };
};

export const getStaticProps: GetStaticProps<PresetPageProps> = async ({
  params,
  // eslint-disable-next-line @typescript-eslint/require-await
}) => {
  const preset = presets.find((p) => {
    return p.slug === params?.["song-slug"];
  });

  if (!preset) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      preset,
    },
  };
};

export default PresetPage;
