import { Random, dob, dob_1, randomDNI, randomCPF } from './utils'
import { person, payment, address, address_co, address_ar, address_br, address_pr } from '../support/objects_mobile'
let radio = 0
let n = 0
let num = 0
let date = dob() // Only Colombia Personal Details

// COLOMBIA
// Travel Date / Select Plan 
Cypress.Commands.add('travel_date_co', () => {
    cy.fixture('locators').then((x) => {
        // Travel Date
        cy.get(x.button_1).click()
            .wait(500)
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
        cy.get(x.quote_button).click()

        cy.get('.loading-indicator__container').should(($loading) => {
            expect($loading).not.to.exist
        })
        // Select Plan
        cy.log('//////Select Plan//////')
        cy.get(x.plans_select_button).should('have.length.greaterThan', 0)
            .its('length').then(($length) => {
                cy.get(x.plans_select_button).eq(Cypress._.random($length - 1)).click()

                cy.get('.loading-indicator__container').should(($loading) => {
                    expect($loading).not.to.exist
                })
            })
    })
})
// Number of Travelers / Personal Details 
Cypress.Commands.add('details_travel_co', () => {
    cy.fixture('locators').then((x) => {
        // Number of Travelers
        cy.log('///// Number of Travelers /////')
        cy.get(x.select_placeholder).click()
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length').then(($length) => {
                cy.log($length)
                num = Cypress._.random($length - 1)
                cy.log(num)
                cy.get(x.select_option).eq(num).click()
                cy.get(x.companions_button).click()

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
                cy.get(x.input_name).first().type(person.name)
                    .get(x.input_last_name).first().type(person.last_name)
                    .get(x.input_birth_date).first().type(date)
                cy.log('////// Gender /////')
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
                    .get(x.input_province).type(address_co.department)
                    .get(x.input_city).type(address_co.city)
                cy.log('////// Question /////')
                cy.get(x.select_value).eq(1).click()
                    .wait(1000)
                    .get(x.select_option).should('have.length.greaterThan', 0)
                    .its('length').then(($length) => {
                        cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
                    })

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

                cy.get('.loading-indicator__container').should(($loading) => {
                    expect($loading).not.to.exist
                })
            })
        cy.wait(1000)
        cy.get('form').first().then($form => {
            if ($form.find(x.errors).is(':visible')) {
                cy.log('///// Bug Found /////')
                if (cy.get(x.errors).should('contain.text', '  Ingresa tu cédula de ciudadanía ')) {
                    cy.log('////// Changing ID /////')
                        .get(x.input_id).type(Random(1000000000, 1999999999))
                        .get(x.forward_button).click()
                }
            }
        })
        cy.get('.loading-indicator__container').should(($loading) => {
            expect($loading).not.to.exist
        })
    })
})
// Payment Page 
Cypress.Commands.add('payment_travel_co', () => {
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

        })
        cy.url().then((url) => {
            if (url.includes('https://la.studio-uat.chubb.com/')) {
                cy.get(x.forward_button).click()

                cy.get('.loading-indicator__container').should(($loading) => {
                    expect($loading).not.to.exist
                })
            }
        })
    })
})

