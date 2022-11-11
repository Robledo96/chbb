import 'cypress-iframe'
import { dob, dob_1, randomDNI } from '../../../support/utils'

import { person, address, address_ar } from '../../../support/objects_mobile';
let num = 0

describe('Travel plataforma10 ARGENTINA (prod)', () => {
    beforeEach(function () {
        const suite = cy.state('test').parent
        if (suite.tests.some(test => test.state === 'failed')) {
            this.skip()
        }
    })
    //Page 1
    it(' Visit', () => {
        cy.visit('https://la.studio.chubb.com/ar/plataforma10/travel/launchstage/es-AR')
    })

    it('Travel Date ', () => {
        cy.Date_travel_ar()
    })

    it('Select Plan', () => {
        cy.Plan_travel_ar()
    })

    it(' Number of Travelers ', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.select_placeholder).click()
                .get(x.select_option).should('have.length.greaterThan', 0)
                .its('length').then(($length) => {
                    cy.log($length)
                    num = Cypress._.random($length - 1)
                    cy.log(num)
                    cy.get(x.select_option).eq(num).click()

                    cy.get(x.companions_button).click()

                    cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
                        expect($loading).not.to.exist
                    })
                })
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
            cy.get(x.forward_button).click()

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
                            cy.get(x.input_id).type(randomDNI()).wait(1000)
                            cy.get(x.forward_button).click()
                            cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
                                expect($loading).not.to.exist
                            })
                        }
                        cy.wait(1000)
                        if ($body.find('#application-errors').is(':visible')) {
                            cy.log('//// UNRECOGNIZED ERROR FOUND ////')
                        }
                    })
                }

            })
        })
    })

    it('Pyment page Checking', () => {

        cy.Checking_travel_ar()
    })

    it(' Payment Page Edit button click', () => {
        cy.Edit_button() //Commands.js
    })


    it('Captcha', () => {
        cy.Captcha()
    })

    it('Edit', () => {
        cy.Edit_travel_ar()
    })

    it('Payment page', () => {
        cy.Payment_travel_ar()

    })

})






