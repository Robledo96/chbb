import 'cypress-iframe'
import { person, address, address_br, payment } from '../../../support/objects_mobile';
import { randomCPF, dob } from '../../../support/utils';
let radio = 0


describe('Residential hartb  BRASIL (uat)', { testIsolation: false }, () => {
   //
    //Page 1
    it('Visit', () => {
        cy.visit('https://la.studio-uat.chubb.com/br/hartb/residential/launchstage/pt-BR')
        cy.wait(2000)
        cy.url().then(($url) => {
            if ($url.includes('https://la.studio.chubb.com/404')) {
                throw new Error('//// PAGE NOT FOUND ////')
            }
        })
    })

    it('Quote', () => {
        cy.get('.hero-banner__button', { timeout: 30000 }).click()
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
            cy.log('////// Gender /////')
            cy.get(x.select_value).first().click()
                .get(x.select_option).should('have.length.greaterThan', 0)
                .its('length').then(($length) => {
                    cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
                })
                .get(x.input_mobile).type(person.phone_2)
                .get(x.input_email).type(person.email)
                .get(x.input_id).click().type('206.919.277-66')

            cy.log('//////// Radio Group - 1 /////////')
            cy.get(x.radio_group).first()
                .find(x.check_outer_circle).should('have.length.greaterThan', 0)
                .its('length').then(($length) => {
                    cy.get(x.check_outer_circle).eq(Cypress._.random($length - 1)).click({ force: true })

                    cy.get(x.input_zipcode).click()// click outside
                        .wait(1000)
                    cy.log('//////// Looking for Errors /////////')
                    cy.get('form').then(($form) => {
                        if ($form.find(x.errors_1).length > 0) {
                            cy.get(x.radio_group).first()
                                .find(x.check_outer_circle).last()
                                .click({ force: true })
                                .wait(500)
                        }
                    })
                })
            cy.get(x.input_zipcode).type(address_br.zipcode)

            cy.wait('@getLocat_Brasil_1', { timeout: 90000 }).its('response.statusCode').should('eq', 200)

                .get(x.input_address_1).type(address.line1)
                .get(x.input_ext_number).type(address_br.ext_num)
                .get(x.input_address_2).type(address.line1)
                .get(x.input_address_3).type(address_br.barrio)
                .get(x.input_city).type(address_br.city)
                .get(x.input_province).type(address_br.province)

            //Same Address yes or not
            cy.log('//////// Radio Group - 2 /////////')
            cy.get(x.radio_group).last()
                .find(x.check_outer_circle).should('have.length.greaterThan', 0)
                .its('length').then(($length) => {
                    cy.log($length)
                    radio = Cypress._.random($length - 1)
                    cy.get(x.radio_group).last()
                        .find(x.check_outer_circle).eq(radio).click({ force: true })

                    cy.log('////// Radio Checked', radio, '///////')
                    if (radio == 1) {
                        cy.get(x.input_zipcode_1).type(address_br.zipcode_1)

                        cy.wait('@getLocat_Brasil_2', { timeout: 90000 }).its('response.statusCode').should('eq', 200)
                        cy.wait(1000)
                            .get(x.input_add_1_Billing).type(address.line1)
                            .get(x.input_ext_num_Billing).type(address_br.ext_num)
                            .get(x.input_add_2_Billing).type(address.line1)
                            .get(x.input_add_3_Billing).type(address_br.barrio_1)
                    }
                    cy.get(x.checkboxes).check({ force: true }).should('be.checked')
                })
            cy.wait(1000)
            cy.get(x.forward_button).should('be.enabled').click()
            cy.wait('@validate', { timeout: 40000 })
            cy.get('.loading-indicator__container', { timeout: 40000 }).should(($loading) => {
                expect($loading).not.to.exist
            })

            cy.wait(1000)
            cy.get('body').then(($body) => {
                if ($body.find('app-applicant-details').is(':visible')) {
                        var counter = 0
                        const repeatID = () => {
                            counter++
                            cy.log(counter)
                            cy.log('///// Duplicate ID /////')
                            cy.log('////// Changing ID /////')
                            cy.get(x.input_id).clear().type(randomCPF()).wait(1000)
                            cy.get(x.forward_button).should('be.enabled').click()

                            cy.wait('@validate', { timeout: 40000 })
                            cy.get('.loading-indicator__container', { timeout: 40000 }).should(($loading) => {
                                expect($loading).not.to.exist
                            })
                            if (counter < 3) {
                                cy.wait(1000)
                                cy.url().then(($url) => {
                                    if ($url.includes('/payment')) {
                                        cy.log('//// ID Found ////')
                                        counter = 0
                                        return
                                    }
                                    repeatID()
                                })
                            } else { return }
                        }
                        repeatID()
                }
            })
            cy.wait(1000)
            cy.get('body').then(($body) => {
                if ($body.find('app-applicant-details').is(':visible')) {
                    throw new Error('//// ERROR FOUND ////')
                }
            })
        })
        cy.wait('@iframe', { timeout: 40000 }).its('response.statusCode').should('eq', 200)
    })

    it('Payment page Checking', () => {
        cy.get('.review__item--applicant-details', { timeout: 30000 })
            .should('contain.text', person.name)
            .and('contain.text', person.last_name)
            .and('contain.text', person.phone_2)
            .and('contain.text', person.email)

        cy.get('.review__item--insured-address')
            .should('contain.text', address_br.zipcode)
            .and('contain.text', address.line1)
            .and('contain.text', address_br.ext_num)
            .and('contain.text', address.line1)
            .and('contain.text', address_br.barrio)
            .and('contain.text', address_br.city)
            .and('contain.text', address_br.province)

        cy.log('////// Radio Checked', radio, '///////')
        if (radio == 1) {
            cy.get('.review__item--billing-address')
                .should('contain.text', address_br.zipcode_1)
                .and('contain.text', address.line1)
                .and('contain.text', address_br.ext_num)
                .and('contain.text', address.line1)
                .and('contain.text', address_br.barrio_1)

        } else {
            cy.get('.review__item--billing-address')
                .should('contain.text', address_br.zipcode)
                .and('contain.text', address.line1)
                .and('contain.text', address_br.ext_num)
                .and('contain.text', address.line1)
                .and('contain.text', address_br.barrio)
                .and('contain.text', address_br.city)
                .and('contain.text', address_br.province)
        }
    })

    // it('Payment page Edit button click', () => {
    //     cy.fixture('locators').then((x) => {
    //         cy.get(x.edit_button).eq(1).click()
    //         cy.wait('@getLocat_Brasil_1', { timeout: 90000 }).its('response.statusCode').should('eq', 200)
    //         if (radio == 1) {
    //             cy.wait('@getLocat_Brasil_2', { timeout: 90000 }).its('response.statusCode').should('eq', 200)
    //         }
    //     })
    // })

    // it('Edit', () => {
    //     cy.fixture('locators').then((x) => {
    //         cy.get(x.input_address_1, { timeout: 30000 }).wait(500)
    //             .type(address.line2)
    //             .get(x.input_address_3).type(address_br.barrio)
    //             .get(x.input_city).type(address_br.city)
    //             .get(x.input_province).type(address_br.province)

    //         cy.log('////// Radio =', radio, '///////')
    //         if (radio == 1) {
    //             cy.get(x.input_add_1_Billing).type(address.line1)
    //             cy.get(x.input_add_3_Billing).type(address_br.barrio_1)
    //         }


    //         cy.get(x.checkboxes).check({ force: true }).should('be.checked')
    //             .wait(1000)
    //         cy.get(x.forward_button).should('be.enabled').click()

    //         cy.wait('@validate', { timeout: 40000 }).its('response.statusCode').should('eq', 200)
    //         cy.wait('@iframe', { timeout: 40000 }).its('response.statusCode').should('eq', 200)

    //         cy.get('.review__item--insured-address', { timeout: 30000 })
    //             .should('contain.text', address.line2)
    //     })
    // })

    it('Payment page', () => {
        cy.fixture('locators').then((x) => {
            cy.iframe(x.card_iframe).then($ => {
                cy.wrap($[0])
                    .find(x.input_card)
                    .type(payment.visa_card_num_1, { delay: 80 })
                    .get(x.input_card_name).type(payment.card_holder, { delay: 80 })
                    .get(x.input_expiry_date).type(payment.expiration_date, { delay: 80 })
            })
            cy.iframe(x.cvv_iframe).then($iframes => {
                cy.wrap($iframes[0])
                    .find(x.input_cvv)
                    .type(payment.cvv_1, { delay: 80 })
                    .get(x.checkboxes).check({ force: true }).should('be.checked')
                    .get(x.input_expiry_date).click()
                    .get(x.forward_button).should('be.enabled')
                    .click()

                cy.wait('@checkout', { timeout: 40000 }).its('response.statusCode').should('eq', 200)
                cy.get('.loading-indicator__container', { timeout: 40000 }).should(($loading) => {
                    expect($loading).not.to.exist
                })
            })
        })

    })

    it('Thankyou', () => {
        cy.url().then(($url) => {
            expect($url).to.contain('/thankyou')
        })

        cy.get('.thank-you__policy-content__code').invoke('text').then(text => {
            let code = text + '\n'
            cy.writeFile('cypress/e2e/Residential/policy_code-Residential.txt', code, { flag: 'a+' })
        })
    })

})







