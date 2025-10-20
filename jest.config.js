export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  transform: { "^.+\\.(js|jsx)$": "babel-jest" },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/src/__mocks__/styleMock.js",
    "\\.(jpg|jpeg|png|gif|svg|webp|avif)$": "<rootDir>/src/__mocks__/fileMock.js",
  },
};
