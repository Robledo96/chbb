import { Random, dob, randomRFC, randomRUT, randomDNI, randomCPF } from './utils'
import { person, payment, mobile, address, address_ec, address_mx, address_co, address_ar, address_br } from '../support/objects_mobile'
let r = 0
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

        cy.get('form').then(($form) => {
            if ($form.find(x.errors).is(':visible')) {
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

        cy.get('form').then(($form) => {
            if ($form.find(x.errors).is(':visible')) {
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

        cy.get('form').then(($form) => {
            if ($form.find(x.errors).is(':visible')) {
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

        cy.get('form').then(($form) => {
            if ($form.find(x.errors).is(':visible')) {
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

// Personal Details BRASIL
Cypress.Commands.add('details_residential_br', () => {
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
            .get(x.input_mobile).type(person.phone_2)
            .get(x.input_email).type(person.email)
            .get(x.input_id).type(randomCPF())
        cy.get(x.radio_group).first()
            .find(x.check_outer_circle).should('have.length.greaterThan', 0)
            .its('length')
            .then(cy.log)
            .then(() => {
                n = Cypress._.random(0, 1)
                cy.log(n)
                cy.get(x.check_outer_circle).eq(n).click({ force: true })
                cy.get(x.input_zipcode).click()// click outside
                    .wait(1000)

            })
        cy.get('form').then(($form) => {
            if ($form.find(x.errors_1).length > 0) {
                cy.get(x.radio_group).first()
                    .find(x.check_outer_circle).last()
                    .click({ force: true })
                    .wait(500)
            }
        })

        cy.get(x.input_zipcode).type(address_br.zipcode)
            .intercept('https://viacep.com.br/ws/22050000/json').as('Location')
            .wait('@Location')

            .get(x.input_address_1).type(address.line1)
            .get(x.input_ext_number).type(address_br.ext_num)
            .get(x.input_address_2).type(address.line1)
            .get(x.input_address_3).type(address_br.barrio)
            .get(x.input_city).type(address_br.city)
            .get(x.input_province).type(address_br.province)

        cy.get(x.radio_group).last()
            .find(x.check_outer_circle).should('have.length.greaterThan', 0)
            .its('length')
            .then(cy.log)
            .then(() => {
                r = Cypress._.random(2, 3)
                cy.log(r)
                cy.get(x.check_outer_circle).eq(r).click({ force: true })

                if (r > 2) {
                    cy.get(x.input_zipcode_1).type(address_br.zipcode_1)
                    cy.intercept('https://viacep.com.br/ws/69932000/json').as('Location')
                    cy.wait('@Location')
                        .get(x.input_add_1_Billing).type(address.line1)
                        .get(x.input_ext_num_Billing).type(address_br.ext_num)
                        .get(x.input_add_2_Billing).type(address.line1)
                        .get(x.input_add_3_Billing).type(address_br.barrio_1)

                }
            })

            .get(x.checkboxes).click({ multiple: true })
            .wait(1000)
            .get(x.forward_button).click()
            .wait(10000)

        cy.get('body').then(($body) => {
            if ($body.find(x.errors).is(':visible')) {
                cy.get(x.input_id).type(randomCPF())
                    .get(x.forward_button).click()
                    .wait(500)
            }
        })
    })
})
// Payment Page BARSIL
Cypress.Commands.add('payment_residential_br', () => {
    cy.fixture('locators').then((x) => {
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
                .type(payment.cvv_1)
                .wait(500)
                .get(x.checkboxes).click({ multiple: true })
                .wait(500)
                .get(x.input_expiry_date).click()
                .get(x.forward_button).should('be.enabled')

        })
    })
})

export {
    r
}