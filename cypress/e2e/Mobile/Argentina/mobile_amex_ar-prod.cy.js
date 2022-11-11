import 'cypress-iframe'


describe('Mobile amex ARGENTINA (prod)', () => {
    beforeEach(function () {
        const suite = cy.state('test').parent
        if (suite.tests.some(test => test.state === 'failed')) {
            this.skip()
        }
    })
    it('Visit', () => {
        cy.visit('https://la.studio.chubb.com/ar/amex/mobile/launchstage/es-AR')
    })

    it('Quote', () => {
        cy.Quote_mob_ar()
    })

    it('Select Plan', () => {
        cy.Plan_mob()
    })

    it('Captcha', () => {
        cy.Captcha()
    })

    it('Personal Details ', () => {
        cy.Details_mob_ar()
    })

    it('Pyment page - Checking personal details information', () => {
        cy.Checking_mob_ar()
    })

    it(' Payment Page Edit button click', () => {
        cy.Edit_button() //Commands.js
    })

    it('Edit', () => {
        cy.Edit_mob_ar()
    })

    it('Payment page', () => {

        cy.Payment_mob_ar()
    })
    
})







