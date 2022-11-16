import 'cypress-iframe'
import { Random, dob } from '../../../support/utils'
import { person, payment, address, address_ec } from '../../../support/objects_mobile'

describe('Residential diners EC (prod)', () => {
    beforeEach(function () {
        const suite = cy.state('test').parent
        if (suite.tests.some(test => test.state === 'failed')) {
            this.skip()
        }
    })
    //Page 1
    it('Visit', () => {
        cy.visit('https://la.studio.chubb.com/ec/diners/residential/launchstage/es-EC')
        cy.Not_Found()

    })

    it('Quote', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.button_1).click()
                .wait(500)
            cy.log('////// Radio Group //////')
            cy.get(x.radio_group)
                .find(x.check_outer_circle).should('have.length.greaterThan', 0)
                .its('length').then(($length) => {
                    cy.get(x.check_outer_circle).eq(Cypress._.random($length - 1)).click({ force: true })
                        .get(x.quote_button).click()

                    cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
                        expect($loading).not.to.exist
                    })
                })
        })
    })

    it('Select Plan', () => {
        cy.Plan()
    })

    it('Captcha', () => {
        cy.Captcha()
    })

    it('Personal Details ', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.input_name).type(person.name)
                .get(x.input_last_name).type(person.last_name)
                .get(x.input_birth_date).type(dob())
            cy.log('////// Gender /////')
            cy.get(x.select_value).click()
                .get(x.select_option).should('have.length.greaterThan', 0)
                .its('length').then(($length) => {
                    cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
                })
                .get(x.input_id).type(Random(1000000000, 1999999999))//1953064165 
                .get(x.input_mobile).type(person.phone)
                .get(x.input_email).type(person.email)
                .get(x.input_address_1).type(address.line1)
                .get(x.input_city).type(address_ec.city)
                .get(x.input_province).type(address_ec.province)
                .get(x.forward_button).click()
            cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
                expect($loading).not.to.exist
            })
            cy.wait(1000)
            cy.get('body').then(($body) => {
                if ($body.find('app-applicant-details').is(':visible')) {
                    cy.get('app-applicant-details').then(($form) => {
                        if ($form.find('mat-error').is(':visible')) {
                            cy.log('///// Bug Found /////')
                            cy.log('////// Changing ID /////')
                            cy.get(x.input_id).type(Random(1000000000, 1999999999)).wait(1000)
                            cy.get(x.forward_button).click()
                            cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
                                expect($loading).not.to.exist
                            })
                        }
                        cy.wait(1000)
                        if ($body.find('#application-errors').is(':visible')) {
                            cy.log('//// ERROR FOUND ////')
                        }
                    })
                }

            })
        })

    })

    it('Pyment page Checking', () => {
        cy.fixture('locators').then((x) => {
            //checking insured details
            cy.get(x.review_items)
                .should('contain.text', person.name)
                .and('contain.text', person.last_name)
                .and('contain.text', person.phone)
                .and('contain.text', person.email)
                .and('contain.text', address.line1)
                .and('contain.text', address_ec.city)
                .and('contain.text', address_ec.province)

        })
    })

    it(' Payment Page Edit button click', () => {
        cy.Edit_button() //Commands.js
    })

    it('Captcha', () => {
        cy.Captcha()
    })

    it('Edit', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.input_address_1).clear()
                .type(address.line2)
                .get(x.forward_button).click()
            cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
                expect($loading).not.to.exist
            })
            cy.get(x.review_items)
                .should('contain.text', address.line2)

        })
    })

    it('Payment page', () => {
        cy.fixture('locators').then((x) => {
            cy.iframe(x.card_iframe).then($iframes => {
                cy.wrap($iframes[0])
                    .find(x.input_card)
                    .first().click()
                    .type(payment.dinersClub_card_num)
                    .get(x.input_card_name).type(payment.card_holder)
                    .get(x.input_expiry_date).click()
                    .type(payment.expiration_date)

                    .get(x.checkboxes).check({ force: true }).should('be.checked')
                    .get(x.forward_button).should('be.enabled')
            })

        })


    })
})





