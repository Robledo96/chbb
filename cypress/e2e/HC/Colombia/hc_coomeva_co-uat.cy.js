import 'cypress-iframe'

describe('HC coomeva COLOMBIA (uat)', () => {
    beforeEach(function () {
        const suite = cy.state('test').parent
        if (suite.tests.some(test => test.state === 'failed')) {
            this.skip()
        }
    })
    //Page 1
    it('Visit', () => {
        cy.visit('https://la.studio-uat.chubb.com/co/coomeva/hc/launchstage/es-CO')
    })

    it('Quote', () => {
        cy.Quote_hc_co()
    })

    it('Select Plan', () => {
        cy.Plan_hc_co()
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
    it('Edit', () => {
        cy.Edit_hc_co()
    })
    it('Payment page', () => {

        cy.payment_hc_co()
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

