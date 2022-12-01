// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-mochawesome-reporter/register';
// Alternatively you can use CommonJS syntax:
// require('./commands')
beforeEach(function () {
    cy.intercept('POST', '/api/policy/validate').as('validate')
    cy.intercept('POST', '/api/data/locations').as('getLocation')

    // AH
    cy.intercept('POST', 'https://www.google.com/recaptcha/api2/reload?k=6LeexvkUAAAAAHjVp8Tl7dCaGC5HFtMfZV20XfDV').as('ah_elcomercio_ec')  
    cy.intercept('POST', 'https://www.google.com/recaptcha/api2/reload?k=6LeR5roZAAAAAElSV6dqfPQiLYGBgYoHdG-hdkIz').as('ah_drkura_mx') 
})

beforeEach(function () {
    const suite = cy.state('test').parent
    if (suite.tests.some(test => test.state === 'failed')) {
        this.skip()
    }
})