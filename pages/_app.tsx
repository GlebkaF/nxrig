import "../styles/globals.css";
import YandexMetrika from "../components/YandexMetrika";

export default function App({
  Component,
  pageProps,
}: {
  Component: React.ComponentType;
  pageProps: Record<string, unknown>;
}): React.ReactElement {
  return (
    <>
      <YandexMetrika />
      <Component {...pageProps} />
    </>
  );
}
