import { Random, dob, randomRFC, randomRUT, randomDNI, randomCPF } from './utils'
import { person, payment, mobile, address, address_ec, address_mx, address_co, address_ar, address_br } from '../support/objects_mobile'
let n = 0
let date = dob()

// Personal Details MEXICO
Cypress.Commands.add('details_residential_mx', () => {
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

        cy.intercept('POST', '/api/data/locations').as('getLocation')
            .wait('@getLocation', { timeout: 80000 })

            .get(x.input_colonia_1).type(address_mx.colonia)
            .get(x.input_address_1).type(address.line1)
            .wait(1000)
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
// Payment Page MEXICO
Cypress.Commands.add('payment_residential_mx', () => {
    cy.fixture('locators').then((x) => {
        cy.iframe(x.card_iframe).then($ => {
            cy.wrap($[0])
                .find(x.input_card).click()
                .type(payment.mc_card_num)
                .wait(500)
                .get(x.input_card_name).type(payment.card_holder)
                .get(x.input_expiry_date).type(payment.expiration_date_2)
        })
        cy.iframe(x.cvv_iframe).then($iframes => {
            cy.wrap($iframes[0])
                .find(x.input_cvv).click()
                .type(payment.cvv_1)
                .wait(500)
                .get(x.checkboxes).click({ multiple: true })
                .wait(500)
                .get(x.forward_button).should('be.enabled')

        })
    })
})

// Personal Details COLOMBIA
Cypress.Commands.add('details_residential_co', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.input_name).type(person.name)
            .get(x.input_last_name).type(person.last_name)
            .get(x.input_birth_date).first().type(date)
        cy.get(x.select_value).first().click()
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length')
            .then(cy.log)
            .then(() => {
                n = Cypress._.random(0, 1)
                cy.log(n)
                cy.get(x.select_option).eq(n).click()
            })
            .get(x.input_id).type(Random(1000000000, 1999999999))
            .get(x.input_birth_date).eq(1).type(date)
            .get(x.input_mobile).type(person.phone_3)
            .get(x.input_email).type(person.email)
            .get(x.input_address_1).type(address.line1)
            .get(x.input_address_2).type(address_co.floor)
            .get(x.input_province).type(address_co.department)
            .get(x.input_city).type(address_co.city)
        cy.get(x.select_value).eq(1).click()
            .wait(1000)
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length')
            .then(cy.log)
            .then(() => {
                n = Cypress._.random(0, 1)
                cy.log(n)
                cy.get(x.select_option).eq(n).click()
            })
            .wait(1000)
            .get(x.forward_button).click()
            .wait(10000)
        cy.get(x.errors, { timeout: 10000 }).then(($error) => {
            if ($error.is(':visible')) {
                cy.get(x.input_id).type(Random(1000000000, 1999999999))
                    .get(x.forward_button).click()
                    .wait(500)
            }
        })
    })
})
// Payment Page COLOMBIA
Cypress.Commands.add('payment_residential_co', () => {
    cy.fixture('locators').then((x) => {
        cy.iframe(x.card_iframe).then($ => {
            cy.wrap($[0])
                .find(x.input_card).click()
                .type(payment.amex_card_num)
                .wait(500)
                .get(x.input_card_name).type(payment.card_holder)
                .get(x.input_expiry_date).type(payment.expiration_date)
        })
        cy.iframe(x.cvv_iframe).then($iframes => {
            cy.wrap($iframes[0])
                .find(x.input_cvv).click()
                .type(payment.cvv_2)
                .wait(500)
                .get(x.checkboxes).click({ multiple: true })
                .wait(500)
                .get(x.forward_button).should('be.enabled')

        })
    })
})

// Personal Details CHILE
Cypress.Commands.add('details_residential_cl', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.input_name).type(person.name)
            .get(x.input_last_name).type(person.last_name)
            .get(x.input_birth_date).type(dob())
        cy.get(x.select_value).first().click()//gender
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length')
            .then(cy.log)
            .then(() => {
                n = Cypress._.random(0, 1)
                cy.log(n)
                cy.get(x.select_option).eq(n).click()
            })
        cy.get(x.input_id).type(randomRUT(10000000, 40000000))
        cy.get(x.input_mobile).type(person.phone_4)
            .get(x.input_email).type(person.email)
            .get(x.input_address_1).type(address.line1)
        cy.get(x.select_value).last().click()
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length')
            .then(cy.log)
            .then(() => {
                n = Cypress._.random(0, 346)
                cy.log(n)
                cy.get(x.select_option).eq(n).click()
            })
            .wait(1000)
            .get(x.forward_button).click()
            .wait(10000)
        cy.get(x.errors).then(($error) => {
            if ($error.is(':visible')) {
                cy.get(x.input_birth_date).clear()
                    .get(x.input_birth_date).type(dob())
                    .get(x.input_id).type(randomRUT(1000000, 40000000))
                    .get(x.forward_button).click()
                    .wait(500)
            }
        })
    })
})
// Payment Page CHILE
Cypress.Commands.add('payment_residential_cl', () => {
    cy.fixture('locators').then((x) => {
        cy.iframe(x.card_iframe).then($ => {
            cy.wrap($[0])
                .find(x.input_card).click()
                .type(payment.visa_card_num_1)
                .wait(500)
                .get(x.input_card_name).type(payment.card_holder)
                .get(x.input_expiry_date).click()
                .type(payment.expiration_date_2)
        })
        cy.iframe(x.cvv_iframe).then($iframes => {
            cy.wrap($iframes[0])
                .find(x.input_cvv).click()
                .type(payment.cvv_1)
                .wait(500)
                .get(x.checkboxes).click({ multiple: true })
                .wait(500)
                .get(x.input_expiry_date).click()
                .get(x.forward_button).should('be.enabled')

        })
    })
})

// Personal Details ECUADOR
Cypress.Commands.add('details_residential_ec', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.input_name).type(person.name)
            .get(x.input_last_name).type(person.last_name)
            .get(x.input_birth_date).type(dob())
        cy.get(x.select_value).click()//gender
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length')
            .then(cy.log)
            .then(() => {
                n = Cypress._.random(0, 1)
                cy.log(n)
                cy.get(x.select_option).eq(n).click()
            })
            .get(x.input_id).type(Random(1000000000, 1999999999))//1953064165 
            .get(x.input_mobile).type(person.phone)
            .get(x.input_email).type(person.email)
            .get(x.input_address_1).type(address.line1)
            .get(x.input_city).type(address_ec.city)
            .get(x.input_province).type(address_ec.province)
            .get(x.forward_button).click()
            .wait(10000)
        cy.get(x.errors).then(($error) => {
            if ($error.is(':visible')) {
                cy.get(x.input_id).type(Random(1000000000, 1999999999))
                    .get(x.forward_button).click()
                    .wait(1000)
            }
        })
    })
})
// Payment Page ECUADOR
Cypress.Commands.add('payment_residential_ec', () => {
    cy.fixture('locators').then((x) => {
        cy.iframe(x.card_iframe).then($iframes => {
            cy.wrap($iframes[0])
                .find(x.input_card)
                .first().click()
                .type(payment.dinersClub_card_num)
                .wait(500)
                .get(x.input_card_name).type(payment.card_holder)
                .get(x.input_expiry_date).click()
                .type(payment.expiration_date)

                .get(x.checkboxes).click({ multiple: true })
                .wait(500)
                .get(x.forward_button).should('be.enabled')
        })
    })
})