// ARGENTINA
// Travel Date / Select Plan 
Cypress.Commands.add('travel_date_ar', () => {
    cy.fixture('locators').then((x) => {
        // Travel Date
        cy.log('//////// Radio Grup - 1 /////////')
        cy.get(x.button_1).click()
            .wait(500)
        cy.get(x.radio_group)
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

                cy.get('.loading-indicator__container').should(($loading) => {
                    expect($loading).not.to.exist
                })
            })

        // Select Plan
        cy.log('//////Select Plan//////')
        cy.get(x.plans_select_button).click()

        cy.get('.loading-indicator__container').should(($loading) => {
            expect($loading).not.to.exist
        })

    })
})
// Number of Travelers / Personal Details 
Cypress.Commands.add('details_travel_ar', () => {
    cy.fixture('locators').then((x) => {
        // Number of Travelers
        cy.log('///// Number of Travelers /////')
        cy.get(x.select_placeholder).click()
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length').then(($length) => {
                cy.log($length)
                num = Cypress._.random($length - 1)
                cy.log(num)
                cy.get(x.select_option).eq(num).click()

                cy.get(x.companions_button).click()

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

                cy.get('.loading-indicator__container').should(($loading) => {
                    expect($loading).not.to.exist
                })
                cy.wait(1000)
                cy.get('form').first().then($form => {
                    if ($form.find(x.errors).is(':visible')) {
                        cy.log('///// Bug Found /////')
                        if (cy.get(x.errors).should('contain.text', '  Ingresa tu dni ')) {
                            cy.log('////// Changing ID /////')
                                .get(x.input_id).type(randomDNI())
                                .get(x.forward_button).click()
                        }
                    }
                })
                cy.get('.loading-indicator__container').should(($loading) => {
                    expect($loading).not.to.exist
                })
            })

    })
})
// Payment Page  
Cypress.Commands.add('payment_travel_ar', () => {
    cy.fixture('locators').then((x) => {
        cy.iframe(x.card_iframe).then($ => {
            cy.wrap($[0])
                .find(x.input_card)
                .type(payment.visa_card_num_1)
                .get(x.input_card_name).type(payment.card_holder)
                .get(x.input_expiry_date).type(payment.expiration_date_2)
        })
        cy.iframe(x.cvv_iframe).then($iframes => {
            cy.wrap($iframes[0])
                .find(x.input_cvv)
                .type(payment.cvv_1)
                .get(x.checkboxes).check({ force: true }).should('be.checked')
                .get(x.forward_button).should('be.enabled')

        })
        cy.url().then((url) => {
            if (url.includes('https://la.studio-uat.chubb.com/')) {
                cy.get(x.forward_button).click()

                cy.get('.loading-indicator__container').should(($loading) => {
                    expect($loading).not.to.exist
                })

            }
        })
    })
})

// PUERTO RICO
// Travel Date / Number of Travelers / Select Plan / Personal Details / Edit  
Cypress.Commands.add('travel_info_pr', () => {
    cy.fixture('locators').then((x) => {

        // Travel Date
        cy.get(x.button_1).click()
            .wait(500)
        cy.log('//////// Departure Date /////////')
        cy.get(x.datepicker_icon).first().click()
            .get(x.calendar_next_button).click()
            .get(x.calendar_body).should('have.length.greaterThan', 0)
            .its('length')
            .then(cy.log)
            .then(() => {
                n = Cypress._.random(0, 5)
                cy.log(n)
                cy.get(x.calendar_body).eq(n).click()
            })
        cy.log('//////// Arrival Date /////////')
        cy.get(x.datepicker_icon).last().click()
            .get(x.calendar_body).should('have.length.greaterThan', 0)
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
        cy.get(x.quote_button).click()

        cy.get('.loading-indicator__container').should(($loading) => {
            expect($loading).not.to.exist
        })

        // Number of Travelers
        cy.log('/////Number of Travelers/////')
        cy.get(x.select_placeholder).click()
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length').then(($length) => {
                cy.log($length)
                num = Cypress._.random($length - 1)
                cy.log(num)
                cy.get(x.select_option).eq(num).click()

                cy.wait(500)

                cy.get('input').then(els => {
                    [...els].forEach(el => cy.wrap(el).type(dob_1()));
                })
                cy.get(x.companions_button).click()

                cy.get('.loading-indicator__container').should(($loading) => {
                    expect($loading).not.to.exist
                })

                // Select Plan
                cy.log('///// Select Plan/////')
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
                    if ($body.find('.ng-star-inserted .captcha-modal', { timeout: 60000 }).length > 0) {
                        cy.log('////// True //////')
                        cy.get('.ng-star-inserted .captcha-modal', { timeout: 60000 }).click({ force: true })
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
                cy.get(x.input_name).first().type(person.name)
                    .get(x.input_last_name).first().type(person.last_name)
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
                    })
                }
                cy.wait(1000)
                cy.get(x.forward_button).click()

                cy.get('.loading-indicator__container').should(($loading) => {
                    expect($loading).not.to.exist
                })
            })

    })

})
// Payment Page  
Cypress.Commands.add('payment_travel_pr', () => {
    cy.fixture('locators').then((x) => {
        cy.iframe(x.card_iframe).then($ => {
            cy.wrap($[0])
                .find(x.input_card).click()
                .type(payment.visa_card_num_1)
                .get(x.input_card_name).type(payment.card_holder)
                .get(x.input_expiry_date).type(payment.expiration_date)
        })
        cy.iframe(x.cvv_iframe).then($iframes => {
            cy.wrap($iframes[0])
                .find(x.input_cvv).click()
                .type(payment.cvv_1)
                .get(x.checkboxes).check({ force: true }).should('be.checked')
                .get(x.forward_button).should('be.enabled')

        })
        cy.url().then((url) => {
            if (url.includes('https://la.studio-uat.chubb.com/')) {
                cy.get(x.forward_button).click()

                cy.get('.loading-indicator__container').should(($loading) => {
                    expect($loading).not.to.exist
                })
            }
        })
    })
})

