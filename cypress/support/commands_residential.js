import { Random, dob, randomRFC, randomRUT, randomDNI, randomCPF } from './utils'
import { person, payment, mobile, address, address_ec, address_mx, address_co, address_ar, address_br } from '../support/objects_mobile'
let n = 0

// Personal Details MEXICO
Cypress.Commands.add('residential_mx', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.input_name).type(person.name)
            .get(x.input_last_name).type(person.last_name)
            .get(x.input_birth_date).type(dob())
            .get(x.input_id).type(randomRFC())//'ANML891018J47'
        cy.get(x.select_value_1).click()
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length')
            .then(cy.log)
            .then(() => {
                n = Cypress._.random(0, 18)
                cy.log(n)
                cy.get(x.select_option).eq(n).click()
            })
        cy.get(x.input_mobile).type(person.phone_1)
            .get(x.input_email).type(person.email)
            .get(x.input_postal_Code).type(address_mx.zipcode)
        cy.url().then((url) => {
            if (url.includes('/la.studio-uat.chubb.com/')) {
                cy.wait(50000)
            } else {
                cy.wait(10000)
            }
        })
            .get(x.input_colonia_1).type(address_mx.colonia)
            .get(x.input_address_1).type(address.line1)
        cy.get(x.forward_button).click()
            .wait(10000)
        cy.get(x.errors).then(($error) => {
            if ($error.is(':visible')) {
                cy.get(x.input_birth_date).clear()
                    .get(x.input_birth_date).type(dob())
                    .get(x.input_id).type(randomRFC())
                    .get(x.forward_button).click()
                    .wait(500)
            }
        })
    })
})
// Payment Page MEXICO
Cypress.Commands.add('payment_page_mx', () => {
    cy.fixture('locators').then((x) => {
        cy.iframe(x.card_iframe).then($ => {
            cy.wrap($[0])
                .find(x.input_card)
                .type(payment.mc_card_num)
                .wait(500)
                .get(x.input_card_name).type(payment.card_holder)
                .get(x.input_expiry_date).type(payment.expiration_date_5)
        })
        cy.iframe(x.cvv_iframe).then($iframes => {
            cy.wrap($iframes[0])
                .find(x.input_cvv)
                .type(payment.cvv_5)
                .wait(500)
                .get(x.checkboxes).click({ multiple: true })
                .wait(500)
                .get(x.input_expiry_date).click({ multiple: true })
                .get(x.forward_button).should('be.enabled')

        })
    })
})