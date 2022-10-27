import 'cypress-iframe'
import { person, address, address_ar } from '../../../support/objects_mobile';


describe('Travel plataforma10 ARGENTINA', () => {
    //Page 1
    it(' Travel Date / Select Plan', () => {
        cy.visit('https://la.studio.chubb.com/ar/plataforma10/travel/launchstage/es-AR')

        cy.travel_date_ar()
    })

    it('Number of travelers / Personal Details', () => {
        cy.details_travel_ar()

    })

    it('Pyment page - Checking personal details information', () => {
        cy.fixture('locators').then((x) => {
            //checking insured details
            cy.get(x.review_items)
                .should('contain.text', person.name)
                .and('contain.text', person.last_name)
                .and('contain.text', person.phone_1)
                .and('contain.text', person.email)
                .and('contain.text', address.line1)
                .and('contain.text', address.line1)
                .and('contain.text', address_ar.localidad)
                .and('contain.text', address_ar.city)
                .and('contain.text', address_ar.province)
                .and('contain.text', address_ar.zipcode)


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

            cy.payment_page_ar()

    })

})






