import 'cypress-iframe'


describe('Residential diners EC (prod)', () => {
    beforeEach(function () {
        const suite = cy.state('test').parent
        if (suite.tests.some(test => test.state === 'failed')) {
            this.skip()
        }
    })
    //Page 1
    it('Visit', () => {
        cy.visit('https://la.studio.chubb.com/ec/diners/residential/launchstage/es-EC')
    })

    it('Quote', () => {
        cy.Quote_resid_ec()
    })

    it('Select Plan', () => {
        cy.Plan_resid_ec()
    })

    it('Captcha', () => {
        cy.Captcha()
    })

    it('Personal Details ', () => {
        cy.Details_resid_ec()

    })

    it('Pyment page Checking', () => {
        cy.Checking_resid_ec()
    })

    it(' Payment Page Edit button click', () => {
        cy.Edit_button() //Commands.js
    })

    it('Captcha', () => {
        cy.Captcha()
    })

    it('Edit', () => {
        cy.Edit_resid_ec()
    })

    it('Payment page', () => {
        cy.Payment_resid_ec()


    })

    // Page 5 Thank you
    // it('Should text Congratulations', () => {
    //     cy.fixture('locators').then((x) => {
    //         cy.get(x.thank_you_text).should('contain.text', '¡Felicidades ')
    //             .and('contain.text', person.name)
    //             .and('contain.text', ', ya estas asegurado!')
    //             .and('contain.text', person.email)
    //         cy.get(x.thankyou__button).click()
    //     })
    // })
})





