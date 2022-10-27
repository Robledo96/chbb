

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'i55cc5',
  waitForAnimations: true,
  chromeWebSecurity: false,
  defaultCommandTimeout: 60000,
  viewportWidth: 1920,
  viewportHeight: 1500,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
