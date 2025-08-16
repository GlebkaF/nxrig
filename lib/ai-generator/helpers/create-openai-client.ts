import OpenAI from "openai";

/**
 * Создаёт клиент OpenAI с настройками прокси
 */
export async function createOpenAIClient(): Promise<OpenAI> {
  const { HttpsProxyAgent } = await import("https-proxy-agent");
  const fetch = (await import("node-fetch")).default;

  const proxyUrl = process.env["PROXY_URL"];
  const apiKey = process.env["OPENAI_API_KEY"];

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set");
  }

  if (!proxyUrl) {
    throw new Error("PROXY_URL is not set");
  }

  const proxyAgent = new HttpsProxyAgent(proxyUrl);

  return new OpenAI({
    apiKey: apiKey,
    // @ts-expect-error TODO: fix this
    fetch: async (url: string, init?: unknown): unknown => {
      console.log("Making request through proxy to:", url);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return fetch(url, {
        // @ts-expect-error idk how to do it properly
        ...init,
        agent: proxyAgent,
      });
    },
  });
}
