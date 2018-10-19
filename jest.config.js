module.exports = {
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
  ],
  globals: {
    "ts-jest": {
      useBabelrc: false,
      enableTsDiagnostics: true
    }
  },
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx?)$",
};