import 'cypress-iframe'

describe('ESB aon PUERTO RICO', () => {
    //Page 1
    it('Travel Date / Select Plan / Personal Details', () => {
        cy.visit('https://la.studio.chubb.com/pr/aon/esb/launchstage/es-PR')

        cy.esb_pr()
    })

    it('Payment page', () => {
        cy.payment_esb_pr()

    })


})


