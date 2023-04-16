// import { pathsToModuleNameMapper } from 'tsconfig-paths-jest';
// import tsconfig from './tsconfig.json';

// const moduleNameMapper = pathsToModuleNameMapper(
//   tsconfig.compilerOptions.paths,
//   { prefix: '<rootDir>/src' },
// );
export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
