import { payment } from '../support/objects_mobile'



// CHILE //
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
        // cy.url().then((url) => {
        //     if (url.includes('https://la.studio-uat.chubb.com/')) {
        //         cy.wait(1000)
        //         cy.get(x.forward_button).click()

        //     }
        //     cy.get('.loading-indicator__container').should(($loading) => {
        //         expect($loading).not.to.exist
        //     })
        // })
    })
})


// ECUADOR //
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
        // cy.url().then((url) => {
        //     if (url.includes('https://la.studio-uat.chubb.com/')) {
        //         cy.wait(1000)
        //         cy.get(x.forward_button).click()

        //     }
        //     cy.get('.loading-indicator__container').should(($loading) => {
        //         expect($loading).not.to.exist
        //     })
        // })
    })
})

// PERU //
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

// PANAMA //
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





