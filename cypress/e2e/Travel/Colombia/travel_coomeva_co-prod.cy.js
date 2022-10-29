
import 'cypress-iframe'
import { person, address, address_co } from '../../../support/objects_mobile';

describe('Travel coomeva COLOMBIA', () => {

    it('TRAVEL DATE / SELECT PLAN', () => {
        cy.visit('https://la.studio.chubb.com/co/coomeva/travel/launchstage/es-CO')

        cy.travel_date_co()
    })

    it('Number of Travelers / Personal Details ', () => {
        cy.details_travel_co()

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
                .and('contain.text', address_co.department)
                .and('contain.text', address_co.city)
        })
    })


    it('Pyment page - Testing that the edit button returns to the Personal Details page', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.edit_button).click() //edit button

            cy.get('.loading-indicator__container').should(($loading) => {
                expect($loading).not.to.exist
            })
                .get(x.input_address_1).clear()
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
        cy.fixture('locators').then((x) => {
            cy.payment_travel_co()

           
        })


    })

})





