import 'cypress-iframe'
import { person, address, address_br } from '../../../support/objects_mobile';

describe('Mobile BRASIL', () => {

    //Page 1
    it('Quote / Select Plan', () => {
        cy.visit('https://la.studio-uat.chubb.com/br/hartb/mobile/launchstage/pt-BR')

        cy.quote()
    })

    // Page 3    
    it('Personal Details ', () => {
        cy.personal_details_br()

    })

    //Page 4
    it('Pyment page - Checking personal details information', () => {
        cy.fixture('locators').then((x) => {
            //checking insured details
            cy.get(x.review_items)
                .should('contain.text', person.name)
                .and('contain.text', person.last_name)
                .and('contain.text', person.phone_2)
                .and('contain.text', person.email)
                .and('contain.text', address_br.zipcode)
                .and('contain.text', address.line1)
                .and('contain.text', address_br.ext_num)
                .and('contain.text', address.line1)
                .and('contain.text', address_br.barrio)
                .and('contain.text', address_br.city)
                .and('contain.text', address_br.province)

        })
    })


    it('Pyment page - Testing that the edit button returns to the Personal Details page', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.edit_button).click()
            cy.get('.loading-indicator__container').should(($loading) => {
                expect($loading).not.to.exist
            })
                .get(x.input_address_1).type(address.line2)
                .get(x.input_address_3).type(address_br.barrio)
                .wait(1000)
                .get(x.input_city).type(address_br.city)
                .wait(1000)
                .get(x.input_province).type(address_br.province)
                .wait(1000)
                .get(x.checkboxes).click({ multiple: true })
                .wait(1000)
            cy.get(x.forward_button).click()
            cy.get('.loading-indicator__container').should(($loading) => {
                expect($loading).not.to.exist
            })
            cy.get(x.review_items)
                .should('contain.text', address.line2)
                .and('contain.text', address.line1)
                .and('contain.text', address_br.barrio)
                .and('contain.text', address_br.city)
                .and('contain.text', address_br.province)
        })
    })

    it('Payment page', () => {

        cy.payment_page_br()


    })
    // Page 5 Thank you
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







