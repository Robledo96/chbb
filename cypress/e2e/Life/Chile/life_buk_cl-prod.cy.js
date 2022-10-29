import 'cypress-iframe'

describe('Life Buk Chile', () => {
    //Page 1
    it('Quote / Select Plan / Personal Details', () => {
        cy.visit('https://la.studio.chubb.com/cl/buk/life/launchstage/es-CL')

        cy.life_cl()
    })


    it('Payment page', () => {

        cy.payment_life_cl()


    })

})






