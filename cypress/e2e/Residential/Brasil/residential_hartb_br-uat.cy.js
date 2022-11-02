import 'cypress-iframe'
import { person } from '../../../support/objects_mobile';


describe('Residential hartb  BRASIL', () => {
    //Page 1
    it('Quote / Select Plan', () => {
        cy.visit('https://la.studio-uat.chubb.com/br/hartb/residential/launchstage/pt-BR')

        cy.quote_residential_br()
    })

    // Page 3    
    it(' Personal Details / Checking Insured Details / Edit ', () => {
        cy.details_residential_br()
    })

    it('Payment page', () => {
        cy.payment_residential_br()

    })
    // Page 5 Thank you
    // it('Should text Congratulations', () => {
    //     cy.fixture('locators').then((x) => {
    //         cy.get(x.thank_you_text).should('contain.text', '¡Felicidades ')
    //             .and('contain.text', 'Leonel')
    //             .and('contain.text', ', ya cuentas con tu póliza de seguro!')
    //             .get(x.thank_you_email_text).should('contain.text', person.email)
    //         cy.get(x.thankyou__button).click()
    //     })
    // })
})







