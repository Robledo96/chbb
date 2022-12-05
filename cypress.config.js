const { defineConfig } = require("cypress");

const _ = require('lodash')
const del = require('del')

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

      on('after:spec', (spec, results) => {
        if (results && results.video) {
          // Do we have failures for any retry attempts?
          const failures = _.some(results.tests, (test) => {
            return _.some(test.attempts, { state: 'failed' })
          })
          if (!failures) {
            // delete the video if the spec passed and no tests retried
            return del(results.video)
          }
        }
      })

      require('cypress-mochawesome-reporter/plugin')(on);

    },
  },
});
