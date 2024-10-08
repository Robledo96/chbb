import 'cypress-iframe'
import { person, address, address_br, payment } from '../../../support/objects_mobile';
import { dob, randomCPF } from '../../../support/utils'

let num = 0
let n = 0

describe('Travel nubank BRASIL (uat)', { testIsolation: false }, () => {
   //
    it('Visit ', () => {
        cy.visit('https://la.studio-uat.chubb.com/br/nubank/travel/launchstage/pt-BR')
        cy.wait(2000)
        cy.url().then(($url) => {
            if ($url.includes('https://la.studio.chubb.com/404')) {
                throw new Error('//// PAGE NOT FOUND ////')
            }
        })
    })

    it('Travel Date ', () => {
        cy.fixture('locators').then((x) => {
            // Travel Date
            cy.get(x.button_1, { timeout: 30000 }).click()
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
            cy.wait(1000)
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
                    cy.wait('@travel', { timeout: 40000 }).its('response.statusCode').should('eq', 200)
                    cy.get('.loading-indicator__container', { timeout: 40000 }).should(($loading) => {
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

    it('Personal Details', () => {
        cy.fixture('locators').then((x) => {
            cy.wait(2000)
            cy.get(x.input_name, { timeout: 30000 }).first().type(person.name)
                .get(x.input_last_name).first().type(person.last_name)
                .get(x.input_birth_date).type(dob())
                .get(x.input_mobile).type(person.phone_2)
                .get(x.input_email).type(person.email)
                .get(x.input_id).type(randomCPF())
                .get(x.input_zipcode).type(address_br.zipcode)
            cy.wait('@getLocat_Brasil_1', { timeout: 90000 }).its('response.statusCode').should('eq', 200)

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
                        cy.get(x.input_id).clear().type(randomCPF())
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
        cy.wait('@iframe', { timeout: 40000 }).its('response.statusCode').should('eq', 200)
    })

    it('Payment page Checking', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.collapsable_bar, { timeout: 30000 }).click()
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

    // it('Payment page Edit button click', () => {
    //     cy.Edit_button() //Commands.js
    //     cy.wait('@getLocat_Brasil_1', { timeout: 90000 }).its('response.statusCode').should('eq', 200)
    // })

    // it('Edit', () => {
    //     cy.fixture('locators').then((x) => {
    //         cy.get(x.input_address_1, { timeout: 30000 }).wait(500).type(address.line2)
    //             .get(x.input_address_3).type(address_br.barrio)
    //             .get(x.input_city).type(address_br.city)
    //             .get(x.input_province).type(address_br.province)

    //         cy.log('////// Travelers =', num, '///////')
    //         if (num > 0) {
    //             cy.get('body').then(($body) => {
    //                 expect($body.find('app-companions-brasil').is(':visible'))

    //                 cy.get('app-companions-brasil')
    //                     .find(x.input_name).then(els => {
    //                         [...els].forEach(el => cy.wrap(el).type(person.name))
    //                     })
    //                 cy.get('app-companions-brasil')
    //                     .find(x.input_last_name).then(els => {
    //                         [...els].forEach(el => cy.wrap(el).type(person.last_name))
    //                     })
    //                 cy.get('app-companions-brasil')
    //                     .find(x.input_dateOfBirth).then(els => {
    //                         [...els].forEach(el => cy.wrap(el).type(dob()))
    //                     })
    //                 cy.get('app-companions-brasil')
    //                     .find(x.input_cpf).then(els => {
    //                         [...els].forEach(el => cy.wrap(el).type(randomCPF()))
    //                     })
    //             })
    //         }
    //         cy.wait(1000)
    //         cy.get(x.forward_button).should('be.enabled').click()
    //         cy.wait('@validate', { timeout: 60000 }).its('response.statusCode').should('eq', 200)
    //         cy.wait('@iframe', { timeout: 40000 }).its('response.statusCode').should('eq', 200)

    //         cy.get(x.collapsable_bar, { timeout: 30000 }).click()
    //             .wait(500)
    //         cy.get(x.review_items)
    //             .should('contain.text', address.line2)
    //     })
    // })

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
                    .click()
                cy.wait('@sales', { timeout: 40000 }).its('response.statusCode').should('eq', 200)
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





