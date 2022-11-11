import 'cypress-iframe'

describe('Mobile OLX ECUADOR (uat)', () => {
    beforeEach(function () {
        const suite = cy.state('test').parent
        if (suite.tests.some(test => test.state === 'failed')) {
            this.skip()
        }
    })
    //Page 1
    it('Visit', () => {
        cy.visit('https://la.studio-uat.chubb.com/ec/olx/mobile/ECE5200001/es-EC')
    })

    it('Quote', () => {
        cy.Quote_mob()
    })

    it('Select Plan', () => {
        cy.Plan_mob()
    })

    it('Personal Details ', () => {
        cy.Details_mob_ec()
    })

    it('Pyment page Checking', () => {

        cy.Checking_mob_ec()
    })

    it(' Payment Page Edit button click', () => {
        cy.Edit_button() //Commands.js
    })

    it('Edit', () => {
        cy.Edit_mob_ec()
    })

    it('Payment page', () => {
        cy.Payment_mob_ec()

    })

    it('Congratulations', () => {
        cy.Congrats_mob_ec()
    })
})





