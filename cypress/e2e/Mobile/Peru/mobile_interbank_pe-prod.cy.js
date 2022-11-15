import 'cypress-iframe'


describe('Mobile interbank PERU (prod)', () => {
    beforeEach(function () {
        const suite = cy.state('test').parent
        if (suite.tests.some(test => test.state === 'failed')) {
            this.skip()
        }
    })
    //Page 1
    it('Visit', () => {
        cy.visit('https://la.studio.chubb.com/pe/interbank/mobile/launchstage/es-PE')
    
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
        cy.Details_mob_pe()
    })

    it('Pyment page Checking', () => {

        cy.Checking_mob_pe()
    })

    it(' Payment Page Edit button click', () => {
        cy.Edit_button() //Commands.js
    })

    it('Captcha', () => {
        cy.Captcha()
    })

    it('Edit', () => {
        cy.Edit_mob_pe()
    })

    it('Payment page', () => {

        cy.Payment_mob_pe()


    })


})







