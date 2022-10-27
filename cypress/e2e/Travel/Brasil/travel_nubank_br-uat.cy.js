
import 'cypress-iframe'
import { person } from '../../../support/objects_mobile';



describe('Travel nubank BRASIL', () => {
    //Page 1
    it('Travel Date / Number of Travelers / Select Plan / Personal Details / Edit Payment ', () => {
        cy.visit('https://la.studio-uat.chubb.com/br/nubank/travel/launchstage/pt-BR')

        cy.travel_info_br()
    })

    it('Payment page', () => {
            cy.payment_travel_br()

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





