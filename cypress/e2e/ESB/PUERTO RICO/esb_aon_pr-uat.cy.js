import 'cypress-iframe'
import { person } from '../../../support/objects_mobile'

describe('ESB aon PUERTO RICO', () => {
    //Page 1
    it('Travel Date / Select Plan / Personal Details', () => {
        cy.visit('https://la.studio-uat.chubb.com/pr/aon/esb/launchstage/es-PR')

        cy.esb_pr()
    })

    it('Payment page', () => {
        cy.payment_esb_pr()

})

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

