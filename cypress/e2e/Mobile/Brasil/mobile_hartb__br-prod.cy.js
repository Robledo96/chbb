import 'cypress-iframe'
import { person, address, address_br } from '../../../support/objects_mobile';
var env = 'prod'

describe('Mobile BRASIL', () => {
    //Page 1
    it('Quote', () => {
        cy.visit('https://la.studio.chubb.com/br/hartb/mobile/launchstage/pt-BR')
        cy.quote()
    })
    
    //Page 2
    it('Select Plan', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.plans_select_button).click()
        }).wait(500)
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
                .wait(5000)
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
                .wait(5000)

            cy.get(x.review_items)
                .should('contain.text', address.line2)
                .and('contain.text', address.line1)
                .and('contain.text', address_br.barrio)
                .and('contain.text', address_br.city)
                .and('contain.text', address_br.province)
        })
    })

    it('Payment page', () => {
        cy.fixture('locators').then((x) => {

            cy.payment_page_br()

            if (env != 'prod') {
                cy.wait(1000)
                cy.get(x.forward_button).click()

            }
        })

    })

})







