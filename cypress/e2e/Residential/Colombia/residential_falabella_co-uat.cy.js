import 'cypress-iframe'
import { Random, dob, } from '../../../support/utils'
import { person, payment, address, address_co } from '../../../support/objects_mobile'
let date = dob()


describe('Residential falabella COLOMBIA (uat)', { testIsolation: false }, () => {
    //
    //Page 1
    it('Visit', () => {
        cy.visit('https://la.studio-uat.chubb.com/co/falabella/residential/launchstage/es-CO')
        cy.wait(2000)
        cy.url().then(($url) => {
            if ($url.includes('https://la.studio.chubb.com/404')) {
                throw new Error('//// PAGE NOT FOUND ////')
            }
        })
    })

    it('Quote', () => {
        cy.fixture('locators').then((x) => {
            cy.log('////// Radio Group //////')
            cy.get(x.radio_group, { timeout: 30000 })
                .find(x.check_outer_circle).should('have.length.greaterThan', 0)
                .its('length').then(($length) => {
                    cy.get(x.check_outer_circle).eq(Cypress._.random($length - 1)).click({ force: true })
                        .get(x.quote_button).click()
                })
        })
        cy.wait('@campaign', { timeout: 40000 }).its('response.statusCode').should('eq', 200)
        cy.get('.loading-indicator__container', { timeout: 40000 }).should(($loading) => {
            expect($loading).not.to.exist
        })
    })

    it('Select Plan', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.plans_select_button, { timeout: 30000 }).should('have.length.greaterThan', 0)
                .its('length').then(($length) => {
                    cy.get(x.plans_select_button).eq(Cypress._.random($length - 1)).click()
                })
        })
    })

    it('Personal Details ', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.input_name, { timeout: 30000 }).type(person.name)
                .get(x.input_last_name).type(person.last_name)
                .get(x.input_birth_date).first().type(date)
            cy.log('////// Gener //////')
            cy.get(x.select_value).first().click()
                .get(x.select_option).should('have.length.greaterThan', 0)
                .its('length').then(($length) => {
                    cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
                })
                .get(x.input_id).type(Random(1000000000, 1999999999))
                .get(x.input_birth_date).eq(1).type(date)
                .get(x.input_mobile).type(person.phone_3)
                .get(x.input_email).type(person.email)
                .get(x.input_address_1).type(address.line1)
                .get(x.input_address_2).type(address_co.floor)
                .get(x.input_province).type(address_co.department)
                .get(x.input_city).type(address_co.city)
            cy.log('////// Question //////')
            cy.get(x.select_value).eq(1).click()
                .wait(1000)
                .get(x.select_option).should('have.length.greaterThan', 0)
                .its('length').then(($length) => {
                    cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
                })
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
                            cy.get(x.input_id).clear().type(Random(1000000000, 1999999999), { delay: 80 })
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
        cy.wait('@iframe', { timeout: 40000 }).its('response.statusCode').should('eq', 200)

    })

    it('Payment page Checking', () => {
        cy.fixture('locators').then((x) => {
            //checking insured details
            cy.get(x.collapsable_bar, { timeout: 30000 }).click()
            cy.get(x.review_items)
                .should('contain.text', person.name)
                .and('contain.text', person.last_name)
                .and('contain.text', person.phone_3)
                .and('contain.text', person.email)
                .and('contain.text', address.line1)
                .and('contain.text', address_co.floor)
                .and('contain.text', address_co.department)
                .and('contain.text', address_co.city)
        })
    })

    // it('Payment page Edit button click', () => {
    //     cy.Edit_button() //Commands.js
    // })

    // it('Edit', () => {
    //     cy.fixture('locators').then((x) => {
    //         cy.get(x.input_address_1, { timeout: 30000 }).clear()
    //             .type(address.line2)
    //         cy.get(x.forward_button).should('be.enabled').click()
    //         cy.wait('@validate', { timeout: 40000 }).its('response.statusCode').should('eq', 200)
    //         cy.wait('@iframe', { timeout: 40000 }).its('response.statusCode').should('eq', 200)

    //         cy.get(x.collapsable_bar, { timeout: 30000 }).click()
    //         cy.get(x.review_items)
    //             .should('contain.text', address.line2)
    //     })
    // })

    it('Payment page', () => {
        cy.fixture('locators').then((x) => {
            cy.iframe(x.card_iframe).then($ => {
                cy.wrap($[0])
                    .find(x.input_card).click()
                    .type(payment.amex_card_num)
                    .get(x.input_card_name).type(payment.card_holder)
                    .get(x.input_expiry_date).type(payment.expiration_date)
            })
            cy.iframe(x.cvv_iframe).then($iframes => {
                cy.wrap($iframes[0])
                    .find(x.input_cvv).click()
                    .type(payment.cvv_2)
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

        cy.get('.thank-you__policy-content__code').invoke('text').then(text => {
            let code = text + '\n'
            cy.writeFile('cypress/e2e/Residential/policy_code-Residential.txt', code, { flag: 'a+' })
        })
    })
})





