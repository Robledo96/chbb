
import 'cypress-iframe'


describe('Mobile cafam COLOMBIA (prod)', () => {
    beforeEach(function () {
        const suite = cy.state('test').parent
        if (suite.tests.some(test => test.state === 'failed')) {
            this.skip()
        }
    })
    //Page 1
    it('Visit', () => {
        cy.visit('https://la.studio.chubb.com/co/cafam/mobile/COAS600001/es-CO')
    })

    it('Quote', () => {
        cy.Quote_mob()
    })

    it('Select Plan', () => {
        cy.Plan_mob()
    })

    it('Captcha', () => {
        cy.Captcha()
    })

    it('Personal Details ', () => {
        cy.Details_mob_co()
    })

    it('Pyment page Checking', () => {

        cy.Checking_mob_co()
    })

    it(' Payment Page Edit button click', () => {
        cy.Edit_button() //Commands.js
    })

    it('Captcha', () => {
        cy.Captcha()
    })

    it('Edit', () => {
        cy.Edit_mob_co()
    })

    it('Payment page', () => {
        cy.Payment_mob_co()

    })


})







