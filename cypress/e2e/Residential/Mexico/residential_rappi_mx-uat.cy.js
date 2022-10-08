import 'cypress-iframe'
import { person, address, address_mx } from '../../../support/objects_mobile';
var env = 'uat'


describe('Residential MEXICO', () => {
    //Page 1
    it('Quote and Select Plan', () => {
        cy.visit('https://la.studio-uat.chubb.com/mx/rappi/residential/launchstage/es-MX')

        cy.fixture('locators').then((x) => {
            cy.get(x.button_2).click()
                .wait(500)
            cy.get(x.plans_select_button).click()
                .wait(500)
        })
    })
    it('Personal Details ', () => {
        cy.residential_mx()

    })

    it('Pyment page - Checking personal details information', () => {
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


    it('Pyment page - Testing that the edit button returns to the Personal Details page', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.edit_button).click() //edit button
                .wait(5000)
                .get(x.input_colonia_1).click({ force: true })
                .wait(1000)
                .get(x.colonia_option_text).first().click({ force: true })
                .wait(1000)
            cy.get(x.input_address_1).clear()
                .type(address.line2)
            cy.get(x.forward_button).click()
                .wait(5000)
            cy.get(x.review_items)
                .should('contain.text', address.line2)
        })
    })
    it('Payment page', () => {
        cy.fixture('locators').then((x) => {
            let n = 0
            cy.get(x.radio_group)
                .find(x.check_outer_circle).should('have.length.greaterThan', 0)
                .its('length')
                .then(cy.log)
                .then(() => {
                    n = Cypress._.random(0, 1)
                    cy.log(n)
                    cy.get(x.check_outer_circle).eq(n).click({ force: true })
                })
            cy.payment_page_mx()

            if (env != 'prod') {
                cy.wait(1000)
                cy.get(x.forward_button).click()

            }
        })


    })
    it('Should text Congratulations', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.thank_you_text).should('contain.text', '¡Felicidades ')
                .and('contain.text', 'Leonel')
                .and('contain.text', ', ya cuentas con tu póliza de seguro!')
                .get(x.thank_you_email_text).should('contain.text', person.email)
            cy.get(x.thankyou__button).click()
        })
    })
})

