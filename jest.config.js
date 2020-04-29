module.exports = {
  collectCoverage: true,
  coverageReporters: ['json', 'text'],
  coveragePathIgnorePatterns: ['/node_modules/', '/src/ported/'],
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  }
};
