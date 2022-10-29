
import 'cypress-iframe'
import { person, address, address_co } from '../../../support/objects_mobile';


describe('Residential falabella COLOMBIA', () => {
    //Page 1
    it('Quote and Select Plan', () => {
        cy.visit('https://la.studio-uat.chubb.com/co/falabella/residential/launchstage/es-CO')

        cy.fixture('locators').then((x) => {
            cy.get(x.button_1).click()
                .wait(500)
            cy.log('////// Radio Group //////')
            cy.get(x.radio_group)
                .find(x.check_outer_circle).should('have.length.greaterThan', 0)
                .its('length').then(($length) => {
                    cy.get(x.check_outer_circle).eq(Cypress._.random($length - 1)).click({ force: true })
                        .get(x.quote_button).click()

                    cy.get('.loading-indicator__container').should(($loading) => {
                        expect($loading).not.to.exist
                    })
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
    it('Personal Details ', () => {
        cy.details_residential_co()

    })

    it('Pyment page - Checking personal details information', () => {
        cy.fixture('locators').then((x) => {
            //checking insured details
            cy.get(x.collapsable_bar).click()
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
            cy.get('.loading-indicator__container').should(($loading) => {
                expect($loading).not.to.exist
            })
            cy.get(x.input_address_1).clear()
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
        cy.payment_residential_co()



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





