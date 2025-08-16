import "../styles/globals.css";

export default function App({
  Component,
  pageProps,
}: {
  Component: React.ComponentType;
  pageProps: Record<string, unknown>;
}): React.ReactElement {
  return <Component {...pageProps} />;
}
