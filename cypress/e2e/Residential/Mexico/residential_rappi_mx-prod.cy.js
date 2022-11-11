import 'cypress-iframe'


describe('Residential rappi MEXICO (prod)', () => {
    beforeEach(function () {
        const suite = cy.state('test').parent
        if (suite.tests.some(test => test.state === 'failed')) {
            this.skip()
        }
    })
    //Page 1
    it('Visit', () => {
        cy.visit('https://la.studio.chubb.com/mx/rappi/residential/launchstage/es-MX')
    })
    it('Select Plan', () => {
        cy.Plan_resid_mx()
    })

    it('Captcha', () => {
        cy.Captcha()
    })

    it('Personal Details', () => {
        cy.Details_resid_mx()

    })

    it('Pyment page Checking', () => {

        cy.Checking_resid_mx()
    })

    it(' Payment Page Edit button click', () => {
        cy.Edit_button() //Commands.js
    })

    it('Captcha', () => {
        cy.Captcha()
    })

    it('Edit', () => {
        cy.Edit_resid_mx()
    })

    it('Payment page', () => {

        cy.Payment_resid_mx()
    })

})

