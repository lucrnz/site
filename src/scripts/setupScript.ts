import { domReady } from "./domReady";

type ListenerConfig = {
  name: string;
  setup: () => Promise<unknown> | unknown;
  afterSwap?: boolean;
  once?: boolean;
};

const setupListeners: Record<string, ListenerConfig> = {};

/**
 * Use this function to setup client-side iteractions with Astro.
 */
export async function setupScript(listener: ListenerConfig) {
  const {
    name,
    setup: providedSetup,
    once: providedOnce,
    afterSwap: providedAfterSwap
  } = listener;

  const setup = async (): Promise<unknown> => {
    await domReady();
    const result = providedSetup();
    return result instanceof Promise ? await result : result;
  };

  const once = providedOnce ?? false;

  const alreadySetup = name in setupListeners;
  const afterSwap = providedAfterSwap ?? true;

  if (!alreadySetup) {
    if (afterSwap) {
      document.addEventListener("astro:after-swap", setup);
    }

    setupListeners[name] = listener;
  }

  if (alreadySetup && once) {
    return;
  }

  await setup();
}
