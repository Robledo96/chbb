
import 'cypress-iframe'
import { person, address_mx } from '../../../support/objects_mobile';
var env = 'uat'


describe('Mobile diners EC-uat', () => {
    //Page 1
    it('Quote', () => {
        cy.visit('https://la.studio-uat.chubb.com/mx/rappi/mobile/launchstage/es-MX')
        cy.quote_mx()
    })
    //Page 2
    it('Select Plan', () => {
        cy.fixture('locators_mobile').then((x) => {
            cy.get(x.plans_select_button).click()
        }).wait(500)
    })
    // Page 3    
    it('Personal Details ', () => {
        cy.personal_details_mx()

    })
    //Page 4

    it('Pyment page - Checking personal details information', () => {
        cy.fixture('locators_mobile').then((x) => {
            //checking insured details
            cy.get(x.collapsable_bar).click()
                .get('.review__item')
            cy.get(x.review_value).first()
                .find('.review__value-text').should('contain.text', person.name)
            cy.get(x.review_value).eq(1)
                .find('.review__value-text').should('contain.text', person.last_name)
            cy.get(x.review_value).eq(6)
                .find('.review__value-text').should('contain.text', person.phone_1)
            cy.get(x.review_value).eq(7)
                .find('.review__value-text').should('contain.text', person.email)
            cy.get(x.review_value).eq(8)
                .find('.review__value-text').should('contain.text', address_mx.zipcode)
            cy.get(x.review_value).eq(9)
                .find('.review__value-text').should('contain.text', address_mx.colonia)
            cy.get(x.review_value).eq(10)
                .find('.review__value-text').should('contain.text', address_mx.line1)

        })
    })


    it('Pyment page - Testing that the edit button returns to the Personal Details page', () => {
        cy.fixture('locators_mobile').then((x) => {
            cy.get(x.edit_button).click() //edit button
                .wait(5000)
                .get("[placeholder='Ingresa tu Colonia']").click({ force: true })
                .wait(1000)
                .get('.mat-option-text>.crux-autocomplete__option-title').first().click({ force: true })
                .wait(1000)
            cy.get(x.input_address).clear()
                .type(address_mx.line2)
            cy.get(x.forward_button).click()
                .wait(5000)
            cy.get(x.collapsable_bar).click()
            cy.get(x.review_items)
                .get(x.review_value).eq(10)
                .find('.review__value-text').should('contain.text', address_mx.line2)
        })
    })
    it('Payment page', () => {
        cy.get('.mat-radio-group')
            .find('.mat-radio-outer-circle').should('have.length.greaterThan', 0)
            .its('length').then(cy.log)
            .then((n) => Cypress._.random(0, n - 1))
            .then((k) => {
                cy.log(k)
                cy.get('.mat-radio-outer-circle').eq(k).click({ force: true })

            })
        cy.payment_page_diners_mx(env)

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







