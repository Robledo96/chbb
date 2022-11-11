import 'cypress-iframe'


describe('HC rappi MEXICO (uat)', () => {
    beforeEach(function () {
        const suite = cy.state('test').parent
        if (suite.tests.some(test => test.state === 'failed')) {
            this.skip()
        }
    })
    //Page 1
    it('Visit', () => {
        cy.visit('https://la.studio-uat.chubb.com/mx/rappi/hc/launchstage/es-MX')
    })

    it('Quote', () => {
        cy.Quote_hc_mx()
    })

    it('Select Plan', () => {
        cy.Plan_hc_mx()
    })

    it('Personal Details', () => {
        cy.Details_hc_mx()

    })

    it('Pyment page Checking', () => {

        cy.Checking_hc_mx()
    })

    it(' Payment Page Edit button click', () => {
        cy.Edit_button() //Commands.js
    })

    it('Edit', () => {
        cy.Edit_hc_mx()
    })

    it('Payment page', () => {

        cy.payment_hc_mx()

    })
    // it('Should text Congratulations', () => {
    //     cy.fixture('locators').then((x) => {
    //         cy.get(x.thank_you_text).should('contain.text', '¡Felicidades ')
    //             .and('contain.text', 'Leonel')
    //             .and('contain.text', ', ya cuentas con tu póliza de seguro!')
    //             .get(x.thank_you_email_text).should('contain.text', person.email)
    //         cy.get(x.thankyou__button).click()
    //     })
    // })

})

