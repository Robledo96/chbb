import {  dob, randomRFC } from './utils'
import { person, payment, address, address_mx, } from '../support/objects_mobile'


// Mexico
// Quote / Select Plan / Personal Details
Cypress.Commands.add('cyber_mx', () => {
    cy.fixture('locators').then((x) => {
        // Quote
        cy.log('//// Quote ////')
        cy.get(x.quote_button).click()
        cy.get('.loading-indicator__container').should(($loading) => {
            expect($loading).not.to.exist
        })
        // Select Plan
        cy.log('//// Select Plan ////')
        cy.get(x.plans_select_button).should('have.length.greaterThan', 0)
            .its('length').then(($length) => {
                cy.get(x.plans_select_button).eq(Cypress._.random($length - 1)).click()
            })
        cy.get('.loading-indicator__container').should(($loading) => {
            expect($loading).not.to.exist
        })

        cy.wait(4000)
        // Captcha
        cy.log('////// Conditional - Captcha //////')
        cy.get('body').then($body => {
            if ($body.find('.captcha-modal', { timeout: 60000 }).length > 0) {
                cy.log('////// True //////')
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
        // Personal Details 
        cy.log('///// Personal Details //////')
        cy.get(x.input_name).type(person.name)
            .get(x.input_last_name).type(person.last_name)
            .get(x.input_birth_date).type(dob())
            .get(x.input_id).click().type(randomRFC()).wait(500)//'ANML891018J47'
        cy.get(x.select_value_1).click()
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length').then(($length) => {
                cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
            })
        cy.get(x.input_mobile).type(person.phone_1)
            .get(x.input_email).type(person.email)
            .get(x.input_zipcode).type(address_mx.zipcode)

        cy.intercept('POST', '/api/data/locations').as('getLocation')
            .wait('@getLocation', { timeout: 90000 })
            .wait(1000)
        cy.log('/////// Select /////')
        cy.get(x.input_colonia).click()
            .get(x.colonia_option_text, { timeout: 90000 }).eq(0).click({ force: true })

            .get(x.input_address_1).type(address.line1)
            .wait(1000)
            .get(x.forward_button).click()
        cy.get('.loading-indicator__container').should(($loading) => {
            expect($loading).not.to.exist
        })

    })
})        
// Payment Page 
Cypress.Commands.add('payment_cyber_mx', () => {
    cy.fixture('locators').then((x) => {
        cy.log('////// Radio Group - 1 /////')
        cy.get(x.radio_group)
            .find(x.check_outer_circle).should('have.length.greaterThan', 0)
            .its('length').then(($length) => {
                cy.get(x.check_outer_circle).eq(Cypress._.random($length - 1)).click({ force: true })
            })

        cy.iframe(x.card_iframe).then($ => {
            cy.wrap($[0])
                .find(x.input_card).click()
                .type(payment.visa_card_num_1)
                .get(x.input_card_name).type(payment.card_holder)
                .get(x.input_expiry_date).type(payment.expiration_date_2)
        })
        cy.iframe(x.cvv_iframe).then($iframes => {
            cy.wrap($iframes[0])
                .find(x.input_cvv).click()
                .type(payment.cvv_1)
            cy.get(x.checkboxes).check({ force: true }).should('be.checked')
                .get(x.forward_button).should('be.enabled')

        })
        cy.url().then((url) => {
            if (url.includes('https://la.studio-uat.chubb.com/')) {
                cy.wait(1000)
                cy.get(x.forward_button).click()

                cy.get('.loading-indicator__container').should(($loading) => {
                    expect($loading).not.to.exist
                })
            }
        })

    })
})