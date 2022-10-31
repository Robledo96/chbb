import { Random, dob, dob_2 } from './utils'
import { person, payment, address, address_pr } from '../support/objects_mobile'
let num = 0
let env = 0


// PUERTO RICO
// Quote / Select Plan / Personal Details
Cypress.Commands.add('esb_pr', () => {
    cy.fixture('locators').then((x) => {
        // Quote
        cy.log('//// Quote ////')
        cy.get(x.button_1).click()
            .wait(500)
        cy.log('//////// Date of Birth /////////')
        cy.get('[formcontrolname="dateOfBirth"]').type(dob())

        cy.log('////// Coverage for Whom? //////')
        cy.get(x.select_placeholder).click()
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length').then(($length) => {
                cy.log($length)
                num = Cypress._.random(0)
                cy.log(num)
                cy.get(x.select_option).eq(num).click()

                cy.get(x.quote_button).click()

                cy.get('.loading-indicator__container').should(($loading) => {
                    expect($loading).not.to.exist
                })

                // Select Plan
                cy.log('//// Select Plan ////')
                cy.get(x.plans_select_button).should('have.length.greaterThan', 0)
                    .its('length').then(($length) => {
                        cy.get(x.plans_select_button).eq(Cypress._.random($length - 1)).click()
                    })
                cy.get('.loading-indicator__container').should(($loading) => {
                    expect($loading).not.to.exist
                })
                cy.wait(3000)
                // Captcha
                cy.log('////// Conditional - Captcha //////')
                cy.get('body').then($body => {
                    if ($body.find('.captcha-modal', { timeout: 60000 }).length > 0) {
                        cy.log('////// True //////')
                        cy.get('.captcha-modal', { timeout: 60000 }).click({ force: true })
                        cy.get('.captcha-modal__content .captcha-modal__question').invoke('text').then((text) => {
                            let textop = text
                            let finaltx = textop.trim()
                            let finaladd = 0
                            let newtext = finaltx.split(" ")
                            if (newtext[1] == '+') {
                                finaladd = parseInt(newtext[0]) + parseInt(newtext[2].trim())
                                // cy.log(finaladd + " plus")
                            } else if (newtext[1] == '-') {
                                finaladd = parseInt(newtext[0]) - parseInt(newtext[2].trim())
                                // cy.log(finaladd + " minus")
                            }
                            cy.get('[name="captchaVal"]').first().type(finaladd)
                            cy.get("[type='Submit']").click()
                        })
                    }
                })
                // Personal Details 
                cy.log('///// Personal Details //////')
                cy.get(x.input_company).type(address_pr.company)
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
                cy.get(x.forward_button).click()
                cy.get('.loading-indicator__container').should(($loading) => {
                    expect($loading).not.to.exist
                })
                cy.wait(1000)
                cy.get('form').eq(0).then($form => {
                    if ($form.find(x.errors).is(':visible')) {
                        cy.log('///// Bug Found /////')
                        if (cy.get(x.errors).eq(2).should('contain.text', '  Ingresa los ultimos 4 digitos de tu SSN   ')) {
                            cy.log('////// Changing ID /////')
                            cy.get(x.input_id).type(Random(1000, 9999)).wait(1000)
                                .get(x.forward_button).click()
                        }
                    }
                })
                cy.get('.loading-indicator__container').should(($loading) => {
                    expect($loading).not.to.exist
                })

                //checking insured details
                cy.wait(1000)
                cy.log('/////// Checking Insured Details //////')
                cy.get(x.review_items)
                    .should('contain.text', address_pr.company)
                    .and('contain.text', person.name)
                    .and('contain.text', person.last_name)
                    .and('contain.text', person.phone_1)
                    .and('contain.text', person.email)
                    .and('contain.text', address.line1)
                    .and('contain.text', address_pr.city)
                    .and('contain.text', address_pr.zipcode)

                //edit button
                cy.log('/////// Edit Button //////')
                cy.get(x.edit_button).click()
                cy.get('.loading-indicator__container').should(($loading) => {
                    expect($loading).not.to.exist
                })
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
                            .get(x.select_option).eq(2).click()
                            .get(x.input_dobFormControl).last().type(dob())
                    })
                }

            })
        cy.wait(1000)
        cy.get(x.forward_button).click()
        cy.get('.loading-indicator__container').should(($loading) => {
            expect($loading).not.to.exist
        })
        cy.get(x.review_items)
            .should('contain.text', address.line2)
    })
})
// Payment Page 
Cypress.Commands.add('payment_esb_pr', () => {
    cy.fixture('locators').then((x) => {
        cy.wait(1000)
        cy.log('////// Radio Group - 1 /////')
        cy.get(x.radio_group)
            .find(x.check_outer_circle).eq(0).click({ force: true })
        cy.wait(1000)
        cy.iframe(x.card_iframe).then(($) => {
            cy.wrap($[0])
                .find(x.input_card).click()
                .type(payment.visa_card_num_1)
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
        cy.url().then((url) => {
            if (url.includes('https://la.studio-uat.chubb.com/')) {
                cy.wait(1000)
                cy.get(x.forward_button).click()

            }
            cy.get('.loading-indicator__container').should(($loading) => {
                expect($loading).not.to.exist
            })
        })
    })
})