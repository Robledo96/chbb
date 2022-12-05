import 'cypress-iframe'
import { person, address, address_pr, payment } from '../../../support/objects_mobile';
import { dob_1 } from '../../../support/utils'
let num = 0
let n = 0

describe('Travel travelgallery PUERTO RICO (prod)', () => {
    //Page 1
    it('Visit', () => {
        cy.visit('https://la.studio.chubb.com/pr/travelgallery/travel/launchstage/es-PR')
        cy.Not_Found()

    })

    it('Travel Date ', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.button_1, { timeout: 30000 }).click()
                .wait(500)
            cy.log('//////// Departure Date /////////')
            cy.get(x.datepicker_icon).first().click()
                .get(x.calendar_next_button).click()
                .get(x.calendar_body).should('have.length.greaterThan', 0)
                .its('length')
                .then(cy.log)
                .then(() => {
                    n = Cypress._.random(0, 5)
                    cy.log(n)
                    cy.get(x.calendar_body).eq(n).click()
                })
            cy.wait(1000)
            cy.log('//////// Arrival Date /////////')
            cy.get(x.datepicker_icon).last().click()
                .get(x.calendar_body).should('have.length.greaterThan', 0)
                .its('length')
                .then(cy.log)
                .then(() => {
                    n = Cypress._.random(10, 15)
                    cy.log(n)
                    cy.get(x.calendar_body).eq(n).click()
                })
            cy.log('//////// Country /////////')
            cy.get(x.input_country).click()
                .get(x.select_option).should('have.length.greaterThan', 0)
                .its('length').then(($length) => {
                    cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
                })
            cy.get(x.quote_button).click()
            cy.wait('@campaign', { timeout: 40000 }).its('response.statusCode').should('eq', 200)
        })
    })

    it(' Number of Travelers ', () => {
        cy.fixture('locators').then((x) => {
            cy.get('mat-select', { timeout: 80000 }).click({ timeout: 80000 })
                .get(x.select_option).should('have.length.greaterThan', 0)
                .its('length').then(($length) => {
                    cy.log($length)
                    num = Cypress._.random($length - 1)
                    cy.log(num)
                    cy.get(x.select_option).eq(num).click()

                    cy.wait(500)

                    cy.get('input').then(els => {
                        [...els].forEach(el => cy.wrap(el).type(dob_1()));
                    })
                    cy.get(x.companions_button).click()

                })
        })
    })

    it('Select Plan', () => {
        cy.Plan()
        cy.wait('@recaptcha_1', { timeout: 10000 })
        cy.Captcha()
    })

    it('Personal Details', () => {
        cy.fixture('locators').then((x) => {

            cy.wait(1000)
            cy.get(x.input_name, { timeout: 30000 }).first().type(person.name)
                .get(x.input_last_name).first().type(person.last_name)
            cy.log('////// Gender /////')
                .get(x.select_value).first().click()
                .get(x.select_option).should('have.length.greaterThan', 0)
                .its('length').then(($length) => {
                    cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
                })
                .get(x.input_mobile).type(person.phone_1)
                .get(x.input_email).type(person.email)
                .get(x.input_address_1).type(address.line1)
                .get(x.input_city).type(address_pr.city)
                .get(x.input_zipcode).type(address_pr.zipcode)

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
                })
            }
            cy.wait(1000)
            cy.get(x.forward_button).should('be.enabled').click()

            cy.wait('@validate', { timeout: 40000 }).its('response.statusCode').should('eq', 200)
            cy.wait(1000)
            cy.get('body').then(($body) => {
                if ($body.find('app-applicant-details').is(':visible')) {
                    throw new Error('//// ERROR FOUND ////')
                }
            })

        })
    })


    it('Pyment page - Checking personal details information', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.collapsable_bar, { timeout: 30000 }).click()
            cy.get(x.review_items)
                .should('contain.text', person.name)
                .and('contain.text', person.last_name)
                .and('contain.text', person.phone_1)
                .and('contain.text', person.email)
                .and('contain.text', address.line1)
                .and('contain.text', address_pr.city)
                .and('contain.text', address_pr.zipcode)
        })
    })

    it(' Payment Page Edit button click', () => {
        cy.Edit_button() //Commands.js
        cy.wait('@recaptcha_1', { timeout: 10000 })
        cy.Captcha()
    })

    it('Edit', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.input_address_1, { timeout: 30000 }).clear()
                .type(address.line2)
            cy.get(x.forward_button).should('be.enabled').click()
            cy.wait('@validate', { timeout: 40000 }).its('response.statusCode').should('eq', 200)
            cy.wait('@iframe', { timeout: 40000 }).its('response.statusCode').should('eq', 200)

            cy.get(x.collapsable_bar, { timeout: 30000 }).click()
            cy.get(x.review_items)
                .should('contain.text', address.line2)
        })
    })

    it('Payment page', () => {
        cy.fixture('locators').then((x) => {
            cy.wait(1000)
            cy.iframe(x.card_iframe).then($ => {
                cy.wrap($[0])
                    .find(x.input_card).click()
                    .type(payment.visa_card_num_1, { timeout: 5000 })
                    .get(x.input_card_name).type(payment.card_holder)
                    .get(x.input_expiry_date).type(payment.expiration_date)
            })
            cy.iframe(x.cvv_iframe).then($iframes => {
                cy.wrap($iframes[0])
                    .find(x.input_cvv).click()
                    .type(payment.cvv_1)
                    .get(x.checkboxes).check({ force: true }).should('be.checked')
                    .get(x.forward_button).should('be.enabled')

            })

        })

    })


})






