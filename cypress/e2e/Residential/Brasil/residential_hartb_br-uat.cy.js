import 'cypress-iframe'
import { person, address, address_br } from '../../../support/objects_mobile';
import { r } from '../../../support/commands_residential';
var env = 'uat'
let n = 0

describe('Residential hartb  BRASIL', () => {
    //Page 1
    it('Quote and Select Plan', () => {
        cy.visit('https://la.studio-uat.chubb.com/br/hartb/residential/launchstage/pt-BR')
        cy.fixture('locators').then((x) => {
            cy.get(x.button_1).click()
                .wait(500)

            cy.get(x.plans_select_button).should('have.length.greaterThan', 0)
                .its('length')
                .then(cy.log)
                .then(() => {
                    n = Cypress._.random(0, 2)
                    cy.log(n)
                    cy.get(x.plans_select_button).eq(n).click()
                })
                .wait(500)
        })
    })


    // Page 3    
    it('Personal Details ', () => {
        cy.details_residential_br()

    })

    //Page 4
    it('Pyment page - Checking personal details information', () => {
        cy.fixture('locators').then((x) => {
            //checking insured details
            cy.get('.review__item--applicant-details')
                .should('contain.text', person.name)
                .and('contain.text', person.last_name)
                .and('contain.text', person.phone_2)
                .and('contain.text', person.email)
            cy.get('.review__item--insured-address')
                .should('contain.text', address_br.zipcode)
                .and('contain.text', address.line1)
                .and('contain.text', address_br.ext_num)
                .and('contain.text', address.line1)
                .and('contain.text', address_br.barrio)
                .and('contain.text', address_br.city)
                .and('contain.text', address_br.province)
            cy.log(r)
            if (r > 2) {
                cy.get('.review__item--billing-address')
                    .should('contain.text', address_br.zipcode_1)
                    .and('contain.text', address.line1)
                    .and('contain.text', address_br.ext_num)
                    .and('contain.text', address.line1)
                    .and('contain.text', address_br.barrio_1)

            } else {
                cy.get('.review__item--billing-address')
                    .should('contain.text', address_br.zipcode)
                    .and('contain.text', address.line1)
                    .and('contain.text', address_br.ext_num)
                    .and('contain.text', address.line1)
                    .and('contain.text', address_br.barrio)
                    .and('contain.text', address_br.city)
                    .and('contain.text', address_br.province)
            }


        })
    })


    it('Pyment page - Testing that the edit button returns to the Personal Details page', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.edit_button).eq(1).click()
                .wait(5000)
                .get(x.input_address_1).type(address.line2)
                .get(x.input_address_3).type(address_br.barrio)
                .get(x.input_city).type(address_br.city)
                .get(x.input_province).type(address_br.province)
            cy.get('body').then(($body) => {
                if ($body.find(x.input_add_3_Billing).is(':visible')) {
                    cy.get(x.input_add_1_Billing).type(address.line1)
                    cy.get(x.input_add_3_Billing).type(address_br.barrio_1)
                }
            })

            cy.get(x.checkboxes).click({ multiple: true })
                .wait(1000)
            cy.get(x.forward_button).click()
                .wait(5000)

            cy.get('.review__item--insured-address')
                .should('contain.text', address.line2)
        })
    })

    it('Payment page', () => {
        cy.fixture('locators').then((x) => {

            cy.payment_residential_br()

            if (env != 'prod') {
                cy.wait(1000)
                cy.get(x.forward_button).click()

            }
        })

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







