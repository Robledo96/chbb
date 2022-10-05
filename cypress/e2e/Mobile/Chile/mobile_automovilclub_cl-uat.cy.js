
import 'cypress-iframe'
import { person, address } from '../../../support/objects_mobile';
import { rut } from '../../../support/commands_mobile'
var env = 'uat'


describe('Mobile automovilclub CL', () => {
    //Page 1
    it('Quote', () => {
        cy.visit('https://la.studio-uat.chubb.com/cl/automovilclub/mobile/launchstage/es-CL')
        cy.quote()
    })
    //Page 2
    it('Select Plan', () => {
        cy.fixture('locators_mobile').then((x) => {
            cy.get(x.plans_select_button).click()
        }).wait(500)
    })
    // Page 3    
    it('Personal Details ', () => {
        cy.personal_details_automovilclub_cl()

    })
    //Page 4

    it('Pyment page - Checking personal details information', () => {
        cy.fixture('locators_mobile').then((x) => {
            //checking insured details
            cy.get(x.collapsable_bar).click()
            cy.get(x.review_items)
                .should('contain.text', person.name)
                .and('contain.text', person.last_name)
                .and('contain.text', rut)
                .and('contain.text', person.phone_cl)
                .and('contain.text', person.email)
                .and('contain.text', address.line1)

        })
    })


    it('Pyment page - Testing that the edit button returns to the Personal Details page', () => {
        cy.fixture('locators_mobile').then((x) => {
            cy.get(x.edit_button).click() //edit button
                .wait(5000)
            cy.get(x.input_address).clear()
                .type(address.line2)
            cy.get(x.forward_button).click()
                .wait(5000)
            cy.get(x.collapsable_bar).click()
            cy.get(x.review_items)
                .should('contain.text', address.line2)
        })
    })
    it('Payment page', () => {
        cy.fixture('locators_mobile').then((x) => {

            cy.payment_page_rappi_mx()

            if (env != 'prod') {
                cy.wait(1000)
                cy.get(x.forward_button).click()

            }
        })

    })
    // Page 5 Thank you
    // it('Should text Congratulations', () => {
    //     cy.fixture('locators_mobile').then((x) => {
    //         cy.get(x.thank_you_text).should('contain.text', '¡Felicidades ')
    //             .and('contain.text', 'Leonel')
    //             .and('contain.text', ', ya cuentas con tu póliza de seguro!')
    //             .get(x.thank_you_email_text).should('contain.text', person.email)
    //         cy.get(x.thankyou__button).click()
    //     })
    // })
})







