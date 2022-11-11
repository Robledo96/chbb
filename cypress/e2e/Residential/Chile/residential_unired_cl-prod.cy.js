import 'cypress-iframe'


describe('Residential unired CHILE (prod)', () => {
    beforeEach(function () {
        const suite = cy.state('test').parent
        if (suite.tests.some(test => test.state === 'failed')) {
            this.skip()
        }
    })
    it('Visit', () => {
        cy.visit('https://la.studio.chubb.com/cl/unired/residential/launchstage/es-CL')
    })

    it('Select Plan', () => {
        cy.Plan_resid_cl()
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

    it('Edit', () => {
        cy.Edit_resid_cl()
    })

    it('Payment page', () => {

        cy.Payment_resid_cl()

    })
   
})
