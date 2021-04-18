module.exports = {
  "roots": [
    "<rootDir>"
  ],
  "testMatch": [
    "**/?(*.)+(spec|test).+(ts)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: [151001]
      }
    }
  }
}