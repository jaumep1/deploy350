module.exports = {
  transformIgnorePatterns: ['node_modules/(?!@?axios)'],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/src/mocks/styleMock.js',
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/mocks/fileMock.js',
    '\\.(css|less)$': '<rootDir>/src/mocks/fileMock.js',
  },
  testEnvironment: 'jsdom',
};
