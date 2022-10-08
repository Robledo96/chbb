
import 'cypress-iframe'
import { person, address, address_co } from '../../../support/objects_mobile';
var env = 'uat'
let n = 0


describe('Residential COLOMBIA', () => {
    //Page 1
    it('Quote and Select Plan', () => {
        cy.visit('https://la.studio-uat.chubb.com/co/colsubsidio/residential/launchstage/es-CO')

        cy.fixture('locators').then((x) => {
            cy.get(x.button_1).click()
                .wait(1000)
            cy.get(x.plans_select_button).should('have.length.greaterThan', 0)
                .its('length')
                .then(cy.log)
                .then(() => {
                    n = Cypress._.random(0, 2)
                    cy.log(n)
                    cy.get(x.plans_select_button).eq(n).click()
                })
                .wait(500)
        })
    })
    it('Personal Details ', () => {
        cy.details_residential_co()

    })

    it('Pyment page - Checking personal details information', () => {
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


    it('Pyment page - Testing that the edit button returns to the Personal Details page', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.edit_button).click() //edit button
                .wait(5000)
                .get(x.input_address_1).clear()
                .type(address.line2)
            cy.get(x.forward_button).click()
                .wait(5000)
            cy.get(x.review_items)
                .should('contain.text', address.line2)
        })
    })
    it('Payment page', () => {
        cy.fixture('locators').then((x) => {
            cy.payment_residential_co()

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






