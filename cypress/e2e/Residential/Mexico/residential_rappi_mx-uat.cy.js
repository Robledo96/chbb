import 'cypress-iframe'


describe('Residential rappi MEXICO (uat)', () => {
    beforeEach(function () {
        const suite = cy.state('test').parent
        if (suite.tests.some(test => test.state === 'failed')) {
            this.skip()
        }
    })
    //Page 1
    it('Visit', () => {
        cy.visit('https://la.studio-uat.chubb.com/mx/rappi/residential/launchstage/es-MX')
    })
    it('Select Plan', () => {
        cy.Plan_resid_mx()
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

    it('Edit', () => {
        cy.Edit_resid_mx()
    })

    it('Payment page', () => {

        cy.Payment_resid_mx()
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

