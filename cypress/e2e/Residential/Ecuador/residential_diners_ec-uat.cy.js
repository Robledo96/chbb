
import 'cypress-iframe'
import { person, address, address_ec } from '../../../support/objects_mobile'
var env = 'uat'
let n = 0

describe('Residential diners EC', () => {
    //Page 1
    it('Quote and Select Plan', () => {
        cy.visit('https://la.studio-uat.chubb.com/ec/diners/residential/launchstage/es-EC')

        cy.fixture('locators').then((x) => {
            cy.get(x.button_1).click()
                .wait(500)

            cy.get(x.radio_group)
                .find(x.check_outer_circle).should('have.length.greaterThan', 0)
                .its('length')
                .then(cy.log)
                .then(() => {
                    n = Cypress._.random(0, 1)
                    cy.log(n)
                    cy.get(x.check_outer_circle).eq(n).click({ force: true })
                        .get(x.button_2).click()
                        .wait(1000)
                })
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
    // Page 3    
    it('Personal Details ', () => {
        cy.details_residential_ec()
    })
    //Page 4
    it('Pyment page - Checking personal details information', () => {
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
    it('Pyment page - Testing to edit personal data', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.edit_button).click()
            cy.get(x.input_address_1).clear()
                .type(address.line2)
                .get(x.forward_button).click()
            cy.get(x.review_items)
                .should('contain.text', address.line2)

        })
    })
    it('Payment page', () => {
        cy.fixture('locators').then((x) => {
            cy.payment_residential_ec()
            
            if (env != 'prod') {
                cy.get(x.forward_button).click()
                cy.wait(10000)

            }
        })
    })

    // Page 5 Thank you
    it('Should text Congratulations', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.thank_you_text).should('contain.text', '¡Felicidades ')
                .and('contain.text', person.name)
                .and('contain.text', ', ya estas asegurado!')
                .and('contain.text', person.email)
            cy.get(x.thankyou__button).click()
        })
    })
})





