
import 'cypress-iframe'
import { Random, dob, randomRUT } from '../../../support/utils'
import { person, payment, mobile, address } from '../../../support/objects_mobile'


describe('Mobile automovilclub CHILE (prod)', { testIsolation: false }, () => {
    //Page 1
    it('Visit', () => {
        cy.visit('https://la.studio.chubb.com/cl/automovilclub/mobile/launchstage/es-CL')
        cy.Not_Found()
    })

    it('Quote', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.button_1, { timeout: 30000 }).click()
                .get(x.input_imei).type(mobile.tac + Random(1000000, 9999999).toString())
                .get(x.quote_button).click()
            cy.wait('@mobile', { timeout: 40000 }).its('response.statusCode').should('eq', 200)

        })
    })

    it('Select Plan', () => {
        cy.Plan()
        //
        cy.Captcha()
    })

    it('Personal Details ', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.input_name, { timeout: 30000 }).type(person.name)
                .get(x.input_last_name).type(person.last_name)
                .get(x.input_birth_date).type(dob())
            cy.log('/////// Gener ///////')
            cy.get(x.select_value).first().click()
                .get(x.select_option).should('have.length.greaterThan', 0)
                .its('length').then($length => {
                    cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
                })
            cy.get(x.input_id).type(randomRUT())
            cy.get(x.input_mobile).type(person.phone_4)
                .get(x.input_email).type(person.email)
                .get(x.input_address_1).type(address.line1)
            cy.get(x.select_value).last().click()
                .get(x.select_option).should('have.length.greaterThan', 0)
                .its('length').then($length => {
                    cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
                })
                .wait(1000)
            cy.get(x.forward_button).should('be.enabled').click()

            cy.wait('@validate', { timeout: 40000 })

            cy.wait(1000)
            cy.get('body').then(($body) => {
                if ($body.find('app-applicant-details').is(':visible')) {
                    if ($body.find('mat-error').is(':visible')) {
                        cy.log('///// Bug Found /////')
                        cy.log('////// Changing ID /////')
                        cy.get(x.input_id).type(randomRUT()).wait(1000)
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
            cy.get(x.collapsable_bar, { timeout: 30000 }).click()
            cy.get(x.review_items)
                .should('contain.text', person.name)
                .and('contain.text', person.last_name)
                .and('contain.text', person.phone_4)
                .and('contain.text', person.email)
                .and('contain.text', address.line1)
        })
    })

    it(' Payment Page Edit button click', () => {
        cy.Edit_button() //Commands.js
        //
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
            cy.iframe(x.card_iframe).then($ => {
                cy.wrap($[0])
                    .find(x.input_card).click()
                    .type(payment.visa_card_num_1, { delay: 50 })
                    .get(x.input_card_name).type(payment.card_holder)
                    .get(x.input_expiry_date).type(payment.expiration_date_2, { delay: 60 })
            })
            cy.iframe(x.cvv_iframe).then($iframes => {
                cy.wrap($iframes[0])
                    .find(x.input_cvv).click()
                    .type(payment.cvv_1, { delay: 60 })
                    .get(x.checkboxes).check({ force: true }).should('be.checked')
                    .get(x.forward_button).should('be.enabled')
            })
        })

    })
})







