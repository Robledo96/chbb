import 'cypress-iframe'
import { person } from '../../../support/objects_mobile';

describe('Life Buk Chile', () => {
    //Page 1
    it('Quote / Select Plan / Personal Details', () => {
        cy.visit('https://la.studio-uat.chubb.com/cl/buk/life/launchstage/es-CL')

        cy.life_cl()
    })


    it('Payment page', () => {

        cy.payment_life_cl()


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





