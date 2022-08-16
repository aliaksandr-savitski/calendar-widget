module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/mocks/.*'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
};
