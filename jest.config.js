module.exports = {
  preset: 'ts-jest/presets/default-esm',
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(test|spec).ts?(x)'],
  roots: ['src'],
};
