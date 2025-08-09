import '../styles/globals.css';
import { DefaultSeo } from 'next-seo';

import { siteConfig } from '../lib/siteConfig';

const defaultSEO = {
  titleTemplate: siteConfig.titleTemplate,
  defaultTitle: siteConfig.defaultTitle,
  description: siteConfig.defaultDescription,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.siteUrl,
    siteName: siteConfig.siteName,
  },
  twitter: siteConfig.twitter,
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...defaultSEO} />
      <Component {...pageProps} />
    </>
  );
}
