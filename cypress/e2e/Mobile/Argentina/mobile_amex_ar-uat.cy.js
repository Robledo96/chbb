import 'cypress-iframe'


describe('Mobile amex ARGENTINA (uat)', () => {
    beforeEach(function () {
        const suite = cy.state('test').parent
        if (suite.tests.some(test => test.state === 'failed')) {
            this.skip()
        }
    })
    it('Visit', () => {
        cy.visit('https://la.studio-uat.chubb.com/ar/amex/mobile/launchstage/es-AR')
    })

    it('Quote', () => {
        cy.Quote_mob_ar()
    })

    it('Select Plan', () => {
        cy.Plan_mob()
    })

    it('Personal Details ', () => {
        cy.Details_mob_ar()
    })

    it('Pyment page - Checking personal details information', () => {
        cy.Checking_mob_ar()
    })

    it(' Payment Page Edit button click', () => {
        cy.Edit_button() //Commands.js
    })

    it('Edit', () => {
        cy.Edit_mob_ar()
    })

    it('Payment page', () => {

        cy.Payment_mob_ar()
    })
    //Page 5 Thank you
    // it('Should text Congratulations', () => {
    //     cy.fixture('locators_mobile').then((x) => {
    //         cy.get(x.thank_you_text).should('contain.text', '¡Felicidades ')
    //             .and('contain.text', 'Leonel')
    //             .and('contain.text', ', ya cuentas con tu póliza de seguro!')
    //             .get(x.thank_you_email_text).should('contain.text', person.email)
    //         cy.get(x.thankyou__button).click()
    //     })
    // })
})







