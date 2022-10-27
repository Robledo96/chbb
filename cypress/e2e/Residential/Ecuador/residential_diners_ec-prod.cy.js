
import 'cypress-iframe'
import { person, address, address_ec } from '../../../support/objects_mobile'


describe('Residential diners EC', () => {
    //Page 1
    it('Quote and Select Plan', () => {
        cy.visit('https://la.studio.chubb.com/ec/diners/residential/launchstage/es-EC')

        cy.fixture('locators').then((x) => {
            cy.get(x.button_1).click()
                .wait(500)
            cy.log('////// Radio Group //////')
            cy.get(x.radio_group)
                .find(x.check_outer_circle).should('have.length.greaterThan', 0)
                .its('length').then(($length) => {
                    cy.get(x.check_outer_circle).eq(Cypress._.random($length - 1)).click({ force: true })
                        .get(x.quote_button).click()
                })
            cy.get('.loading-indicator__container').should(($loading) => {
                expect($loading).not.to.exist
            })

            cy.log('////// Select Plan //////')
            cy.get(x.plans_select_button).should('have.length.greaterThan', 0)
                .its('length').then(($length) => {
                    cy.get(x.plans_select_button).eq(Cypress._.random($length - 1)).click()
                })
            cy.get('.loading-indicator__container').should(($loading) => {
                expect($loading).not.to.exist
            })
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
            cy.get('.loading-indicator__container').should(($loading) => {
                expect($loading).not.to.exist
            })
            cy.get(x.input_address_1).clear()
                .type(address.line2)
                .get(x.forward_button).click()
            cy.get('.loading-indicator__container').should(($loading) => {
                expect($loading).not.to.exist
            })
            cy.get(x.review_items)
                .should('contain.text', address.line2)

        })
    })
    it('Payment page', () => {
        cy.payment_residential_ec()


    })


})





