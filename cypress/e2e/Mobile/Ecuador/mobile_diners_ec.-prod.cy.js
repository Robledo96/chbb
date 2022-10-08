import 'cypress-iframe'
import { person, address, address_ec } from '../../../support/objects_mobile'
var env = 'prod'

describe('Mobile diners EC', () => {
    //Page 1
    it('Quote', () => {
        cy.visit('https://la.studio.chubb.com/ec/diners/mobile/ECBK200001/es-EC')
        cy.quote()
    })
    //Page 2
    it('Select Plan', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.plans_select_button).click()
                .wait(500)
        })
    })
    // Page 3    
    it('Personal Details ', () => {
        cy.personal_details_ec()
    })
    //Page 4
    it('Pyment page - Checking personal details information', () => {
        cy.fixture('locators').then((x) => {
            //checking insured details
            cy.get(x.collapsable_bar).click()
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
            cy.get(x.collapsable_bar).click()
            cy.get(x.review_items)
                .should('contain.text', address.line2)

        })
    })
    it('Payment page', () => {
        cy.fixture('locators').then((x) => {
            cy.wait(500)
            cy.payment_page_ec()
                .wait(5000)
            if (env != 'prod') {
                cy.get(x.forward_button).click()

            }
        })
    })
})














