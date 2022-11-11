import { person, payment, address, address_co, address_ar, address_br, address_pr } from '../support/objects_mobile'
let radio = 0
let n = 0

// COLOMBIA //
// Travel Date 
Cypress.Commands.add('Date_travel_co', () => {
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

        cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
            expect($loading).not.to.exist
        })
    })
})
//Select Plan
Cypress.Commands.add('Plan_travel_co', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.plans_select_button).should('have.length.greaterThan', 0)
            .its('length').then(($length) => {
                cy.get(x.plans_select_button).eq(Cypress._.random($length - 1)).click()

                cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
                    expect($loading).not.to.exist
                })
            })
    })
})
//Pyment page Checking
Cypress.Commands.add('Checking_travel_co', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.review_items)
            .should('contain.text', person.name)
            .and('contain.text', person.last_name)
            .and('contain.text', person.phone_3)
            .and('contain.text', person.email)
            .and('contain.text', address.line1)
            .and('contain.text', address_co.department)
            .and('contain.text', address_co.city)
    })
})
//Edit
Cypress.Commands.add('Edit_travel_co', () => {
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
Cypress.Commands.add('Payment_travel_co', () => {
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
        //         cy.get(x.forward_button).click()

        //         cy.get('.loading-indicator__container').should(($loading) => {
        //             expect($loading).not.to.exist
        //         })
        //     }
        // })
    })
})

// ARGENTINA //
// Travel Date 
Cypress.Commands.add('Date_travel_ar', () => {
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

                cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
                    expect($loading).not.to.exist
                })
            })
    })
})
//Select Plan 
Cypress.Commands.add('Plan_travel_ar', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.plans_select_button).click()

        cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
            expect($loading).not.to.exist
        })

    })
})
//Pyment page Checking
Cypress.Commands.add('Checking_travel_ar', () => {
    cy.fixture('locators').then((x) => {
        cy.fixture('locators').then((x) => {
            //checking insured details
            cy.get(x.review_items)
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
//Edit
Cypress.Commands.add('Edit_travel_ar', () => {
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
Cypress.Commands.add('Payment_travel_ar', () => {
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

// PUERTO RICO //
// Travel Date 
Cypress.Commands.add('Date_travel_pr', () => {
    cy.fixture('locators').then((x) => {
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

        cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
            expect($loading).not.to.exist
        })
    })
})
// Select Plan
Cypress.Commands.add('Plan_travel_pr', () => {
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
//Pyment page Checking
Cypress.Commands.add('Checking_travel_pr', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.collapsable_bar).click()
        cy.get(x.review_items)
            .should('contain.text', person.name)
            .and('contain.text', person.last_name)
            .and('contain.text', person.phone_1)
            .and('contain.text', person.email)
            .and('contain.text', address.line1)
            .and('contain.text', address_pr.city)
            .and('contain.text', address_pr.zipcode)
    })
})
//Edit
Cypress.Commands.add('Edit_travel_pr', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.input_address_1).clear()
            .type(address.line2)
        cy.get(x.forward_button).click()

        cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
            expect($loading).not.to.exist
        })
        cy.get(x.collapsable_bar).click()
        cy.get(x.review_items)
            .should('contain.text', address.line2)
    })
})
// Payment Page  
Cypress.Commands.add('Payment_travel_pr', () => {
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
//Pyment page Checking
Cypress.Commands.add('Checking_travel_br', () => {
    cy.fixture('locators').then((x) => {
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
    })
})
// Payment Page 
Cypress.Commands.add('Payment_travel_br', () => {
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


