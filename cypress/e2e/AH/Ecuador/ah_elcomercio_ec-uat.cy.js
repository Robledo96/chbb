import 'cypress-iframe'
import { Random, dob } from '../../../support/utils'
import { person, payment, address, address_ec } from '../../../support/objects_mobile'

describe('AH elcomercio ECUADOR (uat)', { testIsolation: false }, () => {
    //Page 1
    it('Visit', () => {
        cy.visit('https://la.studio-uat.chubb.com/ec/elcomercio/ah/launchstage/es-EC')
        //

    })

    it('Quote', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.quote_button, { timeout: 30000 }).click()
            cy.wait('@campaign', { timeout: 40000 }).its('response.statusCode').should('eq', 200)
        })
    })

    it('Select Plan', () => {
        cy.Plan()
    })

    it('Personal Details ', () => {
        cy.fixture('locators').then((x) => {
            cy.log('///// Personal Details //////')
            cy.get(x.input_name, { timeout: 30000 }).type(person.name)
                .get(x.input_last_name).type(person.last_name)
                .get(x.input_birth_date).type(dob())
            cy.log('/////// Gener //////')
            cy.get(x.select_value).click()
                .get(x.select_option).should('have.length.greaterThan', 0)
                .its('length').then(($length) => {
                    cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
                })
                .get(x.input_id).type(Random(1000000000, 1999999999))
                .get(x.input_mobile).type(person.phone_1)
                .get(x.input_email).type(person.email)
                .get(x.input_city).type(address_ec.city)
                .get(x.input_province).type(address_ec.province)
                .get(x.input_address_1).type(address.line1)
            cy.get(x.forward_button).should('be.enabled').click()

            cy.wait('@validate', { timeout: 40000 })

            cy.wait(1000)
            cy.get('body').then(($body) => {
                if ($body.find('app-applicant-details').is(':visible')) {
                    if ($body.find('mat-error').is(':visible')) {
                        cy.log('///// Bug Found /////')
                        cy.log('////// Changing ID /////')
                            .get(x.input_id).type(Random(1000000000, 1999999999)).wait(1000)
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
            cy.get(x.review_items, { timeout: 30000 })
                .should('contain.text', person.name)
                .and('contain.text', person.last_name)
                .and('contain.text', person.phone_1)
                .and('contain.text', person.email)
                .and('contain.text', address.line1)
                .and('contain.text', address_ec.city)
                .and('contain.text', address_ec.province)
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
                    .find(x.input_card, { timeout: 10000 }).click()
                    .type(payment.visa_card_num, { delay: 80 })
                    .get(x.input_card_name).click().type(payment.card_holder, { delay: 80 })
                    .get(x.input_expiry_date).click().type(payment.expiration_date_1, { delay: 80 })
            })
            cy.iframe(x.cvv_iframe).then($iframes => {
                cy.wrap($iframes[0])
                    .find(x.input_cvv).click()
                    .type(payment.cvv, { delay: 80 })
                    .get(x.checkboxes).check({ force: true }).should('be.checked')
                cy.get(x.forward_button).should('be.enabled')

            })
        })
    })
})





