import { Random, dob, randomRFC, randomRUT, randomDNI, randomCPF } from './utils'
import { person, payment, mobile, address, address_ec, address_mx, address_co, address_ar, address_br } from '../support/objects_mobile'
let radio = 0 // Only Brasil
let date = dob()

// Mexico
// Quote / Select Plan 
Cypress.Commands.add('quote_residential_mx', () => {
    cy.fixture('locators').then((x) => {
        // Quote
        cy.log('//// Quote ////')
        cy.get(x.button_1).click()
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
    })
})
// Personal Details 
Cypress.Commands.add('details_residential_mx', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.input_name).type(person.name)
            .get(x.input_last_name).type(person.last_name)
            .get(x.input_birth_date).type(dob())
            .get(x.input_id).type(randomRFC())//'ANML891018J47'
        cy.log('///// Gener /////')
        cy.get(x.select_value_1).click()
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length').then(($length) => {
                cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
            })
        cy.get(x.input_mobile).type(person.phone_1)
            .get(x.input_email).type(person.email)
            .get(x.input_zipcode).type(address_mx.zipcode)

        cy.intercept('POST', '/api/data/locations').as('getLocation')
            .wait('@getLocation', { timeout: 80000 })

            .get(x.input_colonia_1).type(address_mx.colonia)
            .get(x.input_address_1).type(address.line1)
            .wait(1000)
            .get(x.forward_button).click()
        cy.get('.loading-indicator__container').should(($loading) => {
            expect($loading).not.to.exist
        })
        cy.wait(1000)
        cy.get('form').then($form => {
            if ($form.find(x.errors).is(':visible')) {
                cy.log('///// Bug Found /////')
                if (cy.get(x.errors).should('contain.text', '  RFC Inválido ')) {
                    cy.log('////// Changing ID /////')
                    cy.get(x.input_birth_date).clear()
                        .get(x.input_birth_date).type(dob())
                        .get(x.input_id).type(randomRFC()).wait(1000)
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
Cypress.Commands.add('payment_residential_mx', () => {
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
                .type(payment.mc_card_num)
                .get(x.input_card_name).type(payment.card_holder)
                .get(x.input_expiry_date).type(payment.expiration_date_2)
        })
        cy.iframe(x.cvv_iframe).then($iframes => {
            cy.wrap($iframes[0])
                .find(x.input_cvv).click()
                .type(payment.cvv_1)
            cy.get(x.checkboxes).check({ force: true }).should('be.checked')

                .get(x.forward_button).should('be.enabled')

        })
        cy.url().then((url) => {
            if (url.includes('https://la.studio-uat.chubb.com/')) {
                cy.wait(1000)
                cy.get(x.forward_button).click()

                cy.get('.loading-indicator__container').should(($loading) => {
                    expect($loading).not.to.exist
                })
            }
        })

    })
})

// COLOMIA
// Quote / Select Plan 
Cypress.Commands.add('quote_residential_co', () => {
    cy.fixture('locators').then((x) => {
        // Quote
        cy.log('//// Quote ////')
        cy.get(x.button_1).click()
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
    })
})
// Personal Details 
Cypress.Commands.add('details_residential_co', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.input_name).type(person.name)
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
            .get(x.forward_button).click()
        cy.get('.loading-indicator__container').should(($loading) => {
            expect($loading).not.to.exist
        })
        cy.wait(1000)
        cy.get('form').then($form => {
            if ($form.find(x.errors).is(':visible')) {
                cy.log('///// Bug Found /////')
                if (cy.get(x.errors).should('contain.text', '  RFC Inválido ')) {
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
Cypress.Commands.add('payment_residential_co', () => {
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
                cy.wait(1000)
                cy.get(x.forward_button).click()

            }
        })
    })
})

