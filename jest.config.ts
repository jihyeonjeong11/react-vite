import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    transform: { '\\.(ts|tsx)?$': 'ts-jest'},
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    coverageProvider: "v8",
    moduleNameMapper: {
        // stub out CSS imports per Jest's recommendation
        "\\.(css)$": "identity-obj-proxy",
    },
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
    verbose: true,
    collectCoverage: true,
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json',
      }
    }
};

module.exports = config;
