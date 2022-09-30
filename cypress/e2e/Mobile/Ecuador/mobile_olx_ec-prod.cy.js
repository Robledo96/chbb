import 'cypress-iframe'
import { person, address_ec } from '../../../support/objects_mobile'
var env = 'prod'

describe('Mobile OLX EC-uat', () => {
    //Page 1
    it('Quote and Select Plan', () => {
        cy.visit('https://la.studio.chubb.com/ec/olx/mobile/ECE5200001/es-EC')
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
        cy.fixture('locators_mobile').then((x) => {
            cy.personal_details_ec()
        })
    })
    //Page 4
    it('Pyment page - Checking personal details information', () => {
        cy.fixture('locators_mobile').then((x) => {
            //checking insured details
            cy.get(x.review_value).first()
                .find('.review__value-text').should('contain.text', person.name)
            cy.get(x.review_value).eq(1)
                .find('.review__value-text').should('contain.text', person.last_name)
            cy.get(x.review_value).eq(5)
                .find('.review__value-text').should('contain.text', person.phone)
            cy.get(x.review_value).eq(6)
                .find('.review__value-text').should('contain.text', person.email)
            cy.get(x.review_value).eq(7)
                .find('.review__value-text').should('contain.text', address_ec.line1)
            cy.get(x.review_value).eq(9)
                .find('.review__value-text').should('contain.text', address_ec.city)
            cy.get(x.review_value).eq(10)
                .find('.review__value-text').should('contain.text', address_ec.province)

        })
    })
    it('Pyment page -  Testing to edit personal data', () => {
        cy.fixture('locators_mobile').then((x) => {
            cy.get(x.edit_button).click()
            cy.get(x.input_address).clear()
                .type(address_ec.line2)
                .get(x.forward_button).click()
            cy.get(x.review_items)
                .should('contain.text', address_ec.line2)
                .wait(1000)
        })
    })
    it('Payment page', () => {
        cy.wait(500)
        cy.payment_page_olx_ec(env)
            .wait(5000)
    })
//     // Page 5 Thank you
//     it('Should text Congratulations', () => {
//         cy.fixture('locators_mobile').then((x) => {
//             cy.get(x.thank_you_text).should('contain.text', '¡Felicidades ')
//                 .and('contain.text', 'Leonel')
//                 .and('contain.text', ', ya cuentas con tu póliza de seguro!')
//                 .get(x.thank_you_email_text).should('contain.text', person.email)
//             cy.get(x.thankyou__button).click()
//         })
//     })
})


