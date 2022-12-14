const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',

  projectId: 'i55cc5',

  waitForAnimations: true,
  chromeWebSecurity: false,
  animationDistanceThreshold: 5,
  requestTimeout: 5000,
  responseTimeout: 30000,

  defaultCommandTimeout: 10000,
  pageLoadTimeout: 20000,
  viewportWidth: 1900,
  viewportHeight: 1500,
  screenshotOnRunFailure: true,
  videoCompression: 15,
  video: false,
  //experimentalStudio: true,


  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

    },
  },
});
