import type {Config} from '@jest/types';
const config: Config.InitialOptions = {
  silent: true,
  verbose: true,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  forceExit: true // workaround, apollo server not quitting after test.
};
export default config;