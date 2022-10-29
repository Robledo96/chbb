import 'cypress-iframe'

describe('Life marsh Panama', () => {
    //Page 1
    it('Quote / Select Plan / Personal Details', () => {
        cy.visit('https://la.studio.chubb.com/pa/marsh/life/launchstage/es-PA')

        cy.life_pa()
    })


    it('Payment page', () => {

        cy.payment_life_pa()


    })
  
})






