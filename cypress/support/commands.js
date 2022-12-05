// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command ---
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//Captcha
Cypress.Commands.add('Captcha', () => {
    //Captcha
    cy.wait(9000)
    cy.get('body', { timeout: 10000 }).then($body => {
        if ($body.find('.captcha-modal').length > 0) {
            cy.get('.captcha-modal', { timeout: 60000 }).click({ force: true })
            cy.get('.captcha-modal__content .captcha-modal__question').invoke('text').then((text) => {
                let textop = text
                let finaltx = textop.trim()
                let finaladd = 0
                let newtext = finaltx.split(" ")
                if (newtext[1] == '+') {
                    finaladd = parseInt(newtext[0]) + parseInt(newtext[2].trim())
                    // cy.log(finaladd + " plus")
                } else if (newtext[1] == '-') {
                    finaladd = parseInt(newtext[0]) - parseInt(newtext[2].trim())
                    // cy.log(finaladd + " minus")
                }
                cy.get('[name="captchaVal"]').first().type(finaladd)
                cy.get("[type='Submit']").click()
            })
        }
    })
})
//Edit button click
Cypress.Commands.add('Edit_button', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.edit_button).click() //edit button
    })
})
//Select PLan
Cypress.Commands.add('Plan', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.plans_select_button, { timeout: 100000 }).should('have.length.greaterThan', 0)
            .its('length').then(($length) => {
                cy.get(x.plans_select_button).eq(Cypress._.random($length - 1)).click()
            })
    })
})
//Not Found
Cypress.Commands.add('Not_Found', () => {
    cy.wait(2000)
    cy.url().then(($url) => {
        if ($url.includes('https://la.studio.chubb.com/404')) {
            throw new Error('//// NOT FOUND ////')
        }
    })
})
