import 'cypress-iframe'
import { person, address, payment } from '../../../support/objects_mobile';
import { dob, dob_2, randomRUT } from '../../../support/utils'
let num = 0
let env = 0

describe('Life Buk Chile (uat)', { testIsolation: false }, () => {
    //Page 1
    it('Visit', () => {
        cy.visit('https://la.studio-uat.chubb.com/cl/buk/life/launchstage/es-CL')
        //

    })

    it('Quote', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.button_1, { timeout: 30000 }).click()
                .wait(500)
            cy.log('//////// Date of Birth /////////')
            cy.get(x.datepicker_icon).click()
                .get(x.calendar_previous_button).click()
            cy.get(x.calendar_body).should('have.length.greaterThan', 0)
                .its('length').then(($year) => {
                    cy.get(x.calendar_body).eq(Cypress._.random($year - 1)).click()
                        .wait(500)
                    cy.get(x.calendar_body).should('have.length.greaterThan', 0)
                        .its('length').then(($month) => {
                            cy.get(x.calendar_body).eq(Cypress._.random($month - 1)).click()
                                .wait(500)
                            cy.get(x.calendar_body).should('have.length.greaterThan', 0)
                                .its('length').then(($day) => {
                                    cy.get(x.calendar_body).eq(Cypress._.random($day - 1)).click()
                                        .wait(500)
                                })
                        })
                })
            cy.log('////// Coverage for Whom? //////')
            cy.get(x.select_placeholder).click()
                .get(x.select_option).should('have.length.greaterThan', 0)
                .its('length').then(($length) => {
                    cy.log($length)
                    num = Cypress._.random($length - 1)
                    cy.log(num)
                    cy.get(x.select_option).eq(num).click()

                    cy.get(x.quote_button).click()
                })
        })
        cy.wait('@campaign', { timeout: 40000 }).its('response.statusCode').should('eq', 200)
    })

    it('Select Plan', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.plans_select_button, { timeout: 30000 }).should('have.length.greaterThan', 0)
                .its('length').then(($length) => {
                    cy.get(x.plans_select_button).eq(Cypress._.random($length - 1)).click()
                })
        })
    })

    it('Personal Details', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.input_name, { timeout: 30000 }).type(person.name)
                .get(x.input_last_name).type(person.last_name)
            cy.get(x.input_id).click().type(randomRUT())

            cy.log('////// Gener //////')
            cy.get(x.select_value).first().click()
                .get(x.select_option).should('have.length.greaterThan', 0)
                .its('length').then(($length) => {
                    cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
                })
            cy.get(x.input_email).type(person.email)
                .get(x.input_mobile).type(person.phone_4)
                .get(x.input_address_1).type(address.line1)
            cy.get(x.select_placeholder).first().click()
                .get(x.select_option).should('have.length.greaterThan', 0)
                .its('length').then(($length) => {
                    cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
                })
            cy.wait(500)
            cy.log('/////// Conditional - 1 ///////')
            if (num == 1) {
                cy.log('////// True //////')
                cy.get(x.select_value).last().click()
                    .get(x.select_option).should('have.length.greaterThan', 0)
                    .its('length').then(($length) => {
                        cy.log($length)
                        env = Cypress._.random($length - 1)
                        cy.log(env)
                        cy.get(x.select_option).eq(env).click()
                    })
                cy.log('/////// Conditional - 2 ///////')
                if (env >= 0) {
                    cy.log('/////// True ////////')
                    cy.get('body').then(($body) => {
                        expect($body.find('app-beneficiaries').is(':visible'))
                        cy.get('app-beneficiaries')
                            .find(x.input_name).then(els => {
                                [...els].forEach(el => cy.wrap(el).type(person.name))
                            })
                        cy.get('app-beneficiaries')
                            .find(x.input_last_name).then(els => {
                                [...els].forEach(el => cy.wrap(el).type(person.last_name))
                            })
                        cy.get('app-beneficiaries')
                            .find(x.select_placeholder).then(els => {
                                [...els].forEach(el => cy.wrap(el).click().wait(500)
                                    .get(x.select_option).should('have.length.greaterThan', 0)
                                    .its('length').then(($length) => {
                                        cy.get(x.select_option).eq(Cypress._.random($length - 2)).click()
                                    }))
                            })
                        cy.get('app-beneficiaries')
                            .find(x.input_id).then(els => {
                                [...els].forEach(el => cy.wrap(el).type(randomRUT()))
                            })
                        cy.get('app-beneficiaries')
                            .find(x.input_dobFormControl).then(els => {
                                [...els].forEach(el => cy.wrap(el).type(dob_2()))
                            })
                    })
                }
            }

            cy.get(x.forward_button).should('be.enabled').click()

            cy.wait('@validate', { timeout: 40000 })

            cy.wait(1000)
            cy.get('body').then(($body) => {
                if ($body.find('app-applicant-details').is(':visible')) {
                    if ($body.find('mat-error').is(':visible')) {
                        cy.log('///// Bug Found /////')
                        cy.log('////// Changing ID /////')
                        cy.get(x.input_id).first().type(randomRUT()).wait(1000)
                        cy.get(x.forward_button).should('be.enabled').click()

                        cy.wait('@validate', { timeout: 40000 })
                    }
                }
            })
            cy.wait(1000)
            cy.get('body').then(($body) => {
                if ($body.find('app-applicant-details').is(':visible')) {
                    throw new Error('//// ERROR FOUND ////')
                }
            })

        })
    })

    it('payment page Checking', () => {
        cy.fixture('locators').then((x) => {
            cy.wait(1000)
            cy.get(x.review_items, { timeout: 30000 })
                .should('contain.text', person.name)
                .and('contain.text', person.last_name)
                .and('contain.text', person.phone_4)
                .and('contain.text', person.email)
                .and('contain.text', address.line1)
        })
    })

    it('Payment Page Edit button click', () => {
        cy.Edit_button() //Commands.js
    })

    it('Edit', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.input_address_1, { timeout: 30000 }).clear()
                .type(address.line2)

            cy.log('////// Conditional - 3 ///////')
            if (num == 1) {
                cy.log('/////// True //////')
                cy.log('/////// Select Policyholders number 0 //////')
                cy.get(x.select_value).eq(2).click()
                    .get(x.select_option).eq(0).click()
                    .wait(500)

                cy.get('app-beneficiaries').then(($beneficiaries) => {
                    expect($beneficiaries.is(':visible'))
                    cy.get('app-beneficiaries')
                        .get(x.input_name).last().type(person.name)
                        .get(x.input_last_name).last().type(person.last_name)
                        .log('//// Select Only Option 3 (Conyugue) ////')
                        .get(x.select_placeholder).last().click()
                        .get(x.select_option).eq(2).click()
                        .get(x.input_id).last().type(randomRUT())
                        .get(x.input_dobFormControl).last().type(dob())
                })
            }
            cy.get(x.forward_button, { timeout: 10000 }).should('be.enabled').click()

            cy.wait('@validate', { timeout: 40000 }).its('response.statusCode', { timeout: 20000 }).should('eq', 200)
            cy.wait('@iframe', { timeout: 40000 }).its('response.statusCode').should('eq', 200)

            cy.get(x.review_items, { timeout: 30000 })
                .should('contain.text', address.line2)
        })
    })

    it('Payment page', () => {
        cy.fixture('locators').then((x) => {
            cy.wait(1000)
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
                    .get(x.checkboxes).check({ force: true }).should('be.checked')
                    .get(x.input_expiry_date).click()
                    .get(x.forward_button).should('be.enabled')
            })
        })
    })
})






