import 'cypress-iframe'


describe('Cyber rappi MEXICO (uat)', () => {
    beforeEach(function () {
        const suite = cy.state('test').parent
        if (suite.tests.some(test => test.state === 'failed')) {
            this.skip()
        }
    })
    //Page 1
    it('Visit', () => {

        cy.visit('https://la.studio-uat.chubb.com/mx/rappi/cyber/launchstage/es-MX')

    })
    it('Quote', () => {
        cy.Quote_cyber_mx()
    })

    it('Select Plan', () => {
        cy.Plan_cyber_mx()
    })

    it('Personal Details', () => {
        cy.Details_cyber_mx()

    })

    it('Pyment page Checking', () => {

        cy.Checking_cyber_mx()
    })

    it(' Payment Page Edit button click', () => {
        cy.Edit_button()
    })

    it('Edit', () => {
        cy.Edit_cyber_mx()
    })

    it('Payment page', () => {

        cy.payment_cyber_mx()
    })

    // it('Congratulations', () => {

    //     cy.Congratulations()
    // })


})












