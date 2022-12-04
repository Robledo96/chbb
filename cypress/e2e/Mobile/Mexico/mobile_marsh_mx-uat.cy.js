
import 'cypress-iframe'
import { Random, dob, randomRFC } from '../../../support/utils'
import { person, payment, mobile, address, address_mx } from '../../../support/objects_mobile'



describe('Mobile marsh MEXICO (uat)', () => {
    //Page 1
    it('Visit', () => {
        cy.visit('https://la.studio-uat.chubb.com/mx/marsh/mobile/launchstage/es-MX')
        cy.Not_Found()
    })

    it('Quote', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.button_1, { timeout: 30000 }).click()
                .get(x.input_imei).type(mobile.tac + Random(1000000, 9999999).toString())
                .get(x.quote_button).click()
        })
    })

    it('Select Plan', () => {
        cy.Plan()
    })

    it('Personal Details ', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.input_name, { timeout: 30000 }).type(person.name)
                .get(x.input_last_name).type(person.last_name)
                .get(x.input_birth_date).type(dob())
                .get(x.input_id).type(randomRFC())//'ANML891018J47' 
            cy.get(x.select_value_1).click()
                .get(x.select_option).should('have.length.greaterThan', 0)
                .its('length').then($length => {
                    cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
                })
            cy.get(x.input_mobile).type(person.phone_1)
                .get(x.input_email).type(person.email)
                .get(x.input_zipcode).type(address_mx.zipcode)

            cy.wait('@getLocation', { timeout: 60000 }).its('response.statusCode').should('eq', 200)

                .get(x.input_colonia).type(address_mx.colonia)
                .get(x.input_address_1).type(address.line1)
            cy.get(x.input_company).type('América Móvil')
                .wait(1000)
            cy.get(x.forward_button).should('be.enabled').click()
            cy.wait('@validate', { timeout: 40000 })

            cy.wait(1000)
            cy.get('body').then(($body) => {
                if ($body.find('app-applicant-details').is(':visible')) {
                    if ($body.find('mat-error').is(':visible')) {
                        cy.log('///// Bug Found /////')
                        cy.log('////// Changing ID /////')
                            .get(x.input_birth_date).clear().type(dob())
                        cy.get(x.input_id).type(randomRFC()).wait(1000)
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

    it('Pyment page Checking', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.collapsable_bar, { timeout: 30000 }).click()
            cy.get(x.review_items)
                .should('contain.text', person.name)
                .and('contain.text', person.last_name)
                .and('contain.text', person.phone_1)
                .and('contain.text', person.email)
                .and('contain.text', address_mx.zipcode)
                .and('contain.text', address_mx.colonia)
                .and('contain.text', address.line1)
        })
    })

    it(' Payment Page Edit button click', () => {
        cy.Edit_button() //Commands.js
        cy.wait('@getLocation', { timeout: 60000 }).its('response.statusCode').should('eq', 200)
    })

    it('Edit', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.input_colonia, { timeout: 30000 }).click({ force: true })
                .wait(1000)
                .get(x.colonia_option_text).first().click({ force: true })
                .wait(1000)
            cy.get(x.input_address_1).clear()
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
            cy.log('/////// Radio Group - 1 ///////')
            cy.get(x.radio_group)
                .find(x.check_outer_circle).should('have.length.greaterThan', 0)
                .its('length').then($length => {
                    cy.get(x.check_outer_circle).eq(Cypress._.random($length - 1)).click({ force: true })
                })

            cy.iframe(x.card_iframe).then($ => {
                cy.wrap($[0])
                    .find(x.input_card).click()
                    .type(payment.visa_card_num_1)
                    .get(x.input_card_name).type(payment.card_holder)
                    .get(x.input_expiry_date).type(payment.expiration_date_2)
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







