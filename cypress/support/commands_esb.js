import {  payment } from '../support/objects_mobile'


// PUERTO RICO
// Payment Page 
Cypress.Commands.add('payment_esb_pr', () => {
    cy.fixture('locators').then((x) => {
        cy.wait(1000)
        cy.log('////// Radio Group - 1 /////')
        cy.get(x.radio_group)
            .find(x.check_outer_circle).eq(0).click({ force: true })
        cy.wait(1000)

        cy.iframe(' .payment-field-iframe > .tokenex-iframe > iframe:first').then(($) => {
            cy.wrap($[0])
                .find(x.input_card).click()
                .type(payment.visa_card_num_1)
                .wait(500)
                .get(x.input_card_name).type(payment.card_holder)
                .get(x.input_expiry_date).click()
                .type(payment.expiration_date_2)
        })

        cy.iframe('#cvv > iframe:first').then($iframes => {
            cy.wrap($iframes[0])
                .find(x.input_cvv).click()
                .type(payment.cvv_1)
                .get(x.checkboxes).check({ force: true }).should('be.checked')
                .get(x.input_expiry_date).click()
                .wait(1000)
                .get(x.forward_button).should('be.enabled')

        })
        // cy.url().then((url) => {
        //     if (url.includes('https://la.studio-uat.chubb.com/')) {
        //         cy.wait(1000)
        //         cy.get(x.forward_button).click()
        //         cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
        //             expect($loading).not.to.exist
        //         })
        //     }
        // })
    })
})
//Congratulations
// Cypress.Commands.add('Congratulations', () => {
//     cy.fixture('locators').then((x) => {
//         cy.get(x.thank_you_text).should('contain.text', '¡Felicidades ')
//             .and('contain.text', 'Leonel')
//             .and('contain.text', ', ya cuentas con tu póliza de seguro!')
//             .get(x.thank_you_email_text).should('contain.text', person.email)
//         cy.get(x.thankyou__button).click()
//     })
// })


               




        
        