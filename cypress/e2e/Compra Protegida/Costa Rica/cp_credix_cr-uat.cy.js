import 'cypress-iframe'
import { dob, Random } from '../../../support/utils'
import { person, address, address_cr } from '../../../support/objects_mobile'

describe('Compra Protegida credix Costa Rica (uat)', { testIsolation: false }, () => {
   //
    //Page 1
    it('Visit', () => {
        cy.visit('https://la.studio-uat.chubb.com/cr/credix/compraprotegida/launchstage/es-CR')
        cy.wait(2000)
        cy.url().then(($url) => {
            if ($url.includes('https://la.studio.chubb.com/404')) {
                throw new Error('//// PAGE NOT FOUND ////')
            }
        })
       
    })

    it('Quote', () => {
        cy.get('.hero-banner__button', { timeout: 30000 }).should('be.enabled').click()
        cy.wait('@campaign', { timeout: 40000 }).its('response.statusCode').should('eq', 200)
        cy.get('.loading-indicator__container', { timeout: 40000 }).should(($loading) => {
            expect($loading).not.to.exist
        })
    })

    it('Select Plan', () => {
        cy.Plan()
    })

    it('Personal Details', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.input_name, { timeout: 30000 }).type(person.name)
                .get(x.input_last_name).type(person.last_name)
                .get(x.input_birth_date).type(dob())
            cy.log('///// Gener /////')
            cy.get(x.select_placeholder).click()
                .get(x.select_option).should('have.length.greaterThan', 0)
                .its('length').then(($length) => {
                    cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
                })
            cy.get(x.input_id).type(Random(1000000000, 1999999999))
            cy.get(x.input_mobile).type(person.phone_5)
                .get(x.input_email).type(person.email)
                .get(x.input_address_1).type(address.line1)
                .get(x.input_city).type(address_cr.city)
                .get(x.input_province).type(address_cr.province)
                .wait(1000)
            cy.get(x.forward_button).should('be.enabled').click()

            cy.wait('@validate', { timeout: 40000 })
            cy.get('.loading-indicator__container', { timeout: 40000 }).should(($loading) => {
                expect($loading).not.to.exist
            })

            cy.wait(1000)
            cy.get('body').then(($body) => {
                if ($body.find('app-applicant-details').is(':visible')) {
                    if ($body.find('mat-error').is(':visible')) {
                        var counter = 0
                        const repeatID = () => {
                            counter++
                            cy.log(counter)
                            cy.log('///// Duplicate ID /////')
                            cy.log('////// Changing ID /////')
                            cy.get(x.input_id).clear().type(Random(1000000000, 1999999999)).wait(1000)
                            cy.get(x.forward_button).should('be.enabled').click()
                            cy.wait('@validate', { timeout: 40000 })
                            cy.get('.loading-indicator__container', { timeout: 40000 }).should(($loading) => {
                                expect($loading).not.to.exist
                            })
                            if (counter < 1) {
                                cy.wait(1000)
                                cy.url().then(($url) => {
                                    if ($url.includes('/payment')) {
                                        cy.log('//// ID Found ////')
                                        return
                                    }
                                    repeatID()
                                })
                            } else { return }

                        }
                        repeatID()

                    }
                }
            })
            cy.wait(1000)
            cy.get('body').then(($body) => {
                if ($body.find('app-applicant-details').is(':visible')) {
                    throw new Error('//// ERROR FOUND ////')
                }
            })
        })
    })

    it('Payment page Checking', () => {
        cy.fixture('locators').then((x) => {
            //checking insured details
            cy.get(x.review_items, { timeout: 30000 })
                .should('contain.text', person.name)
                .and('contain.text', person.last_name)
                .and('contain.text', person.phone_5)
                .and('contain.text', person.email)
                .and('contain.text', address.line1)
                .and('contain.text', address_cr.city)
                .and('contain.text', address_cr.province)
        })
    })

    // it('Payment page Edit button click', () => {
    //     cy.Edit_button() //Commands.js
    // })

    // it('Edit', () => {
    //     cy.fixture('locators').then((x) => {
    //         cy.get(x.input_address_1, { timeout: 30000 }).clear()
    //             .type(address.line2)
    //         cy.get(x.forward_button, { timeout: 30000 }).should('be.enabled').click()

    //         cy.wait('@validate', { timeout: 40000 }).its('response.statusCode').should('eq', 200)

    //         cy.get(x.review_items, { timeout: 30000 })
    //             .should('contain.text', address.line2)
    //     })
    // })

    it('Payment page', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.checkboxes).check({ force: true })
                .should('be.checked')
                .get(x.forward_button).should('be.enabled')
                .click()

            cy.wait('@policy', { timeout: 40000 }).its('response.statusCode').should('eq', 200)
            cy.get('.loading-indicator__container', { timeout: 40000 }).should(($loading) => {
                expect($loading).not.to.exist
            })
        })
    })

    it('Thankyou', () => {
        cy.url().then(($url) => {
            expect($url).to.contain('/thankyou')
        })

        cy.get('.thank-you__policy-content__code').invoke('text').then(text => {
            let code = text + '\n'
            cy.writeFile('cypress/e2e/Compra Protegida/policy_code-CP.txt', code, { flag: 'a+' })
        })
    })
})


