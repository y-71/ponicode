import type { Config } from "@jest/types";

// Ou fonction asynchrone
export default async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
    transform: { "\\.(js|jsx|ts|tsx)$": "@sucrase/jest-plugin" },
  };
};
