import 'cypress-iframe'


describe('Cyber rappi MEXICO (prod)', () => {
    beforeEach(function () {
        const suite = cy.state('test').parent
        if (suite.tests.some(test => test.state === 'failed')) {
            this.skip()
        }
    })
    //Page 1
    it('Visit', () => {

        cy.visit('https://la.studio.chubb.com/mx/rappi/cyber/launchstage/es-MX')

    })
    it('Quote', () => {
        cy.Quote_cyber_mx()
    })

    it('Select Plan', () => {
        cy.Plan_cyber_mx()
    })

    it('Captcha', () => {
        cy.Captcha()
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

    it('Captcha', () => {
        cy.Captcha()
    })

    it('Edit', () => {
        cy.Edit_cyber_mx()
    })

    it('Payment page', () => {

        cy.payment_cyber_mx()
    })


})

