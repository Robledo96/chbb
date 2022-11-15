import { Random, dob, randomRFC, randomRUT } from './utils'
import { person, payment, address, address_ec, address_mx, address_co } from '../support/objects_mobile'
let date = dob()// Only Brasil

// Mexico
//Select Plan 
Cypress.Commands.add('Plan_resid_mx', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.button_1).click()
        cy.get('.loading-indicator__container').should(($loading) => {
            expect($loading).not.to.exist
        })
        cy.get(x.plans_select_button).should('have.length.greaterThan', 0)
            .its('length').then(($length) => {
                cy.get(x.plans_select_button).eq(Cypress._.random($length - 1)).click()
            })
        cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
            expect($loading).not.to.exist
        })
    })
})
// Personal Details 
Cypress.Commands.add('Details_resid_mx', () => {
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
                        cy.get(x.input_birth_date).clear()
                            .get(x.input_birth_date).type(dob())
                            .get(x.input_id).type(randomRFC()).wait(1000)
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
//Pyment page Checking
Cypress.Commands.add('Checking_resid_mx', () => {
    cy.fixture('locators').then((x) => {
        //checking insured details
        cy.get(x.review_items)
            .should('contain.text', person.name)
            .and('contain.text', person.last_name)
            .and('contain.text', person.phone_1)
            .and('contain.text', person.email)
            .and('contain.text', address_mx.zipcode)
            .and('contain.text', address_mx.colonia)
            .and('contain.text', address.line1)
    })
})
//Edit
Cypress.Commands.add('Edit_resid_mx', () => {
    cy.fixture('locators').then((x) => {
        cy.wait(1000)
            .get(x.input_colonia_1).click({ force: true })
            .wait(1000)
            .get(x.colonia_option_text).first().click({ force: true })
            .wait(1000)
        cy.get(x.input_address_1).clear()
            .type(address.line2)
        cy.get(x.forward_button).click()
        cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
            expect($loading).not.to.exist
        })
        cy.get(x.review_items)
            .should('contain.text', address.line2)
    })
})
// Payment Page 
Cypress.Commands.add('Payment_resid_mx', () => {
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
        // cy.url().then((url) => {
        //     if (url.includes('https://la.studio-uat.chubb.com/')) {
        //         cy.wait(1000)
        //         cy.get(x.forward_button).click()

        //         cy.get('.loading-indicator__container').should(($loading) => {
        //             expect($loading).not.to.exist
        //         })
        //     }
        // })

    })
})

// COLOMBIA //
//Quote   (falabella)
Cypress.Commands.add('Quote_resid_co', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.button_1).click()
            .wait(500)
        cy.log('////// Radio Group //////')
        cy.get(x.radio_group)
            .find(x.check_outer_circle).should('have.length.greaterThan', 0)
            .its('length').then(($length) => {
                cy.get(x.check_outer_circle).eq(Cypress._.random($length - 1)).click({ force: true })
                    .get(x.quote_button).click()

                cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
                    expect($loading).not.to.exist
                })
            })
    })
})
//  Select Plan (falabella)
Cypress.Commands.add('Plan_residF_co', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.plans_select_button).should('have.length.greaterThan', 0)
            .its('length').then(($length) => {
                cy.get(x.plans_select_button).eq(Cypress._.random($length - 1)).click()
            })
        cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
            expect($loading).not.to.exist
        })
    })
})
//  Select Plan 
Cypress.Commands.add('Plan_resid_co', () => {
    cy.fixture('locators').then((x) => {
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
        cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
            expect($loading).not.to.exist
        })
    })
})
// Personal Details 
Cypress.Commands.add('Details_resid_co', () => {
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
                        cy.get(x.input_id).type(Random(1000000000, 1999999999)).wait(1000)
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
//Pyment page Checking
Cypress.Commands.add('Checking_resid_co', () => {
    cy.fixture('locators').then((x) => {
        //checking insured details
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
//Edit
Cypress.Commands.add('Edit_resid_co', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.input_address_1).clear()
            .type(address.line2)
        cy.get(x.forward_button).click()
        cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
            expect($loading).not.to.exist
        })
        cy.get(x.review_items)
            .should('contain.text', address.line2)
    })
})
// Payment Page 
Cypress.Commands.add('Payment_resid_co', () => {
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

        // cy.url().then((url) => {
        //     if (url.includes('https://la.studio-uat.chubb.com/')) {
        //         cy.wait(1000)
        //         cy.get(x.forward_button).click()
        //         cy.get('.loading-indicator__container').should(($loading) => {
        //             expect($loading).not.to.exist
        //         })
        //     }
        // })
    })
})

