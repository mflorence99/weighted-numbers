module.exports = {
  collectCoverage: true,
  coverageReporters: ['json-summary', 'text-summary'],
  coveragePathIgnorePatterns: ['/node_modules/', '/src/ported/'],
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  }
};
