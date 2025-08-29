export default {
  testEnvironment: 'jsdom',
  // testEnvironment: 'jest-fixed-jsdom',
  transform: {
    '^.+\\.{ts|tsx}?$': 'ts-jest'
  },
  moduleDirectories: [
    'node_modules'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts'
  ],
  moduleNameMapper: {
    '^axios$': 'axios/dist/node/axios.cjs',
  }
};