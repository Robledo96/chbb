const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',

  projectId: 'i55cc5',

  waitForAnimations: true,
  chromeWebSecurity: false,

  defaultCommandTimeout: 10000,

  viewportWidth: 920,
  viewportHeight: 1500,
  screenshotOnRunFailure: true,
  videoCompression: true,
  video: true,

  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

    },
  },
});
