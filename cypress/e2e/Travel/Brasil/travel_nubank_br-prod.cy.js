import 'cypress-iframe'
import { person, address, address_br, payment } from '../../../support/objects_mobile';
import { dob, randomCPF } from '../../../support/utils'
let num = 0
let n = 0

describe('Travel nubank BRASIL (prod)', () => {
    beforeEach(function () {
        const suite = cy.state('test').parent
        if (suite.tests.some(test => test.state === 'failed')) {
            this.skip()
        }
    })
    it('Visit ', () => {
        cy.visit('https://la.studio.chubb.com/br/nubank/travel/launchstage/pt-BR')
        cy.Not_Found()

    })

    it('Travel Date ', () => {
        cy.fixture('locators').then((x) => {
            // Travel Date
            cy.get(x.button_1).click()
            cy.get(x.datepicker_icon).first().click()
                .get(x.calendar_next_button).click()
            cy.log('//////// Departure Date /////////')
            cy.get(x.calendar_body).should('have.length.greaterThan', 0)
                .its('length')
                .then(cy.log)
                .then(() => {
                    n = Cypress._.random(0, 5)
                    cy.log(n)
                    cy.get(x.calendar_body).eq(n).click()
                })
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
            cy.log('//////// Country /////////')
            cy.get(x.input_country).click()
                .get(x.select_option).should('have.length.greaterThan', 0)
                .its('length').then(($length) => {
                    cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
                })
            cy.log('////  Number of Travelers ////')
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
            cy.Plan()
        })
    })

    it('Captcha', () => {
        cy.Captcha()
    })

    it('Personal Details', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.input_name).first().type(person.name)
                .get(x.input_last_name).first().type(person.last_name)
                .get(x.input_birth_date).type(dob())
                .get(x.input_mobile).type(person.phone_2)
                .get(x.input_email).type(person.email)
                .get(x.input_id).type(randomCPF())
                .get(x.input_zipcode).type(address_br.zipcode)
                .intercept('https://viacep.com.br/ws/22050000/json').as('Location')
                .wait('@Location')
                .get(x.input_address_1).type(address.line1)
                .get(x.input_ext_number).type(address_br.ext_num)
                .get(x.input_address_2).type(address.line1)
                .get(x.input_address_3).type(address_br.barrio)
                .get(x.input_city).type(address_br.city)
                .get(x.input_province).type(address_br.province)

            cy.log('////// Travelers =', num, '///////')
            if (num > 0) {
                cy.get('body').then(($body) => {
                    expect($body.find('app-companions-brasil').is(':visible'))
                    cy.get('app-companions-brasil')
                        .find(x.input_name).then(els => {
                            [...els].forEach(el => cy.wrap(el).type(person.name))
                        })
                    cy.get('app-companions-brasil')
                        .find(x.input_last_name).then(els => {
                            [...els].forEach(el => cy.wrap(el).type(person.last_name))
                        })
                    cy.get('app-companions-brasil')
                        .find(x.input_dateOfBirth).then(els => {
                            [...els].forEach(el => cy.wrap(el).type(dob()))
                        })
                    cy.get('app-companions-brasil')
                        .find(x.input_cpf).then(els => {
                            [...els].forEach(el => cy.wrap(el).type(randomCPF()))
                        })
                })
            }
            cy.wait(1000)
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
                            cy.get(x.input_id).type(randomCPF()).wait(1000)
                            cy.get(x.forward_button).click()
                            cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
                                expect($loading).not.to.exist
                            })
                        }
                        cy.wait(1000)
                        if ($body.find('#application-errors').is(':visible')) {
                            throw new Error('//// ERROR FOUND ////')
                        }
                    })
                }

            })
        })
    })

    it('Pyment page Checking', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.collapsable_bar).click()
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
            cy.get(x.input_address_1).wait(500).type(address.line2)
                .get(x.input_address_3).type(address_br.barrio)
                .get(x.input_city).type(address_br.city)
                .get(x.input_province).type(address_br.province)

            cy.log('////// Travelers =', num, '///////')
            if (num > 0) {
                cy.get('body').then(($body) => {
                    expect($body.find('app-companions-brasil').is(':visible'))

                    cy.get('app-companions-brasil')
                        .find(x.input_name).then(els => {
                            [...els].forEach(el => cy.wrap(el).type(person.name))
                        })
                    cy.get('app-companions-brasil')
                        .find(x.input_last_name).then(els => {
                            [...els].forEach(el => cy.wrap(el).type(person.last_name))
                        })
                    cy.get('app-companions-brasil')
                        .find(x.input_dateOfBirth).then(els => {
                            [...els].forEach(el => cy.wrap(el).type(dob()))
                        })
                    cy.get('app-companions-brasil')
                        .find(x.input_cpf).then(els => {
                            [...els].forEach(el => cy.wrap(el).type(randomCPF()))
                        })
                })
            }
            cy.wait(1000)
            cy.get(x.forward_button).click()

            cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
                expect($loading).not.to.exist
            })
            cy.get(x.collapsable_bar).click()
                .wait(500)
            cy.get(x.review_items)
                .should('contain.text', address.line2)
        })
    })

    it('Payment page', () => {
        cy.fixture('locators').then((x) => {
            cy.iframe(x.card_iframe).then($ => {
                cy.wrap($[0])
                    .find(x.input_card).click()
                    .type(payment.mc_card_num_1)
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





