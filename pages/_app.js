import '../styles/globals.css';
import { DefaultSeo } from 'next-seo';

const defaultSEO = {
  titleTemplate: '%s | MightyPatch NUX Presets',
  defaultTitle: 'MightyPatch NUX Presets',
  description: 'Коллекция пресетов NUX Mighty и инструмент генерации QR для Mighty Plug Pro 3. Визуализация цепочки эффектов и удобные ссылки.',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://example.com/',
    siteName: 'MightyPatch',
  },
  twitter: {
    cardType: 'summary_large_image',
  },
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...defaultSEO} />
      <Component {...pageProps} />
    </>
  );
}
