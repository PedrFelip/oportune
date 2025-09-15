import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

const config = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
};

export default config;