import 'cypress-iframe'
import { person, address, panama, payment } from '../../../support/objects_mobile';
import { Random, dob, dob_2 } from '../../../support/utils'
let num = 0
let env = 0

describe('Life marsh Panama (prod)', () => {
    beforeEach(function () {
        const suite = cy.state('test').parent
        if (suite.tests.some(test => test.state === 'failed')) {
            this.skip()
        }
    })
    //Page 1
    it('Visit', () => {
        cy.visit('https://la.studio.chubb.com/pa/marsh/life/launchstage/es-PA')
    })

    it('Quote', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.button_1).click()
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

                    cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
                        expect($loading).not.to.exist
                    })
                })
        })
    })

    it('Select Plan', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.plans_select_button).should('have.length.greaterThan', 0)
                .its('length').then(($length) => {
                    cy.get(x.plans_select_button).eq(Cypress._.random($length - 1)).click()
                })
            cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
                expect($loading).not.to.exist
            })
        })

    })

    it('Captcha', () => {
        cy.Captcha()
    })

    it('Personal Details', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.input_name).type(person.name)
                .get(x.input_last_name).type(person.last_name)
            cy.log('////// Gener //////')
            cy.get(x.select_value).first().click()
                .get(x.select_option).should('have.length.greaterThan', 0)
                .its('length').then(($length) => {
                    cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
                })
            cy.get(x.input_id).click().type(Random(1000000000, 1999999999))
                .get(x.input_mobile).type(person.phone_5)
                .get(x.input_email).type(person.email)
                .get(x.input_address_1).type(address.line1)
                .get('[name="nationality"]').type(panama.nationality)
                .get(x.input_company).type(panama.company)
            cy.log('/////// Financial Profile ///////')
            cy.get(x.select_placeholder).first().click()
                .get(x.select_option).should('have.length.greaterThan', 0)
                .its('length').then(($length) => {
                    cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
                })
            cy.get('[name="countryIncomeTaxed"]').type(panama.place_of_income)

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
                                    .find(x.input_dobFormControl).then(els => {
                                        [...els].forEach(el => cy.wrap(el).type(dob()))
                                    })
                            })
                        }
                    })
            }
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
                            cy.get(x.input_id).type(Random(1000000000, 1999999999)).wait(1000)
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
                .and('contain.text', person.phone_5)
                .and('contain.text', person.email)
                .and('contain.text', address.line1)
                .and('contain.text', panama.nationality)
                .and('contain.text', panama.company)
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
                        .get(x.select_option).click()
                        .get(x.input_dobFormControl).last().type(dob_2())
                })
            }

            cy.wait(1000)
            cy.get(x.forward_button).should('be.enabled').click()
            cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
                expect($loading).not.to.exist
            })
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
                    .type(payment.visa_card_num_2)
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






