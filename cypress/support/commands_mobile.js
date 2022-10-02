import { getRandomArbitrary, dob, randomId, randomRFC, } from './utils'
import { person, payment, mobile, address_ec, address_mx } from '../support/objects_mobile'

// Quote-EC
Cypress.Commands.add('quote', () => {
    cy.fixture('locators_mobile').then((x) => {
        cy.get(x.button_1).click()
            .get(x.input_imei).type(mobile.tac + randomId(1000000, 9999999).toString())
            .get(x.quote_button).click()
            .wait(500)
    })
})
// Personal Details-EC
Cypress.Commands.add('personal_details_ec', () => {
    cy.fixture('locators_mobile').then((x) => {
        cy.get(x.input_name).type(person.name)
            .get(x.input_last_name).type(person.last_name)
            .get(x.input_birth_date).type(dob())
            .get(x.select_gender).click()
            .get(x.select_gender_male).eq(1).click()
            .get(x.input_id).type(randomId(1000000000, 1999999999))//'1896297523'
            .get(x.input_mobile).type(person.phone)
            .get(x.input_email).type(person.email)
            .get(x.input_address).type(address_ec.line1)
            .get(x.input_city).type(address_ec.city)
            .get(x.input_province).type(address_ec.province)
            .get(x.forward_button).click()
            .wait(10000)
        cy.get(x.errors).then(($error) => {
            if ($error.is(':visible')) {
                cy.get(x.input_id).type(randomId(1000000000, 1999999999))
                    .get(x.forward_button).click()
                    .wait(500)
            }
        })
    })
})
// Payment Page Diners-EC
Cypress.Commands.add('payment_page_diners_ec', (env) => {
    cy.fixture('locators_mobile').then((x) => {
        cy.iframe(x.card_iframe).then($iframes => {
            cy.wrap($iframes[0])
                .find(x.input_card)
                .first()
                .type(payment.discover_card_num)
                .wait(500)
                .get(x.input_card_name).type(payment.card_holder)
                .get(x.input_expiry_date).type(payment.expiration_date)
                .get(x.checkboxes).click({ multiple: true })
                .wait(500)
                .get(x.input_expiry_date).click()
                .get(x.forward_button).should('be.enabled')
            if (env != 'prod') {
                cy.get(x.forward_button).click()
                    .wait(1000)
            }
        })
    })
})
// Payment Page OLX-EC
Cypress.Commands.add('payment_page_olx_ec', (env) => {
    cy.fixture('locators_mobile').then((x) => {
        cy.iframe(x.card_iframe).then($ => {
            cy.wrap($[0])
                .find(x.input_card)
                .type(payment.visa_card_num)
                .wait(500)
                .get(x.input_card_name).type(payment.card_holder)
                .get(x.input_expiry_date).type(payment.expiration_date)
        })
        cy.iframe(x.cvv_iframe).then($iframes => {
            cy.wrap($iframes[0])
                .find(x.input_cvv)
                .type(payment.cvv)
                .wait(500)
                .get(x.checkboxes).click({ multiple: true })
                .wait(500)
                .get(x.input_expiry_date).click()
                .get(x.forward_button).should('be.enabled')
            if (env != 'prod') {
                cy.wait(1000)
                cy.get(x.forward_button).click()

            }

        })
    })
})
// Quote-MX
Cypress.Commands.add('quote_mx', () => {
    cy.fixture('locators_mobile').then((x) => {
        cy.get(x.button_1).click()
            .get(x.input_imei).type(mobile_mx.tac + randomId(1000000, 9999999).toString())
            .get(x.quote_button).click()
            .wait(500)
    })
})
// Personal Details-MX
Cypress.Commands.add('personal_details_mx', () => {
    let n = 0
    cy.fixture('locators_mobile').then((x) => {
        cy.get(x.input_name).type(person.name)
            .get(x.input_last_name).type(person.last_name)
            .get(x.input_birth_date).type(dob())
            .get(x.input_id).type(randomRFC())//'ANML891018J47'
        cy.get(x.select_regimen).click()
        cy.get(x.option_text_regimen).should('have.length.greaterThan', 0)
            .its('length')
            .then(cy.log)
            .then(() => {
                n = Cypress._.random(0, 18)
                cy.log(n)
                cy.get(x.option_text_regimen).eq(n).click()

            })
        cy.get(x.input_mobile).type(person.phone_1)
            .get(x.input_email).type(person.email)
            .get(x.input_postal_Code).type(address_mx.zipcode).wait(50000)
            .get(x.input_colonia).type(address_mx.colonia)
            .get(x.input_address).type(address_mx.line1)
            .get(x.forward_button).click()
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
// Payment Page Rappi-EC
Cypress.Commands.add('payment_page_diners_mx', (env) => {
    cy.fixture('locators_mobile').then((x) => {
        cy.iframe(x.card_iframe).then($ => {
            cy.wrap($[0])
                .find(x.input_card)
                .type(payment.visa_card_num_1)
                .wait(500)
                .get(x.input_card_name).type(payment.card_holder)
                .get(x.input_expiry_date).type(payment.expiration_date)
        })
        cy.iframe(x.cvv_iframe).then($iframes => {
            cy.wrap($iframes[0])
                .find(x.input_cvv)
                .type(payment.cvv1)
                .wait(500)
                .get(x.checkboxes).click({ multiple: true })
                .wait(500)
                .get(x.input_expiry_date).click()
                .get(x.forward_button).should('be.enabled')
            if (env != 'prod') {
                cy.wait(1000)
                cy.get(x.forward_button).click()

            }

        })
    })
})
