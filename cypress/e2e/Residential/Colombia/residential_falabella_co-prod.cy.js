import 'cypress-iframe'


describe('Residential cafam COLOMBIA (prod)', () => {
    beforeEach(function () {
        const suite = cy.state('test').parent
        if (suite.tests.some(test => test.state === 'failed')) {
            this.skip()
        }
    })
    //Page 1
    it('Visit', () => {
        cy.visit('https://la.studio.chubb.com/co/falabella/residential/launchstage/es-CO')
    })

    it('Quote', () => {
        cy.Quote_resid_co()
    })

    it('Select Plan', () => {
        cy.Plan_residF_co()
    })

    it('Captcha', () => {
        cy.Captcha()
    })

    it('Personal Details ', () => {
        cy.Details_resid_co()

    })

    it('Pyment page Checking', () => {
        cy.Checking_resid_co()
    })

    it(' Payment Page Edit button click', () => {
        cy.Edit_button() //Commands.js
    })

    it('Captcha', () => {
        cy.Captcha()
    })

    it('Edit', () => {
        cy.Edit_resid_co()
    })

    it('Payment page', () => {
        cy.Payment_resid_co()

    })

})