// CHILE //
//Select Plan 
Cypress.Commands.add('Plan_resid_cl', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.button_1).click()
            .wait(500)
        cy.get(x.plans_select_button).should('have.length.greaterThan', 0)
            .its('length').then(($length) => {
                cy.get(x.plans_select_button).eq(Cypress._.random($length - 1)).click()
            })
        cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
            expect($loading).not.to.exist
        })
    })
})
// Personal Details 
Cypress.Commands.add('Details_resid_cl', () => {
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
        cy.get(x.input_id).type(randomRUT())
        cy.get(x.input_mobile).type(person.phone_4)
            .get(x.input_email).type(person.email)
            .get(x.input_address_1).type(address.line1)
        cy.get(x.select_value).last().click()
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length').then(($length) => {
                cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
            })
            .wait(1000)
            .get(x.forward_button).click()

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
                        cy.get(x.input_id).type(randomRUT()).wait(1000)
                        cy.get(x.forward_button).click()
                        cy.get('.loading-indicator__container', { timeout: 40000 }).should(($loading) => {
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
//Pyment page Checking
Cypress.Commands.add('Checking_resid_cl', () => {
    cy.fixture('locators').then((x) => {
        //checking insured details
        cy.get(x.review_items)
            .should('contain.text', person.name)
            .and('contain.text', person.last_name)
            .and('contain.text', person.phone_4)
            .and('contain.text', person.email)
            .and('contain.text', address.line1)

    })
})
//Edit
Cypress.Commands.add('Edit_resid_cl', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.input_address_1).clear()
            .type(address.line2)
        cy.get(x.forward_button).click()
        cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
            expect($loading).not.to.exist
        })
        cy.get(x.review_items)
            .should('contain.text', address.line2)
    })

})
// Payment Page 
Cypress.Commands.add('Payment_resid_cl', () => {
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
        // cy.url().then((url) => {
        //     if (url.includes('https://la.studio-uat.chubb.com/')) {
        //         cy.wait(1000)
        //         cy.get(x.forward_button).click()
        //         cy.get('.loading-indicator__container').should(($loading) => {
        //             expect($loading).not.to.exist
        //         })
        //     }
        // })
    })
})

// ECUADOR //
//Quote
Cypress.Commands.add('Quote_resid_ec', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.button_1).click()
            .wait(500)
        cy.log('////// Radio Group //////')
        cy.get(x.radio_group)
            .find(x.check_outer_circle).should('have.length.greaterThan', 0)
            .its('length').then(($length) => {
                cy.get(x.check_outer_circle).eq(Cypress._.random($length - 1)).click({ force: true })
                    .get(x.quote_button).click()

                cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
                    expect($loading).not.to.exist
                })
            })
    })
})
//Select Plan 
Cypress.Commands.add('Plan_resid_ec', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.plans_select_button).should('have.length.greaterThan', 0)
            .its('length').then(($length) => {
                cy.get(x.plans_select_button).eq(Cypress._.random($length - 1)).click()
            })
        cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
            expect($loading).not.to.exist
        })
    })
})
// Personal Details 
Cypress.Commands.add('Details_resid_ec', () => {
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
                        cy.get(x.input_id).type(Random(1000000000, 1999999999)).wait(1000)
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
//Pyment page Checking
Cypress.Commands.add('Checking_resid_ec', () => {
    cy.fixture('locators').then((x) => {
        //checking insured details
        cy.get(x.review_items)
            .should('contain.text', person.name)
            .and('contain.text', person.last_name)
            .and('contain.text', person.phone)
            .and('contain.text', person.email)
            .and('contain.text', address.line1)
            .and('contain.text', address_ec.city)
            .and('contain.text', address_ec.province)

    })
})
//Edit
Cypress.Commands.add('Edit_resid_ec', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.input_address_1).clear()
            .type(address.line2)
            .get(x.forward_button).click()
        cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
            expect($loading).not.to.exist
        })
        cy.get(x.review_items)
            .should('contain.text', address.line2)

    })

})
// Payment Page 
Cypress.Commands.add('Payment_resid_ec', () => {
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
        // cy.url().then((url) => {
        //     if (url.includes('https://la.studio-uat.chubb.com/')) {
        //         cy.get(x.forward_button).click()

        //         cy.get('.loading-indicator__container').should(($loading) => {
        //             expect($loading).not.to.exist
        //         })
        //     }
        // })
    })
})

// BRASIL //
// Select Plan 
Cypress.Commands.add('Plan_resid_br', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.button_1).click()
            .wait(500)
        cy.get(x.plans_select_button).should('have.length.greaterThan', 0)
            .its('length').then(($length) => {
                cy.get(x.plans_select_button).eq(Cypress._.random($length - 1)).click()
            })
        cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
            expect($loading).not.to.exist
        })
    })
})
// Payment Page 
Cypress.Commands.add('Payment_resid_br', () => {
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
        // cy.url().then((url) => {
        //     if (url.includes('https://la.studio-uat.chubb.com/')) {
        //         cy.get(x.forward_button).click()

        //         cy.get('.loading-indicator__container').should(($loading) => {
        //             expect($loading).not.to.exist
        //         })
        //     }
        // })
    })
})



