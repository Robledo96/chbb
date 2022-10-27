
import 'cypress-iframe'

describe('Travel nubank BRASIL', () => {
    //Page 1
    it('Travel Date / Number of Travelers / Select Plan / Personal Details / Edit Payment ', () => {
        cy.visit('https://la.studio-uat.chubb.com/br/nubank/travel/launchstage/pt-BR')

        cy.travel_info_br()
    })

    it('Payment page', () => {
            cy.payment_travel_br()

    })

})





