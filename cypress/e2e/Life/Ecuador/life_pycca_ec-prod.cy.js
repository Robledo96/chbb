import 'cypress-iframe'

describe('Life pycca Ecuador', () => {
    //Page 1
    it('Quote / Select Plan / Personal Details', () => {
        cy.visit('https://la.studio.chubb.com/ec/pycca/life/launchstage/es-EC')

        cy.life_ec()
    })


    it('Payment page', () => {

        cy.payment_life_ec()


    })
  
})






