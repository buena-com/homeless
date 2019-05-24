module.exports = {
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
  ],
  globals: {
    "ts-jest": {
      babelConfig: false,
      diagnostics: true
    }
  },
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  testEnvironment: "node",
  testRegex: "/__tests__/.*(test|spec)\.(tsx?)$",
};
