import 'cypress-iframe'
import { dob, dob_1, randomDNI } from '../../../support/utils'
import { person, address, address_ar, payment } from '../../../support/objects_mobile';
import 'cypress-v10-preserve-cookie'

let num = 0
let radio = 0
let n = 0

describe('Travel plataforma10 ARGENTINA (uat)', { testIsolation: false }, () => {
    it(' Visit', () => {
        cy.visit('https://la.studio-uat.chubb.com/ar/plataforma10/travel/launchstage/es-AR')
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
                    cy.get('.loading-indicator__container', { timeout: 40000 }).should(($loading) => {
                        expect($loading).not.to.exist
                    })
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
            cy.wait(2000)
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
            cy.get(x.forward_button, { timeout: 5000 }).should('be.enabled').click()

            cy.wait('@validate', { timeout: 40000 })
            cy.get('.loading-indicator__container', { timeout: 40000 }).should(($loading) => {
                expect($loading).not.to.exist
            })

            cy.wait(1000)
            cy.get('body').then(($body) => {
                if ($body.find('app-applicant-details').is(':visible')) {
                    var counter = 0
                    const repeatID = () => {
                        counter++
                        cy.log(counter)
                        cy.log('///// Duplicate ID /////')
                        cy.log('////// Changing ID /////')
                        cy.get(x.input_id).clear().type(randomDNI())
                        cy.get(x.forward_button).should('be.enabled').click()

                        cy.wait('@validate', { timeout: 40000 })
                        cy.get('.loading-indicator__container', { timeout: 40000 }).should(($loading) => {
                            expect($loading).not.to.exist
                        })
                        if (counter < 3) {
                            cy.wait(1000)
                            cy.url().then(($url) => {
                                if ($url.includes('/payment')) {
                                    cy.log('//// ID Found ////')
                                    counter = 0
                                    return
                                }
                                repeatID()
                            })
                        } else { return }
                    }
                    repeatID()

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

    it('Payment page Checking', () => {
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

    it('Payment page Edit button click', () => {
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
                    .type(payment.visa_card_num_1, { delay: 80 })
                    .get(x.input_card_name).type(payment.card_holder, { delay: 80 })
                    .get(x.input_expiry_date).type(payment.expiration_date_2, { delay: 80 })
            })
            cy.iframe(x.cvv_iframe).then($iframes => {
                cy.wrap($iframes[0])
                    .find(x.input_cvv)
                    .type(payment.cvv_1, { delay: 80 })
                    .get(x.checkboxes).check({ force: true }).should('be.checked')
                    .get(x.forward_button).should('be.enabled')
                    .click()
                cy.wait('@checkout', { timeout: 40000 }).its('response.statusCode').should('eq', 200)
                cy.get('.loading-indicator__container', { timeout: 40000 }).should(($loading) => {
                    expect($loading).not.to.exist
                })
            })
        })
    })

    it('Thankyou', () => {
        cy.url().then(($url) => {
            expect($url).to.contain('/thankyou')
        })
        cy.get('.thank-you__policy-content__code').then(els => {
            [...els]
                .forEach(el =>
                    cy.wrap(el).invoke('text').then(text => {
                        let code = text + '\n'
                        cy.log(code)
                        cy.writeFile('cypress/e2e/Travel/policy_code-Travel.txt', code, { flag: 'a+' })
                    }
                    ))
        })
    })
})






