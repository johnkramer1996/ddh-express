module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  coverageDirectory: '../tests/coverage',
  moduleNameMapper: {
    '@src/(.*)$': '<rootDir>/src/$1',
    '@modules/(.*)$': '<rootDir>/src/modules/$1',
    '@config/(.*)$': '<rootDir>/src/configs/$1',
  },
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
}
