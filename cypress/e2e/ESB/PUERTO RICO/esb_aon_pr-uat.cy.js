import 'cypress-iframe'
import { person, address, address_pr, payment } from '../../../support/objects_mobile'
import { Random, dob, dob_2 } from '../../../support/utils'
let num = 0
let env = 0

describe('ESB aon Puerto Rico (uat)', { testIsolation: false }, () => {
    //
    //Page 1
    it('Visit', () => {
        cy.visit('https://la.studio-uat.chubb.com/pr/aon/esb/launchstage/es-PR')
        cy.wait(2000)
        cy.url().then(($url) => {
            if ($url.includes('https://la.studio.chubb.com/404')) {
                throw new Error('//// PAGE NOT FOUND ////')
            }
        })
        //
    })

    it('Quote', () => {
        cy.fixture('locators').then((x) => {
            cy.log('//// Quote ////')
            cy.get(x.button_1, { timeout: 30000 }).click()
                .wait(500)
            cy.log('//////// Date of Birth /////////')
            cy.get('[placeholder="Indica tu fecha de nacimiento"]').type(dob())

            cy.log('////// Coverage for Whom? //////')
            cy.get(x.select_placeholder).click()
                .get(x.select_option).should('have.length.greaterThan', 0)
                .its('length').then(($length) => {
                    cy.log($length)
                    num = Cypress._.random($length - 1)
                    cy.log(num)
                    cy.get(x.select_option).eq(num).click()

                    cy.get(x.quote_button).click()
                })
            cy.wait('@campaign', { timeout: 40000 }).its('response.statusCode').should('eq', 200)
            cy.get('.loading-indicator__container', { timeout: 40000 }).should(($loading) => {
                expect($loading).not.to.exist
            })
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

    it('Personal Details', () => {
        cy.fixture('locators').then((x) => {
            cy.wait(1000)
            cy.get(x.input_company, { timeout: 30000 }).type(address_pr.company)
                .get(x.input_name).first().type(person.name)
                .get(x.input_last_name).first().type(person.last_name)
                .get(x.input_id).type(Random(1000, 9999))
            cy.log('////// Gender /////')
                .get(x.select_value).first().click()
                .get(x.select_option).should('have.length.greaterThan', 0)
                .its('length').then(($length) => {
                    cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
                })
                .get(x.input_mobile).type(person.phone_1)
                .get(x.input_email).type(person.email)
                .get(x.input_address_1).type(address.line1)
                .get(x.input_city).type(address_pr.city)
                .get(x.input_zipcode).type(address_pr.zipcode)


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
                                        [...els].forEach(el => cy.wrap(el).type(dob_2()))
                                    })
                            })
                        }
                    })
            }
            cy.get(x.forward_button).should('be.enabled').click()

            cy.wait('@validate', { timeout: 80000 })
            cy.get('.loading-indicator__container', { timeout: 40000 }).should(($loading) => {
                expect($loading).not.to.exist
            })

            cy.wait(1000)
            cy.get('body').then(($body) => {
                if ($body.find('app-applicant-details').is(':visible')) {
                    if ($body.find('#mat-error-10').is(':visible')) {
                        var counter = 0
                        const repeatID = () => {
                            counter++
                            cy.log(counter)
                            cy.log('///// Duplicate ID /////')
                            cy.log('////// Changing ID /////')
                            cy.get(x.input_id).clear().type(Random(1000, 9999)).wait(1000)
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
            cy.log('/////// Checking Insured Details //////')
            cy.get(x.review_items, { timeout: 30000 })
                .should('contain.text', address_pr.company)
                .and('contain.text', person.name)
                .and('contain.text', person.last_name)
                .and('contain.text', person.phone_1)
                .and('contain.text', person.email)
                .and('contain.text', address.line1)
                .and('contain.text', address_pr.city)
                .and('contain.text', address_pr.zipcode)
        })
    })

    // it('Payment page Edit button click', () => {
    //     cy.Edit_button()
    // })

    // it('Edit', () => {
    //     cy.fixture('locators').then((x) => {
    //         cy.get(x.input_address_1, { timeout: 30000 }).clear()
    //             .type(address.line2)

    //         cy.log('////// Conditional - 3 ///////')
    //         if (num == 1) {
    //             cy.log('/////// True //////')
    //             cy.log('/////// Select Policyholders number 0 //////')
    //             cy.get(x.select_value).eq(2).click()
    //                 .get(x.select_option).eq(0).click()
    //                 .wait(500)

    //             cy.get('app-beneficiaries').then(($beneficiaries) => {
    //                 expect($beneficiaries.is(':visible'))
    //                 cy.get('app-beneficiaries')
    //                     .get(x.input_name).last().type(person.name)
    //                     .get(x.input_last_name).last().type(person.last_name)
    //                     .log('//// Select Only Option 3 (Conyugue) ////')
    //                     .get(x.select_placeholder).last().click()
    //                     .get(x.select_option).eq(2).click()
    //                     .get(x.input_dobFormControl).last().type(dob())
    //             })
    //         }
    //         cy.wait(1000)
    //         cy.get(x.forward_button).should('be.enabled').click()

    //         cy.wait('@validate', { timeout: 40000 }).its('response.statusCode').should('eq', 200)
    //         cy.wait('@iframe', { timeout: 40000 }).its('response.statusCode').should('eq', 200)

    //         cy.get(x.review_items, { timeout: 30000 })
    //             .should('contain.text', address.line2)

    //     })

    // })

    it('Payment page', () => {
        cy.fixture('locators').then((x) => {
            cy.wait(1000)
            cy.log('////// Radio Group - 1 /////')
            cy.get(x.radio_group)
                .find(x.check_outer_circle).eq(0).click({ force: true })
            cy.wait(1000)

            cy.iframe(' .payment-field-iframe > .tokenex-iframe > iframe:first').then(($) => {
                cy.wrap($[0])
                    .find(x.input_card).click()
                    .type(payment.visa_card_num_1, { delay: 80 })
                    .wait(500)
                    .get(x.input_card_name).type(payment.card_holder, { delay: 80 })
                    .get(x.input_expiry_date).click()
                    .type(payment.expiration_date_2, { delay: 80 })
            })

            cy.iframe('#cvv > iframe:first').then($iframes => {
                cy.wrap($iframes[0])
                    .find(x.input_cvv).click()
                    .type(payment.cvv_1, { delay: 80 })
                    .get(x.checkboxes).check({ force: true }).should('be.checked')
                    .get(x.input_expiry_date).click()
                    .wait(1000)
                cy.get(x.forward_button).should('be.enabled')
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
            cy.writeFile('cypress/e2e/ESB/policy_code-ESB.txt', code, { flag: 'a+' })
        })
    })
})


