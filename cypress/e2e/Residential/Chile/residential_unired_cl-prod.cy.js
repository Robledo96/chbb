
import 'cypress-iframe'
import { person, address } from '../../../support/objects_mobile';


describe('Residential unired CHILE', () => {

    it('Quote and Select Plan', () => {
        cy.visit('https://la.studio.chubb.com/cl/unired/residential/launchstage/es-CL')

        cy.quote_residential_cl()

    })
    it('Personal Details ', () => {
        cy.details_residential_cl()

    })
    //Page 4

    it('Pyment page - Checking personal details information', () => {
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


    it('Pyment page - Testing that the edit button returns to the Personal Details page', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.edit_button).click() //edit button
            cy.get('.loading-indicator__container').should(($loading) => {
                expect($loading).not.to.exist
            })
            cy.get(x.input_address_1).clear()
                .type(address.line2)
            cy.get(x.forward_button).click()
            cy.get('.loading-indicator__container').should(($loading) => {
                expect($loading).not.to.exist
            })
            cy.get(x.review_items)
                .should('contain.text', address.line2)
        })
    })
    it('Payment page', () => {

        cy.payment_residential_cl()


    })
})







