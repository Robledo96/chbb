import 'cypress-iframe'
import { person, address, address_pr } from '../../../support/objects_mobile';
import { dob_1 } from '../../../support/utils'
let num = 0


describe('Travel aon PUERTO RICO (uat)', () => {
    beforeEach(function () {
        const suite = cy.state('test').parent
        if (suite.tests.some(test => test.state === 'failed')) {
            this.skip()
        }
    })
    //Page 1
    it('Visit', () => {
        cy.visit('https://la.studio-uat.chubb.com/pr/aon/travel/launchstage/es-PR')
    })

    it('Travel Date ', () => {
        cy.Date_travel_pr()
    })

    it(' Number of Travelers ', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.select_placeholder).click()
                .get(x.select_option).should('have.length.greaterThan', 0)
                .its('length').then(($length) => {
                    cy.log($length)
                    num = Cypress._.random($length - 1)
                    cy.log(num)
                    cy.get(x.select_option).eq(num).click()

                    cy.wait(500)

                    cy.get('input').then(els => {
                        [...els].forEach(el => cy.wrap(el).type(dob_1()));
                    })
                    cy.get(x.companions_button).click()

                    cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
                        expect($loading).not.to.exist
                    })

                })
        })
    })

    it('Select Plan', () => {
        cy.Plan_travel_pr()
    })

    it('Personal Details', () => {
        cy.fixture('locators').then((x) => {
            cy.get(x.input_name).first().type(person.name)
                .get(x.input_last_name).first().type(person.last_name)
            cy.log('////// Gender /////')
                .get(x.select_value).first().click()
                .get(x.select_option).should('have.length.greaterThan', 0)
                .its('length').then(($length) => {
                    cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
                })
                .get(x.input_mobile).type(person.phone_1)
                .get(x.input_email).type(person.email)
                .get(x.input_address_1).type(address.line1)
                .get(x.input_city).type(address_pr.city)
                .get(x.input_zipcode).type(address_pr.zipcode)

            cy.log('////// Travelers =', num, '///////')
            if (num > 0) {
                cy.get('body').then(($body) => {
                    expect($body.find('app-companion-details').is(':visible'))

                    cy.get('app-companion-details')
                        .find(x.input_name).then(els => {
                            [...els].forEach(el => cy.wrap(el).type(person.name))
                        })
                    cy.get('app-companion-details')
                        .find(x.input_last_name).then(els => {
                            [...els].forEach(el => cy.wrap(el).type(person.last_name))
                        })
                })
            }
            cy.wait(1000)
            cy.get(x.forward_button).click()

            cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
                expect($loading).not.to.exist
            })
            cy.wait(1000)
            cy.get('body').then(($body) => {
                if ($body.find('#application-errors').is(':visible')) {
                    cy.log('//// UNRECOGNIZED ERROR FOUND ////')
                }
            })

        })
    })


    it('Pyment page - Checking personal details information', () => {
        cy.Checking_travel_pr()
    })

    it(' Payment Page Edit button click', () => {
        cy.Edit_button() //Commands.js
    })

    it('Edit', () => {
        cy.Edit_travel_pr()
    })

    it('Payment page', () => {
        cy.Payment_travel_pr()

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






