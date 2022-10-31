import 'cypress-iframe'
import { person, address, address_co } from '../../../support/objects_mobile';


describe('HC coomeva COLOMBIA', () => {
    //Page 1
    it('Quote / Select Plan / Personal Details', () => {
        cy.visit('https://la.studio.chubb.com/co/coomeva/hc/launchstage/es-CO')

        cy.hc_co()
    })

    it('Pyment page - Checking personal details information', () => {
        cy.fixture('locators').then((x) => {
            //checking insured details
            cy.get(x.review_items)
                .should('contain.text', person.name)
                .and('contain.text', person.last_name)
                .and('contain.text', person.phone_3)
                .and('contain.text', person.email)
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

        cy.payment_hc_co()


    })


})

