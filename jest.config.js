const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
  
});

const config = {
  moduleDirectories: ["./node_modules", "./src"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  
  
};

module.exports = createJestConfig(config)