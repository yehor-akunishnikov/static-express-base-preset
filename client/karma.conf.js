process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = (config) => {
  config.set({
    frameworks: ['jasmine', 'karma-typescript'],
    plugins: [
      'karma-jasmine',
      'karma-typescript',
      'karma-spec-reporter',
      'karma-chrome-launcher'
    ],
    karmaTypescriptConfig: {
      compilerOptions: {
        module: 'commonjs'
      },
      tsconfig: './tsconfig.json'
    },
    client: {
      // leave Jasmine Spec Runner output visible in browser
      clearContext: false
    },
    files: [{ pattern: 'src/**/*.ts' }],
    preprocessors: {
      'src/**/*.ts': ['karma-typescript']
    },
    reporters: ['spec', 'karma-typescript'],
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: true
  });
};