// BRASIL
// Travel Date / Number of Travelers / Select Plan / Personal Details
Cypress.Commands.add('travel_info_br', () => {
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

        //Country
        cy.log('//////// Country /////////')
        cy.get(x.input_country).click()
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length').then(($length) => {
                cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
            })

        //Numbers Travelers
        cy.log('//////// Numbers Travelers /////////')
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

                //Select Plan
                cy.log('//////// Select Plan /////////')
                cy.get(x.plans_select_button).should('have.length.greaterThan', 0)
                    .its('length').then(($length) => {
                        cy.get(x.plans_select_button).eq(Cypress._.random($length - 1)).click()

                        cy.get('.loading-indicator__container').should(($loading) => {
                            expect($loading).not.to.exist
                        })
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

                cy.get('.loading-indicator__container').should(($loading) => {
                    expect($loading).not.to.exist
                })
                cy.wait(1000)
                cy.get('form').first().then($form => {
                    if ($form.find(x.errors).is(':visible')) {
                        cy.log('///// Bug Found /////')
                        if (cy.get(x.errors).should('contain.text', '  Digite seu cpf ')) {
                            cy.log('////// Changing ID /////')
                                .get(x.input_id).type(randomCPF())
                                .get(x.forward_button).click()
                        }
                    }
                })
                cy.get('.loading-indicator__container').should(($loading) => {
                    expect($loading).not.to.exist
                })
                // Checking Insured Details
                cy.log('//////// Checking Insured Details /////////')
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

                // Edit Button and Changes
                cy.log('//////// Edit Button and Changes /////////')
                cy.get(x.edit_button).click()

                cy.get('.loading-indicator__container').should(($loading) => {
                    expect($loading).not.to.exist
                })
                    .get(x.input_address_1).wait(500).type(address.line2)
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

                cy.get('.loading-indicator__container').should(($loading) => {
                    expect($loading).not.to.exist
                })
                cy.get(x.collapsable_bar).click()
                    .wait(500)
                cy.get(x.review_items)
                    .should('contain.text', address.line2)
            })

    })
})
// Payment Page 
Cypress.Commands.add('payment_travel_br', () => {
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
        cy.url().then((url) => {
            if (url.includes('https://la.studio-uat.chubb.com/')) {
                cy.get(x.forward_button).click()

                cy.get('.loading-indicator__container').should(($loading) => {
                    expect($loading).not.to.exist
                })
            }
        })
    })
})


