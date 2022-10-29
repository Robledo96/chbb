import { Random, dob, dob_2, randomRFC, randomRUT, randomCPF, dob_1, randomDNI } from './utils'
import { person, payment, address, address_ec, address_pe, address_mx, address_co, address_br, panama } from '../support/objects_mobile'
let radio = 0 // Only Brasil
let num = 0
let env = 0
let date = dob()


// CHILE
// Quote / Select Plan / Personal Details
Cypress.Commands.add('life_cl', () => {
    cy.fixture('locators').then((x) => {
        // Quote
        cy.log('//// Quote ////')
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
                cy.get(x.input_name).type(person.name)
                    .get(x.input_last_name).type(person.last_name)
                cy.get(x.input_id).click().type(randomRUT())

                cy.log('////// Gener //////')
                cy.get(x.select_value).first().click()
                    .get(x.select_option).should('have.length.greaterThan', 0)
                    .its('length').then(($length) => {
                        cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
                    })
                cy.get(x.input_email).type(person.email)
                    .get(x.input_mobile).type(person.phone_4)
                    .get(x.input_address_1).type(address.line1)
                cy.get(x.select_placeholder).first().click()
                    .get(x.select_option).should('have.length.greaterThan', 0)
                    .its('length').then(($length) => {
                        cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
                    })
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
                                        .find(x.input_id).then(els => {
                                            [...els].forEach(el => cy.wrap(el).type(randomRUT()))
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
                cy.get('form').first().then($form => {
                    if ($form.find(x.errors).is(':visible')) {
                        cy.log('///// Bug Found /////')
                        if (cy.get(x.errors).eq(2).should('contain.text', '  Ingresa tu RUT (sin puntos y con guión)   ')) {
                            cy.log('////// Changing ID /////')
                            cy.get(x.input_id).type(randomRUT()).wait(1000)
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
                    .should('contain.text', person.name)
                    .and('contain.text', person.last_name)
                    .and('contain.text', person.phone_4)
                    .and('contain.text', person.email)
                    .and('contain.text', address.line1)

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
                            .get(x.input_id).last().type(randomRUT())
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
Cypress.Commands.add('payment_life_cl', () => {
    cy.fixture('locators').then((x) => {
        cy.wait(1000)
        cy.iframe(x.card_iframe).then($ => {
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


// ECUADOR
// Quote / Select Plan / Personal Details
Cypress.Commands.add('life_ec', () => {
    cy.fixture('locators').then((x) => {
        // Quote
        cy.log('//// Quote ////')
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
                cy.get(x.input_name).type(person.name)
                    .get(x.input_last_name).type(person.last_name)
                cy.log('////// Gener //////')
                cy.get(x.select_value).first().click()
                    .get(x.select_option).should('have.length.greaterThan', 0)
                    .its('length').then(($length) => {
                        cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
                    })
                cy.get(x.input_id).type(Random(1000000000, 1999999999))
                    .get(x.input_mobile).type(person.phone)
                    .get(x.input_email).type(person.email)
                    .get(x.input_address_1).type(address.line1)
                    .get(x.input_city).type(address_ec.city)
                    .get(x.input_province).type(address_ec.province)
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
                cy.wait(500)
                cy.get(x.forward_button).click()
                cy.get('.loading-indicator__container').should(($loading) => {
                    expect($loading).not.to.exist
                })
                cy.wait(1000)
                cy.get('form').first().then($form => {
                    if ($form.find(x.errors).is(':visible')) {
                        cy.log('///// Bug Found /////')
                        if (cy.get(x.errors).should('contain.text', ' Ingresa tu RUT (sin puntos y con guión) ')) {
                            cy.log('////// Changing ID /////')
                                .get(x.input_id).type(randomRUT(10000000, 40000000)).wait(1000)
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
                    .should('contain.text', person.name)
                    .and('contain.text', person.last_name)
                    .and('contain.text', person.phone)
                    .and('contain.text', person.email)
                    .and('contain.text', address.line1)
                    .and('contain.text', address_ec.city)
                    .and('contain.text', address_ec.province)

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
                            .get(x.input_id).last().type(Random(1000000000, 1999999999))
                            .get('[formcontrolname="dobFormControl"]').last().type(dob_2())
                    })
                }
                cy.wait(1000)
                cy.get(x.forward_button).click()
                cy.get('.loading-indicator__container').should(($loading) => {
                    expect($loading).not.to.exist
                })
                cy.get(x.review_items)
                    .should('contain.text', address.line2)
            })
    })
})
// Payment Page 
Cypress.Commands.add('payment_life_ec', () => {
    cy.fixture('locators').then((x) => {
        cy.wait(1000)
        cy.log('////// Radio Group - 1 /////')
        cy.get(x.radio_group)
            .find(x.check_outer_circle).eq(0).click({ force: true })

        cy.iframe(x.card_iframe).then($ => {
            cy.wrap($[0])
                .find(x.input_card).click()
                .type(payment.visa_card_num)
                .get(x.input_card_name).type(payment.card_holder)
                .get(x.input_expiry_date).click()
                .type(payment.expiration_date_1)
        })
        cy.iframe(x.cvv_iframe).then($iframes => {
            cy.wrap($iframes[0])
                .find(x.input_cvv).click()
                .type(payment.cvv)
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


// PERU
// Quote / Select Plan / Personal Details
Cypress.Commands.add('life_pe', () => {
    cy.fixture('locators').then((x) => {
        // Quote
        cy.log('//// Quote ////')
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

                cy.wait(4000)
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
                cy.get(x.input_name).type(person.name)
                    .get(x.input_last_name).type(person.last_name)
                    .get('[name="secondLastName"]').type(person.second_last_name)
                cy.log('////// Gener //////')
                cy.get(x.select_value).first().click()
                    .get(x.select_option).should('have.length.greaterThan', 0)
                    .its('length').then(($length) => {
                        cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
                    })
                cy.get(x.input_id).click().type(Random(1000000000, 1999999999))
                    .get(x.input_mobile).type(person.phone_4)
                    .get(x.input_email).type(person.email)
                    .get(x.input_address_1).type(address.line1)
                    .get(x.input_city).type(address_pe.city)
                    .get(x.input_province).type(address_pe.department)

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
                cy.get('form').first().then($form => {
                    if ($form.find(x.errors).is(':visible')) {
                        cy.log('///// Bug Found /////')
                        if (cy.get(x.errors).eq(2).should('contain.text', '  Ingresa tu número de documento de identidad   ')) {
                            cy.log('////// Changing ID /////')
                            cy.get(x.input_id).type(Random(1000000000, 1999999999)).wait(1000)
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
                    .should('contain.text', person.name)
                    .and('contain.text', person.last_name)
                    .and('contain.text', person.second_last_name)
                    .and('contain.text', person.phone_4)
                    .and('contain.text', person.email)
                    .and('contain.text', address.line1)
                    .and('contain.text', address_pe.city)
                    .and('contain.text', address_pe.department)

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
                            .get(x.input_id).last().type(Random(1000000000, 1999999999))
                            .get(x.input_dobFormControl).last().type(dob_2())
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
Cypress.Commands.add('payment_life_pe', () => {
    cy.fixture('locators').then((x) => {
        cy.wait(1000)
        cy.iframe(x.card_iframe).then($ => {
            cy.wrap($[0])
                .find(x.input_card).click()
                .type(payment.mc_card_num_2)
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


// PANAMA
// Quote / Select Plan / Personal Details
Cypress.Commands.add('life_pa', () => {
    cy.fixture('locators').then((x) => {
        // Quote
        cy.log('//// Quote ////')
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

                cy.wait(4000)
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
                    .get('[name="countryIncomeTaxed"]').type(panama.place_of_income)

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
                cy.get(x.forward_button).click()
                cy.get('.loading-indicator__container').should(($loading) => {
                    expect($loading).not.to.exist
                })
                cy.wait(1000)
                cy.get('form').first().then($form => {
                    if ($form.find(x.errors).is(':visible')) {
                        cy.log('///// Bug Found /////')
                        if (cy.get(x.errors).eq(1).should('contain.text', '  Ingresa tu número de documento de identidad   ')) {
                            cy.log('////// Changing ID /////')
                            cy.get(x.input_id).type(Random(1000000000, 1999999999)).wait(1000)
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
                    .should('contain.text', person.name)
                    .and('contain.text', person.last_name)
                    .and('contain.text', person.phone_5)
                    .and('contain.text', person.email)
                    .and('contain.text', address.line1)
                    .and('contain.text', panama.nationality)
                    .and('contain.text', panama.company)

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
                            .get(x.select_option).click()
                            .get(x.input_dobFormControl).last().type(dob_2())
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
Cypress.Commands.add('payment_life_pa', () => {
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




