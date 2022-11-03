

const { defineConfig } = require("cypress");



module.exports = defineConfig({
  projectId: 'i55cc5',
  waitForAnimations: true,
  chromeWebSecurity: false,
  defaultCommandTimeout: 40000,
  viewportWidth: 1920,
  viewportHeight: 1500,
  videoCompression: false,
  e2e: {
    setupNodeEvents(on, config) {

    },
  },
});
