
import 'cypress-iframe'


describe('Residential cafam COLOMBIA (uat)', () => {
    beforeEach(function () {
        const suite = cy.state('test').parent
        if (suite.tests.some(test => test.state === 'failed')) {
            this.skip()
        }
    })
    //Page 1
    it('Visit', () => {
        cy.visit('https://la.studio-uat.chubb.com/co/cafam/residential/COAS600002/es-CO')
    })

    it('Select Plan', () => {
        cy.Plan_resid_co()
    })

    it('Personal Details ', () => {
        cy.Details_resid_co()

    })

    it('Pyment page Checking', () => {
        cy.Checking_resid_co()
    })

    it(' Payment Page Edit button click', () => {
        cy.Edit_button() //Commands.js
    })

    it('Edit', () => {
        cy.Edit_resid_co()
    })

    it('Payment page', () => {
        cy.Payment_resid_co()

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






