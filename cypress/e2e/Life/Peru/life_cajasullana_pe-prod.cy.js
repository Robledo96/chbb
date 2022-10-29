import 'cypress-iframe'

describe('Life cajasullana PERU', () => {
    //Page 1
    it('Quote / Select Plan / Personal Details', () => {
        cy.visit('https://la.studio.chubb.com/pe/cajasullana/life/launchstage/es-PE')

        cy.life_pe()
    })


    it('Payment page', () => {

        cy.payment_life_pe()


    })
   
})






