import 'cypress-iframe'
import { dob, dob_1, randomDNI } from '../../../support/utils'
import { person, address, address_ar, payment } from '../../../support/objects_mobile';
let num = 0
let radio = 0
let n = 0

describe('Travel plataforma10 ARGENTINA (uat)', () => {
    //Page 1
    it(' Visit', () => {
        cy.visit('https://la.studio-uat.chubb.com/ar/plataforma10/travel/launchstage/es-AR')
        cy.Not_Found()

    })

    it('Travel Date ', () => {
        cy.fixture('locators').then((x) => {
            // Travel Date
            cy.log('//////// Radio Grup - 1 /////////')
            cy.get(x.button_1, { timeout: 30000 }).click()

            cy.get(x.radio_group, { timeout: 1000 })
                .find(x.check_outer_circle).should('have.length.greaterThan', 0)
                .its('length').then(($length) => {
                    cy.log($length)
                    radio = Cypress._.random($length - 1)
                    cy.get(x.check_outer_circle).eq(radio).click({ force: true })

                    cy.log('////// Radio Checked', radio, '///////')
                    if (radio == 0) {
                        cy.log('//////// Departure Date /////////')
                        cy.get(x.datepicker_icon).first().click()
                            .get(x.calendar_next_button).click()

                        cy.get(x.calendar_body).should('have.length.greaterThan', 0)
                            .its('length')
                            .then(cy.log)
                            .then(() => {
                                n = Cypress._.random(0, 5)
                                cy.log(n)
                                cy.get(x.calendar_body).eq(n).click()
                            })
                        cy.wait(500)
                        cy.log('//////// Arrival Date /////////')
                        cy.get(x.datepicker_icon).last().click()
                        cy.get(x.calendar_body).should('have.length.greaterThan', 0)
                            .its('length')
                            .then(cy.log)
                            .then(() => {
                                n = Cypress._.random(10, 15)
                                cy.log(n)
                                cy.get(x.calendar_body).eq(n).click()
                            })
                    }

                    if (radio == 1) {
                        cy.log('//////// Departure Date /////////')
                        cy.get(x.datepicker_icon).click()
                            .get(x.calendar_next_button).click()

                        cy.get(x.calendar_body).should('have.length.greaterThan', 0)
                            .its('length')
                            .then(cy.log)
                            .then(() => {
                                n = Cypress._.random(0, 25)
                                cy.log(n)
                                cy.get(x.calendar_body).eq(n).click()
                            })
                    }
                    cy.get(x.quote_button).click()
                    cy.wait('@campaign', { timeout: 40000 }).its('response.statusCode').should('eq', 200)
                })
        })
    })

    it('Select Plan', () => {
        cy.Plan()
    })

    it(' Number of Travelers ', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.select_placeholder, { timeout: 50000 }).click({ timeout: 80000 })
                .get(x.select_option).should('have.length.greaterThan', 0)
                .its('length').then(($length) => {
                    cy.log($length)
                    num = Cypress._.random($length - 1)
                    cy.log(num)
                    cy.get(x.select_option).eq(num).click()

                    cy.get(x.companions_button).click()
                })
        })
    })

    it('Personal Details', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.input_name, { timeout: 30000 }).first().type(person.name)
                .get(x.input_last_name).first().type(person.last_name)
                .get(x.input_birth_date).type(dob())
            cy.log('////// Gender /////')
            cy.get(x.select_value).first().click()
                .get(x.select_option).should('have.length.greaterThan', 0)
                .its('length').then(($length) => {
                    cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
                })
            cy.get(x.input_id).type(randomDNI())
            cy.get(x.input_mobile).type(person.phone_1)
                .get(x.input_email).type(person.email)
                .get(x.input_address_1).type(address.line1)
                .get(x.input_address_2).type(address.line1)
                .get(x.input_address_3).type(address_ar.localidad)
                .get(x.input_city).type(address_ar.city)
                .get(x.input_province).type(address_ar.province)
                .get(x.input_zipcode).type(address_ar.zipcode)

            cy.log('////// Travelers =', num, '///////')
            if (num > 0) {
                cy.get('body').then(($body) => {
                    expect($body.find('app-companion-details').is(':visible'))

                    cy.get('app-companion-details')
                        .find(x.input_name).then(els => {
                            [...els].forEach(el => cy.wrap(el).type(person.name))
                        })
                    cy.get('app-companion-details')
                        .find(x.input_last_name).then(els => {
                            [...els].forEach(el => cy.wrap(el).type(person.last_name))
                        })
                    cy.get('app-companion-details')
                        .find(x.input_dateOfBirth).then(els => {
                            [...els].forEach(el => cy.wrap(el).type(dob_1()))
                        })
                })
            }
            cy.wait(1000)
            cy.get(x.forward_button).should('be.enabled').click()

            cy.wait('@validate', { timeout: 40000 })

            cy.wait(1000)
            cy.get('body').then(($body) => {
                if ($body.find('app-applicant-details').is(':visible')) {
                    if ($body.find('mat-error').is(':visible')) {
                        cy.log('///// Bug Found /////')
                        cy.log('////// Changing ID /////')
                        cy.get(x.input_id).type(randomDNI()).wait(1000)
                        cy.get(x.forward_button).should('be.enabled').click()
                        cy.wait('@validate', { timeout: 40000 }).its('response.statusCode').should('eq', 200)
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
            cy.fixture('locators').then((x) => {
                //checking insured details
                cy.get(x.review_items, { timeout: 30000 })
                    .should('contain.text', person.name)
                    .and('contain.text', person.last_name)
                    .and('contain.text', person.phone_1)
                    .and('contain.text', person.email)
                    .and('contain.text', address.line1)
                    .and('contain.text', address.line1)
                    .and('contain.text', address_ar.localidad)
                    .and('contain.text', address_ar.city)
                    .and('contain.text', address_ar.province)
                    .and('contain.text', address_ar.zipcode)
            })
        })
    })

    it(' Payment Page Edit button click', () => {
        cy.Edit_button() //Commands.js
    })

    it('Edit', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.input_address_1, { timeout: 30000 }).clear()
                .type(address.line2)
            cy.get(x.forward_button).should('be.enabled').click()
            cy.wait('@validate', { timeout: 40000 }).its('response.statusCode').should('eq', 200)
            cy.wait('@iframe', { timeout: 40000 }).its('response.statusCode').should('eq', 200)


            cy.get(x.review_items, { timeout: 30000 })
                .should('contain.text', address.line2)
        })
    })

    it('Payment page', () => {
        cy.fixture('locators').then((x) => {
            cy.iframe(x.card_iframe).then($ => {
                cy.wrap($[0])
                    .find(x.input_card)
                    .type(payment.visa_card_num_1)
                    .get(x.input_card_name).type(payment.card_holder)
                    .get(x.input_expiry_date).type(payment.expiration_date_2)
            })
            cy.iframe(x.cvv_iframe).then($iframes => {
                cy.wrap($iframes[0])
                    .find(x.input_cvv)
                    .type(payment.cvv_1)
                    .get(x.checkboxes).check({ force: true }).should('be.checked')
                    .get(x.forward_button).should('be.enabled')

            })
        })

    })

})






