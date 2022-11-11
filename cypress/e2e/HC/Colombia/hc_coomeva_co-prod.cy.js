import 'cypress-iframe'

describe('HC coomeva COLOMBIA (prod)', () => {
    beforeEach(function () {
        const suite = cy.state('test').parent
        if (suite.tests.some(test => test.state === 'failed')) {
            this.skip()
        }
    })
    //Page 1
    it('Visit', () => {
        cy.visit('https://la.studio.chubb.com/co/coomeva/hc/launchstage/es-CO')
    })

    it('Quote', () => {
        cy.Quote_hc_co()
    })

    it('Select Plan', () => {
        cy.Plan_hc_co()
    })

    it('Captcha', () => {
        cy.Captcha()
    })

    it('Personal Details', () => {
        cy.Details_hc_co()
    })

    it('Pyment page Checking', () => {
        cy.Checking_hc_co()
    })


    it('Payment Page Edit button click', () => {
        cy.Edit_button()

    })

    it('Captcha', () => {
        cy.Captcha()
    })


    it('Edit', () => {
        cy.Edit_hc_co()
    })
    it('Payment page', () => {

        cy.payment_hc_co()
    })

})

