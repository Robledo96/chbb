import 'cypress-iframe'
import { dob, randomRFC } from '../../../support/utils'
import { person, payment, address, address_mx, } from '../../../support/objects_mobile'

describe('Life betterfly MEXICO (uat)', { testIsolation: false }, () => {
   //
    //Page 1
    it('Visit', () => {
        cy.visit('https://la.studio-sit.chubb.com/mx/betterfly/life/launchstage/es-MX')
        cy.wait(2000)
        cy.url().then(($url) => {
            if ($url.includes('https://la.studio.chubb.com/404')) {
                throw new Error('//// PAGE NOT FOUND ////')
            }
        })
    })

    it('Quote', () => {
        cy.fixture('locators').then((x) => {
            cy.log('//////// Date of Birth /////////')
            cy.get('input', { timeout: 10000 }).click()
                .type(dob())
            cy.get(x.quote_button).click()
            cy.wait('@campaign', { timeout: 40000 }).its('response.statusCode').should('eq', 200)
            cy.get('.loading-indicator__container', { timeout: 40000 }).should(($loading) => {
                expect($loading).not.to.exist
            })
        })
    })

    it('Select Plan', () => {
        cy.Plan()
    })

    it('Personal Details', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.input_name, { timeout: 30000 }).type(person.name)
                .get(x.input_last_name).type(person.last_name)
                .get(x.input_id).click().type(randomRFC()).wait(500)//'ANML891018J47'
            cy.get(x.select_value_1).click()
                .get(x.select_option).should('have.length.greaterThan', 0)
                .its('length').then(($length) => {
                    cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
                })
            cy.get(x.input_mobile).type(person.phone_1)
                .get(x.input_email).type(person.email)
                .get(x.input_zipcode).type(address_mx.zipcode)

            cy.wait('@getLocation', { timeout: 90000 }).its('response.statusCode').should('eq', 200)

            cy.wait(1000)
            cy.log('/////// Select /////')
            cy.get(x.input_colonia).click()
                .get(x.colonia_option_text, { timeout: 90000 }).eq(0).click({ force: true })

                .get(x.input_address_1).type(address.line1)
            cy.get(x.checkboxes).check({ force: true }).should('be.checked')
                .wait(1000)
            cy.get(x.forward_button).should('be.enabled').click()

            cy.wait('@validate', { timeout: 40000 })
            cy.get('.loading-indicator__container', { timeout: 40000 }).should(($loading) => {
                expect($loading).not.to.exist
            })

            cy.wait(1000)
            cy.get('body').then(($body) => {
                if ($body.find('app-applicant-details').is(':visible')) {
                    if ($body.find('mat-error').is(':visible')) {
                        var counter = 0
                        const repeatID = () => {
                            counter++
                            cy.log(counter)
                            cy.log('///// Duplicate ID /////')
                            cy.log('////// Changing ID /////')
                            cy.get(x.input_id).clear().type(randomRFC()).wait(1000)
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
                }
            })
            cy.wait(1000)
            cy.get('body').then(($body) => {
                if ($body.find('app-applicant-details').is(':visible')) {
                    throw new Error('//// ERROR FOUND ////')
                }
            })
        })
        cy.wait('@iframe', { timeout: 40000 }).its('response.statusCode', { timeout: 20000 }).should('eq', 200)

    })

    it('Payment page Checking', () => {
        cy.fixture('locators').then((x) => {
            //checking insured details
            cy.get(x.review_items, { timeout: 30000 })
                .should('contain.text', person.name)
                .and('contain.text', person.last_name)
                .and('contain.text', person.phone_1)
                .and('contain.text', person.email)
                .and('contain.text', address_mx.zipcode)
                .and('contain.text', address_mx.colonia)
                .and('contain.text', address.line1)
        })
    })

    // it('Payment page Edit button click', () => {
    //     cy.Edit_button() //Commands.js
    //     cy.wait('@getLocation', { timeout: 60000 }).its('response.statusCode').should('eq', 200)
    // })

    // it('Edit', () => {
    //     cy.fixture('locators').then((x) => {
    //         cy.get(x.input_colonia, { timeout: 30000 }).click({ force: true })
    //             .wait(1000)
    //             .get(x.colonia_option_text).first().click({ force: true })
    //             .wait(1000)
    //         cy.get(x.input_address_1).clear()
    //             .type(address.line2)
    //         cy.get(x.checkboxes).check({ force: true }).should('be.checked')
    //         cy.get(x.forward_button).should('be.enabled').click()

    //         cy.wait('@validate', { timeout: 40000 }).its('response.statusCode').should('eq', 200)
    //         cy.wait('@iframe', { timeout: 40000 }).its('response.statusCode').should('eq', 200)

    //         cy.get(x.review_items, { timeout: 350000 })
    //             .should('contain.text', address.line2)
    //     })
    // })

    it('Payment page', () => {
        cy.fixture('locators').then((x) => {
            cy.log('////// Radio Group - 1 /////')
            cy.get(x.radio_group)
                .find(x.check_outer_circle).should('have.length.greaterThan', 0)
                .its('length').then(($length) => {
                    cy.get(x.check_outer_circle).eq(Cypress._.random($length - 1)).click({ force: true })
                })

            cy.iframe(x.card_iframe).then($ => {
                cy.wrap($[0])
                    .find(x.input_card).click()
                    .type(payment.visa_card_num_1, { delay: 100 })
                    .get(x.input_card_name).type(payment.card_holder, { delay: 100 })
                    .get(x.input_expiry_date).type(payment.expiration_date_2, { delay: 100 })
            })
            cy.iframe(x.cvv_iframe).then($iframes => {
                cy.wrap($iframes[0])
                    .find(x.input_cvv).click()
                    .type(payment.cvv_1, { delay: 100 })
                cy.get(x.checkboxes).check({ force: true }).should('be.checked')
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

        cy.get('.thank-you__policy-content__code').invoke('text').then(text => {
            let code = text + '\n'
            cy.writeFile('cypress/e2e/Life/policy_code-Life.txt', code, { flag: 'a+' })
        })
    })
})
