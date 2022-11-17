import 'cypress-iframe'
import { dob, randomCPF, Random } from '../../../support/utils'
import { person, payment, address, address_br, mobile } from '../../../support/objects_mobile'

describe('Mobile hartb BRASIL (prod)', () => {
    beforeEach(function () {
        const suite = cy.state('test').parent
        if (suite.tests.some(test => test.state === 'failed')) {
            this.skip()
        }
    })
    //Page 1
    it('Visit', () => {
        cy.visit('https://la.studio.chubb.com/br/hartb/mobile/launchstage/pt-BR')
        cy.Not_Found()
    })

    it('Quote', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.button_1).click()
                .get(x.input_imei).type(mobile.tac + Random(1000000, 9999999).toString())
                .get(x.quote_button).click()
            cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
                expect($loading).not.to.exist
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
            cy.log('/////// Gener ///////')
            cy.get(x.select_value).first().click()
                .get(x.select_option).should('have.length.greaterThan', 0)
                .its('length').then($length => {
                    cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
                })
                .get(x.input_mobile).type(person.phone_2)
                .get(x.input_email).type(person.email)
                .get(x.input_id).type(randomCPF())
                .wait(1000)
                .get(x.input_zipcode).type(address_br.zipcode)
                .intercept('https://viacep.com.br/ws/22050000/json').as('Location')
                .wait('@Location')
                .get(x.input_address_1).type(address.line1)
                .get(x.input_ext_number).type(address_br.ext_num)
                .get(x.input_address_2).type(address.line1)
                .get(x.input_address_3).type(address_br.barrio)
                .get(x.input_city).type(address_br.city)
                .get(x.input_province).type(address_br.province)
            cy.get(x.checkboxes).check({ force: true }).should('be.checked')
                .wait(1000)
            cy.get(x.forward_button).should('be.enabled').click()
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
                            cy.get(x.input_id).type(randomCPF()).wait(1000)
                            cy.get(x.forward_button).should('be.enabled').click()
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
            cy.get(x.review_items)
                .should('contain.text', person.name)
                .and('contain.text', person.last_name)
                .and('contain.text', person.phone_2)
                .and('contain.text', person.email)
                .and('contain.text', address_br.zipcode)
                .and('contain.text', address.line1)
                .and('contain.text', address_br.ext_num)
                .and('contain.text', address.line1)
                .and('contain.text', address_br.barrio)
                .and('contain.text', address_br.city)
                .and('contain.text', address_br.province)
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
            cy.get(x.input_address_1).type(address.line2)
                .get(x.input_address_3).type(address_br.barrio)
                .wait(1000)
                .get(x.input_city).type(address_br.city)
                .wait(1000)
                .get(x.input_province).type(address_br.province)
                .wait(1000)
            cy.get(x.checkboxes).check({ force: true }).should('be.checked')
                .wait(1000)
            cy.get(x.forward_button).should('be.enabled').click()
            cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
                expect($loading).not.to.exist
            })
            cy.get(x.review_items)
                .should('contain.text', address.line2)
                .and('contain.text', address.line1)
                .and('contain.text', address_br.barrio)
                .and('contain.text', address_br.city)
                .and('contain.text', address_br.province)
        })
    })

    it('Payment page', () => {
        cy.fixture('locators').then((x) => {
            cy.iframe(x.card_iframe).then($ => {
                cy.wrap($[0])
                    .find(x.input_card).click()
                    .type(payment.visa_card_num_1)
                    .get(x.input_card_name)
                    .type(payment.card_holder)
                    .get(x.input_expiry_date).type(payment.expiration_date)
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







