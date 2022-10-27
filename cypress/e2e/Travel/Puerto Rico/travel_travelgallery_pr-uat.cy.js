
import 'cypress-iframe'
import { person, address, address_pr } from '../../../support/objects_mobile';

describe('Travel travelgallery PUERTO RICO', () => {
    //Page 1
    it('Travel Date / Number of Travelers / Select Plan / Personal Details', () => {
        cy.visit('https://la.studio-uat.chubb.com/pr/travelgallery/travel/launchstage/es-PR')

        cy.travel_info_pr()
    })

    it('Pyment page - Checking personal details information', () => {
        cy.fixture('locators').then((x) => {
            //checking insured details
            cy.get(x.collapsable_bar).click()
            cy.get(x.review_items)
                .should('contain.text', person.name)
                .and('contain.text', person.last_name)
                .and('contain.text', person.phone_1)
                .and('contain.text', person.email)
                .and('contain.text', address.line1)
                .and('contain.text', address_pr.city)
                .and('contain.text', address_pr.zipcode)
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
            cy.get(x.collapsable_bar).click()
            cy.get(x.review_items)
                .should('contain.text', address.line2)
        })
    })
    it('Payment page', () => {
            cy.payment_travel_pr()

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












