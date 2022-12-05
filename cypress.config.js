const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',

  projectId: 'i55cc5',

  waitForAnimations: true,
  chromeWebSecurity: false,

  defaultCommandTimeout: 10000,

  viewportWidth: 1000,
  viewportHeight: 1500,
  screenshotOnRunFailure: true,
  videoCompression: 15,

  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

    },
  },
});
