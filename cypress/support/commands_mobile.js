
import { Random, dob, randomRFC, randomRUT } from './utils'
import { person, payment, mobile, address, address_ec, address_mx, address_co } from '../support/objects_mobile'
let n = 0
let date = dob()
let rfc = randomRFC()
let Id = Random(1000000000, 1999999999)
let rut = randomRUT(10000000, 40000000)


// Quote
Cypress.Commands.add('quote', () => {
    cy.fixture('locators_mobile').then((x) => {
        cy.get(x.button_1).click()
            .get(x.input_imei).type(mobile.tac + Random(1000000, 9999999).toString())
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
        cy.get(x.select_value).click()//gender
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length')
            .then(cy.log)
            .then(() => {
                n = Cypress._.random(0, 1)
                cy.log(n)
                cy.get(x.select_option).eq(n).click()
            })
            .get(x.input_id).type(Id)//'1896297523'
            .get(x.input_mobile).type(person.phone)
            .get(x.input_email).type(person.email)
            .get(x.input_address).type(address.line1)
            .get(x.input_city).type(address_ec.city)
            .get(x.input_province).type(address_ec.province)
            .get(x.forward_button).click()
            .wait(10000)
        cy.get(x.errors).then(($error) => {
            if ($error.is(':visible')) {
                cy.get(x.input_id).type(Random(1000000000, 1999999999))
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

        })
    })
})
// Personal Details-MX
Cypress.Commands.add('personal_details_rappi_mx', () => {
    cy.fixture('locators_mobile').then((x) => {
        cy.get(x.input_name).type(person.name)
            .get(x.input_last_name).type(person.last_name)
            .get(x.input_birth_date).type(dob())
            .get(x.input_id).type(rfc)//'ANML891018J47'
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
            .get(x.input_postal_Code).type(address_mx.zipcode).wait(50000)
            .get(x.input_colonia).type(address_mx.colonia)
            .get(x.input_address).type(address.line1)
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
// Payment Page Rappi-MX
Cypress.Commands.add('payment_page_rappi_mx', (env) => {
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

        })
    })
})
// Personal Details CAFAM-CO
Cypress.Commands.add('personal_details_cafam_co', () => {
    cy.fixture('locators_mobile').then((x) => {
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
            .get(x.input_id).type(Id)//'1896297523'
            .get(x.input_birth_date).eq(1).type(date)
            .get(x.input_mobile).type(person.phone_co)
            .get(x.input_email).type(person.email)
            .get(x.input_address).type(address_co.line1)
            .get(x.input_province).type(address_co.departamento)
            .get(x.input_city).type(address_co.city)
        cy.get(x.select_value).eq(1).click()
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length')
            .then(cy.log)
            .then(() => {
                n = Cypress._.random(0, 1)
                cy.log(n)
                cy.get(x.select_option).eq(n).click()
            })
            .get(x.forward_button).click()
            .wait(10000)
        cy.get(x.errors).then(($error) => {
            if ($error.is(':visible')) {
                cy.get(x.input_id).type(Random(1000000000, 1999999999))
                    .get(x.forward_button).click()
                    .wait(500)
            }
        })
    })
})
// Payment Page CAFAM-CO
Cypress.Commands.add('payment_page_cafam_co', (env) => {
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
                .type(payment.cvv1)
                .wait(500)
                .get(x.checkboxes).click({ multiple: true })
                .wait(500)
                .get(x.input_expiry_date).click()
                .get(x.forward_button).should('be.enabled')

        })
    })
})
// Personal Details AUTOMOVILCLUB-CL
Cypress.Commands.add('personal_details_automovilclub_cl', () => {
    cy.fixture('locators_mobile').then((x) => {
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
        cy.get(x.input_id).type(rut)
        cy.get(x.input_mobile).type(person.phone_cl)
            .get(x.input_email).type(person.email)
            .get(x.input_address).type(address.line1)
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


export {
    Id,
    rfc,
    rut
}
