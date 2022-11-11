
import 'cypress-iframe'


describe('Mobile unired CHILE (uat)', () => {
    beforeEach(function () {
        const suite = cy.state('test').parent
        if (suite.tests.some(test => test.state === 'failed')) {
            this.skip()
        }
    })
    //Page 1
    it('Visit', () => {
        cy.visit('https://la.studio-uat.chubb.com/cl/unired/mobile/launchstage/es-CL')
    })

    it('Quote', () => {
        cy.Quote_mob()
    })

    it('Select Plan', () => {
        cy.Plan_mob()
    })

    it('Personal Details ', () => {
        cy.Details_mob_cl()

    })

    it('Pyment page Checking', () => {

        cy.Checking_mob_cl()
    })

    it(' Payment Page Edit button click', () => {
        cy.Edit_button() //Commands.js
    })

    it('Edit', () => {
        cy.Edit_mob_cl()
    })

    it('Payment page', () => {
        cy.Payment_mob_cl()

    })
    // Page 5 Thank you
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







