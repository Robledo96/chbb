import 'cypress-iframe'


describe('Residential automovilclub CHILE (prod)', () => {
    beforeEach(function () {
        const suite = cy.state('test').parent
        if (suite.tests.some(test => test.state === 'failed')) {
            this.skip()
        }
    })
    it('Visit', () => {
        cy.visit('https://la.studio.chubb.com/cl/automovilclub/residential/launchstage/es-CL')
    })

    it('Select Plan', () => {
        cy.Plan_resid_cl()
    })

    it('Captcha', () => {
        cy.Captcha()
    })

    it('Personal Details ', () => {
        cy.Details_resid_cl()

    })

    it('Pyment page Checking', () => {
        cy.Checking_resid_cl()
    })

    it(' Payment Page Edit button click', () => {
        cy.Edit_button() //Commands.js
    })

    it('Captcha', () => {
        cy.Captcha()
    })

    it('Edit', () => {
        cy.Edit_resid_cl()
    })

    it('Payment page', () => {

        cy.Payment_resid_cl()

    })
   
})







