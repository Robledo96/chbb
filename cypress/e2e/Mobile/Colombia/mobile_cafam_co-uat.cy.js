
import 'cypress-iframe'
import { person, address, address_co } from '../../../support/objects_mobile'
var env = 'uat'


describe('Mobile CAFAM-CO', () => {
    //Page 1
    it('Quote', () => {
        cy.visit('https://la.studio-uat.chubb.com/co/cafam/mobile/COAS600001/es-CO')
        cy.quote()
    })
    //Page 2
    it('Select Plan', () => {
        cy.fixture('locators_mobile').then((x) => {
            cy.get(x.plans_select_button).click()
        }).wait(500)
    })
    // Page 3    
    it('Personal Details ', () => {
        cy.personal_details_cafam_co()

    })
    //Page 4

    it('Pyment page - Checking personal details information', () => {
        cy.fixture('locators_mobile').then((x) => {
            //checking insured details
            cy.get(x.review_items)
                .should('contain.text', person.name)
                .and('contain.text', person.last_name)
                .and('contain.text', person.phone_3)
                .and('contain.text', person.email)
                .and('contain.text', address.line1)
                .and('contain.text', address_co.departamento)
                .and('contain.text', address_co.city)


        })
    })


    it('Pyment page - Testing that the edit button returns to the Personal Details page', () => {
        cy.fixture('locators_mobile').then((x) => {
            cy.get(x.edit_button).click() //edit button
                .wait(5000)
            cy.get(x.input_address_1).clear()
                .type(address.line2)
            cy.get(x.forward_button).click()
                .wait(5000)
            cy.get(x.review_items)
                .should('contain.text', address.line2)
        })
    })
    it('Payment page', () => {
        cy.fixture('locators_mobile').then((x) => {
            cy.payment_page_cafam_co()

            if (env != 'prod') {
                cy.wait(1000)
                cy.get(x.forward_button).click()

            }
        })

    })

    // Page 5 Thank you
    it('Should text Congratulations', () => {
        cy.fixture('locators_mobile').then((x) => {
            cy.get(x.thank_you_text).should('contain.text', '¡Felicidades ')
                .and('contain.text', 'Leonel')
                .and('contain.text', ', ya cuentas con tu póliza de seguro!')
                .get(x.thank_you_email_text).should('contain.text', person.email)
            cy.get(x.thankyou__button).click()
        })
    })
})







