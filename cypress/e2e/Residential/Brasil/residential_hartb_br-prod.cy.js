import 'cypress-iframe'


describe('Residential hartb  BRASIL', () => {
    //Page 1
    it('Quote / Select Plan', () => {
        cy.visit('https://la.studio.chubb.com/br/hartb/residential/launchstage/pt-BR')

        cy.quote_residential_br()
    })

    // Page 3    
    it(' Personal Details / Checking Insured Details / Edit ', () => {
        cy.details_residential_br()
    })

    it('Payment page', () => {

        cy.payment_residential_br()
    })

})