// CHILE
// Quote / Select Plan 
Cypress.Commands.add('quote_residential_cl', () => {
    cy.fixture('locators').then((x) => {
        // Quote
        cy.log('//// Quote ////')
        cy.get(x.button_1).click()
            .wait(500)
        // Select Plan
        cy.log('//// Select Plan ////')
        cy.get(x.plans_select_button).should('have.length.greaterThan', 0)
            .its('length').then(($length) => {
                cy.get(x.plans_select_button).eq(Cypress._.random($length - 1)).click()
            })
        cy.get('.loading-indicator__container').should(($loading) => {
            expect($loading).not.to.exist
        })
    })
})
// Personal Details 
Cypress.Commands.add('details_residential_cl', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.input_name).type(person.name)
            .get(x.input_last_name).type(person.last_name)
            .get(x.input_birth_date).type(dob())
        cy.log('////// Gener //////')
        cy.get(x.select_value).first().click()
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length').then(($length) => {
                cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
            })
        cy.get(x.input_id).type(randomRUT(10000000, 40000000))
        cy.get(x.input_mobile).type(person.phone_4)
            .get(x.input_email).type(person.email)
            .get(x.input_address_1).type(address.line1)
        cy.get(x.select_value).last().click()
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length').then(($length) => {///////
                cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
            })
            .wait(1000)
            .get(x.forward_button).click()

        cy.get('.loading-indicator__container').should(($loading) => {
            expect($loading).not.to.exist
        })
        cy.wait(1000)
        cy.get('form').then($form => {
            if ($form.find(x.errors).is(':visible')) {
                cy.log('///// Bug Found /////')
                if (cy.get(x.errors).should('contain.text', '  RFC Inválido ')) {
                    cy.log('////// Changing ID /////')
                    cy.get(x.input_birth_date).clear()
                        .get(x.input_birth_date).type(dob())
                        .get(x.input_id).type(randomRUT(10000000, 40000000)).wait(1000)
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
Cypress.Commands.add('payment_residential_cl', () => {
    cy.fixture('locators').then((x) => {
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
// Personal Details 
Cypress.Commands.add('details_residential_ec', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.input_name).type(person.name)
            .get(x.input_last_name).type(person.last_name)
            .get(x.input_birth_date).type(dob())
        cy.log('////// Gender /////')
        cy.get(x.select_value).click()
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length').then(($length) => {
                cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
            })
            .get(x.input_id).type(Random(1000000000, 1999999999))//1953064165 
            .get(x.input_mobile).type(person.phone)
            .get(x.input_email).type(person.email)
            .get(x.input_address_1).type(address.line1)
            .get(x.input_city).type(address_ec.city)
            .get(x.input_province).type(address_ec.province)
            .get(x.forward_button).click()
        cy.get('.loading-indicator__container').should(($loading) => {
            expect($loading).not.to.exist
        })
        cy.wait(1000)
        cy.get('form').then($form => {
            if ($form.find(x.errors).is(':visible')) {
                cy.log('///// Bug Found /////')
                if (cy.get(x.errors).should('contain.text', '  RFC Inválido ')) {
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
Cypress.Commands.add('payment_residential_ec', () => {
    cy.fixture('locators').then((x) => {
        cy.iframe(x.card_iframe).then($iframes => {
            cy.wrap($iframes[0])
                .find(x.input_card)
                .first().click()
                .type(payment.dinersClub_card_num)
                .get(x.input_card_name).type(payment.card_holder)
                .get(x.input_expiry_date).click()
                .type(payment.expiration_date)

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
// Quote / Select Plan 
Cypress.Commands.add('quote_residential_br', () => {
    cy.fixture('locators').then((x) => {
        // Quote
        cy.log('//// Quote ////')
        cy.get(x.button_1).click()
            .wait(500)
        // Select Plan
        cy.log('//// Select Plan ////')
        cy.get(x.plans_select_button).should('have.length.greaterThan', 0)
            .its('length').then(($length) => {
                cy.get(x.plans_select_button).eq(Cypress._.random($length - 1)).click()
            })
        cy.get('.loading-indicator__container').should(($loading) => {
            expect($loading).not.to.exist
        })
    })
})
// Personal Details / Checking Insured Details / Edit 
Cypress.Commands.add('details_residential_br', () => {

    cy.fixture('locators').then((x) => {
        // Personal Details
        cy.log('//////// Personal Details /////////')
        cy.get(x.input_name).type(person.name)
            .get(x.input_last_name).type(person.last_name)
            .get(x.input_birth_date).type(dob())
        // Gender
        cy.log('////// Gender /////')
        cy.get(x.select_value).first().click()
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length').then(($length) => {
                cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
            })
            .get(x.input_mobile).type(person.phone_2)
            .get(x.input_email).type(person.email)
            .get(x.input_id).click().type(randomCPF())

        cy.log('//////// Radio Group - 1 /////////')
        cy.get(x.radio_group).first()
            .find(x.check_outer_circle).should('have.length.greaterThan', 0)
            .its('length').then(($length) => {
                cy.get(x.check_outer_circle).eq(Cypress._.random($length - 1)).click({ force: true })

                cy.get(x.input_zipcode).click()// click outside
                    .wait(1000)
                cy.log('//////// Looking for Errors /////////')
                cy.get('form').then(($form) => {
                    if ($form.find(x.errors_1).length > 0) {
                        cy.get(x.radio_group).first()
                            .find(x.check_outer_circle).last()
                            .click({ force: true })
                            .wait(500)
                    }
                })
            })

        cy.get(x.input_zipcode).type(address_br.zipcode)
            .intercept('https://viacep.com.br/ws/22050000/json').as('Location')
            .wait('@Location')

            .get(x.input_address_1).type(address.line1)
            .get(x.input_ext_number).type(address_br.ext_num)
            .get(x.input_address_2).type(address.line1)
            .get(x.input_address_3).type(address_br.barrio)
            .get(x.input_city).type(address_br.city)
            .get(x.input_province).type(address_br.province)

        //Same Address yes or not
        cy.log('//////// Radio Group - 2 /////////')
        cy.get(x.radio_group).last()
            .find(x.check_outer_circle).should('have.length.greaterThan', 0)
            .its('length').then(($length) => {
                cy.log($length)
                radio = Cypress._.random($length - 1)
                cy.get(x.radio_group).last()
                    .find(x.check_outer_circle).eq(radio).click({ force: true })

                cy.log('////// Radio Checked', radio, '///////')
                if (radio == 1) {
                    cy.get(x.input_zipcode_1).type(address_br.zipcode_1)
                    cy.intercept('https://viacep.com.br/ws/69932000/json').as('Location')
                    cy.wait('@Location')
                        .wait(500)
                        .get(x.input_add_1_Billing).type(address.line1)
                        .get(x.input_ext_num_Billing).type(address_br.ext_num)
                        .get(x.input_add_2_Billing).type(address.line1)
                        .get(x.input_add_3_Billing).type(address_br.barrio_1)
                }
                cy.get(x.checkboxes).click({ multiple: true })

                cy.wait(1000)
                cy.get(x.forward_button).click()
                cy.get('.loading-indicator__container').should(($loading) => {
                    expect($loading).not.to.exist
                })
                cy.wait(1000)
                cy.get('form').then($form => {
                    if ($form.find(x.errors).is(':visible')) {
                        cy.log('///// Bug Found /////')
                        if (cy.get(x.errors).should('contain.text', '  RFC Inválido ')) {
                            cy.log('////// Changing ID /////')
                                .get(x.input_id).type(randomCPF())
                                .get(x.forward_button).click()
                        }
                    }
                })
                cy.get('.loading-indicator__container').should(($loading) => {
                    expect($loading).not.to.exist
                })
                //Checking Insured Details
                cy.log('//////// Checking Insured Details /////////')
                cy.get('.review__item--applicant-details')
                    .should('contain.text', person.name)
                    .and('contain.text', person.last_name)
                    .and('contain.text', person.phone_2)
                    .and('contain.text', person.email)

                cy.get('.review__item--insured-address')
                    .should('contain.text', address_br.zipcode)
                    .and('contain.text', address.line1)
                    .and('contain.text', address_br.ext_num)
                    .and('contain.text', address.line1)
                    .and('contain.text', address_br.barrio)
                    .and('contain.text', address_br.city)
                    .and('contain.text', address_br.province)

                cy.log('////// Radio Checked', radio, '///////')
                if (radio == 1) {
                    cy.get('.review__item--billing-address')
                        .should('contain.text', address_br.zipcode_1)
                        .and('contain.text', address.line1)
                        .and('contain.text', address_br.ext_num)
                        .and('contain.text', address.line1)
                        .and('contain.text', address_br.barrio_1)

                } else {
                    cy.get('.review__item--billing-address')
                        .should('contain.text', address_br.zipcode)
                        .and('contain.text', address.line1)
                        .and('contain.text', address_br.ext_num)
                        .and('contain.text', address.line1)
                        .and('contain.text', address_br.barrio)
                        .and('contain.text', address_br.city)
                        .and('contain.text', address_br.province)
                }

                // Edit
                cy.log('//////// Edit /////////')
                cy.get(x.edit_button).eq(1).click()
                cy.get('.loading-indicator__container').should(($loading) => {
                    expect($loading).not.to.exist
                })
                    .get(x.input_address_1).wait(500).type(address.line2)
                    .get(x.input_address_3).type(address_br.barrio)
                    .get(x.input_city).type(address_br.city)
                    .get(x.input_province).type(address_br.province)

                cy.log('////// Radio =', radio, '///////')
                if (radio == 1) {
                    cy.get(x.input_add_1_Billing).type(address.line1)
                    cy.get(x.input_add_3_Billing).type(address_br.barrio_1)
                }


                cy.get(x.checkboxes).click({ multiple: true })
                    .wait(1000)
                cy.get(x.forward_button).click()
                cy.get('.loading-indicator__container').should(($loading) => {
                    expect($loading).not.to.exist
                })

                cy.get('.review__item--insured-address')
                    .should('contain.text', address.line2)
            })


    })
})
// Payment Page 
Cypress.Commands.add('payment_residential_br', () => {
    cy.fixture('locators').then((x) => {
        cy.iframe(x.card_iframe).then($ => {
            cy.wrap($[0])
                .find(x.input_card)
                .type(payment.visa_card_num_1)
                .get(x.input_card_name).type(payment.card_holder)
                .get(x.input_expiry_date).type(payment.expiration_date)
        })
        cy.iframe(x.cvv_iframe).then($iframes => {
            cy.wrap($iframes[0])
                .find(x.input_cvv)
                .type(payment.cvv_1)
                .get(x.checkboxes).check({ force: true }).should('be.checked')
                .get(x.input_expiry_date).click()
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



