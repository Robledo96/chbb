import 'cypress-iframe'
import { person, address, address_mx } from '../../../support/objects_mobile';


describe('cyber rappi MEXICO', () => {
    //Page 1
    it('Quote / Select Plan / Personal Details', () => {
        cy.visit('https://la.studio.chubb.com/mx/rappi/cyber/launchstage/es-MX')

        cy.cyber_mx()
    })

    it('Pyment page - Checking personal details information', () => {
        cy.fixture('locators').then((x) => {
            //checking insured details
            cy.get(x.review_items)
                .should('contain.text', person.name)
                .and('contain.text', person.last_name)
                .and('contain.text', person.phone_1)
                .and('contain.text', person.email)
                .and('contain.text', address_mx.zipcode)
                .and('contain.text', address_mx.colonia)
                .and('contain.text', address.line1)
        })
    })


    it('Pyment page - Testing that the edit button returns to the Personal Details page', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.edit_button).click() //edit button
            cy.get('.loading-indicator__container').should(($loading) => {
                expect($loading).not.to.exist
            })
            cy.wait(3000)
            // Captcha
            cy.log('////// Conditional - Captcha //////')
            cy.get('body').then($body => {
                if ($body.find('.captcha-modal', { timeout: 60000 }).length > 0) {
                    cy.log('////// True //////')
                    cy.get('.captcha-modal', { timeout: 60000 }).click({ force: true })
                    cy.get('.captcha-modal__content .captcha-modal__question').invoke('text').then((text) => {
                        let textop = text
                        let finaltx = textop.trim()
                        let finaladd = 0
                        let newtext = finaltx.split(" ")
                        if (newtext[1] == '+') {
                            finaladd = parseInt(newtext[0]) + parseInt(newtext[2].trim())
                            // cy.log(finaladd + " plus")
                        } else if (newtext[1] == '-') {
                            finaladd = parseInt(newtext[0]) - parseInt(newtext[2].trim())
                            // cy.log(finaladd + " minus")
                        }
                        cy.get('[name="captchaVal"]').first().type(finaladd)
                        cy.get("[type='Submit']").click()
                    })
                }
            })
                .wait(1000)
                .get(x.input_colonia).click({ force: true })
                .wait(1000)
                .get(x.colonia_option_text).first().click({ force: true })
                .wait(1000)
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

        cy.payment_cyber_mx()


    })


})

