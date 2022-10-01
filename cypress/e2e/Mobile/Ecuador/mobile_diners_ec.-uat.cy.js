
import 'cypress-iframe'
import { person, address_ec } from '../../../support/objects_mobile'
var env = 'uat'




describe('Mobile diners EC', () => {
    //Page 1
    it('Quote', () => {
        cy.visit('https://la.studio-uat.chubb.com/ec/diners/mobile/ECBK200001/es-EC')
        cy.quote_ec()
    })
    //Page 2
    it('Select Plan', () => {
        cy.fixture('locators_mobile').then((x) => {
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
        cy.fixture('locators_mobile').then((x) => {
            //checking insured details
            cy.get(x.collapsable_bar).click()
            cy.get(x.review_items)
                .should('contain.text', person.name)
                .and('contain.text', person.last_name)
                .and('contain.text', 'Masculino')
                .and('contain.text', person.phone)
                .and('contain.text', person.email)
                .and('contain.text', address_ec.line1)
                .and('contain.text', address_ec.city)
                .and('contain.text', address_ec.province)
        })
    })
    it('Pyment page - Testing to edit personal data', () => {
        cy.fixture('locators_mobile').then((x) => {
            cy.get(x.edit_button).click()
            cy.get(x.input_address).clear()
                .type(address_ec.line2)
                .get(x.forward_button).click()
            cy.get(x.collapsable_bar).click()
            cy.get(x.review_items)
                .should('contain.text', address_ec.line2)

        })
    })
    it('Payment page', () => {
        cy.wait(500)
        cy.payment_page_diners_ec(env)
            .wait(5000)

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







