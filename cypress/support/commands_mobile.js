
import { Random, dob, randomRFC, randomRUT, randomDNI, randomCPF } from './utils'
import { person, payment, mobile, address, address_pe, address_ec, address_mx, address_co, address_ar, address_br } from '../support/objects_mobile'
let date = dob()



// ECUADOR //
// Personal Details 
Cypress.Commands.add('Details_mob_ec', () => {
    cy.fixture('locators').then((x) => {
        cy.log('///// Personal Details //////')
        cy.get(x.input_name).type(person.name)
            .get(x.input_last_name).type(person.last_name)
            .get(x.input_birth_date).type(dob())
        cy.log('/////// Gener //////')
        cy.get(x.select_value).click()
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length').then(($length) => {
                cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
            })
            .get(x.input_id).type(Random(1000000000, 1999999999))//'1896297523'
            .get(x.input_mobile).type(person.phone)
            .get(x.input_email).type(person.email)
            .get(x.input_address_1).type(address.line1)
            .get(x.input_city).type(address_ec.city)
            .get(x.input_province).type(address_ec.province)
            .get(x.forward_button).click()
        cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
            expect($loading).not.to.exist
        })
        cy.wait(1000)
        cy.get('body').then(($body) => {
            if ($body.find('app-applicant-details').is(':visible')) {
                cy.get('app-applicant-details').then(($form) => {
                    if ($form.find('mat-error').is(':visible')) {
                        cy.log('///// Bug Found /////')
                        cy.log('////// Changing ID /////')
                        cy.get(x.input_id).type(Random(1000000000, 1999999999)).wait(1000)
                        cy.get(x.forward_button).click()
                        cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
                            expect($loading).not.to.exist
                        })
                    }
                    cy.wait(1000)
                    if ($body.find('#application-errors').is(':visible')) {
                        cy.log('//// UNRECOGNIZED ERROR FOUND ////')

                    }
                })
            }

        })
    })
})
//Pyment page Checking
Cypress.Commands.add('Checking_mob_ec', () => {
    cy.fixture('locators').then((x) => {
        cy.url().then((url) => {
            if (url.includes('/diners/')) {
                cy.get(x.collapsable_bar).click()
            }
        })
        cy.get(x.review_items)
            .should('contain.text', person.name)
            .and('contain.text', person.last_name)
            .and('contain.text', person.phone)
            .and('contain.text', person.email)
            .and('contain.text', address.line1)
            .and('contain.text', address_ec.city)
            .and('contain.text', address_ec.province)
    })
})
//Edit
Cypress.Commands.add('Edit_mob_ec', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.input_address_1).clear()
            .type(address.line2)
            .get(x.forward_button).click()
        cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
            expect($loading).not.to.exist
        })
        cy.url().then((url) => {
            if (url.includes('/diners/')) {
                cy.get(x.collapsable_bar).click()
            }
        })
        cy.get(x.review_items)
            .should('contain.text', address.line2)
    })
})
//Payment Page
Cypress.Commands.add('Payment_mob_ec', () => {
    cy.fixture('locators').then((x) => {
        cy.log('/////// Checking url for Conditions ///////')
        cy.url().then((url) => {
            if (url.includes('/diners/')) {
                cy.log('//////// URL contains " Diners " //////')
                cy.iframe(x.card_iframe).then($iframes => {
                    cy.wrap($iframes[0])
                        .find(x.input_card)
                        .first()
                        .type(payment.dinersClub_card_num)
                        .get(x.input_card_name).type(payment.card_holder)
                        .get(x.input_expiry_date).type(payment.expiration_date)
                        .get(x.checkboxes).check({ force: true }).should('be.checked')
                        .get(x.forward_button).should('be.enabled')
                })
            }
            cy.url().then((url) => {
                if (url.includes('/olx/')) {
                    cy.log('//////// URL contains " Olx " //////')
                    cy.iframe(x.card_iframe).then($ => {
                        cy.wrap($[0])
                            .find(x.input_card).click()
                            .type(payment.visa_card_num)
                            .get(x.input_card_name).click().type(payment.card_holder)
                            .get(x.input_expiry_date).click().type(payment.expiration_date_1)
                    })
                    cy.iframe(x.cvv_iframe).then($iframes => {
                        cy.wrap($iframes[0])
                            .find(x.input_cvv).click()
                            .type(payment.cvv)
                            .get(x.checkboxes).check({ force: true }).should('be.checked')
                            .get(x.forward_button).should('be.enabled')

                    })
                }
            })
            // cy.url().then((url) => {
            //     if (url.includes('https://la.studio-uat.chubb.com/')) {
            //         cy.wait(1000)
            //         cy.get(x.forward_button).click()
            //         cy.get('.loading-indicator__container').should(($loading) => {
            //             expect($loading).not.to.exist
            //         })
            //     }
            // })
        })

    })
})
// Congratulations
Cypress.Commands.add('Congrats_mob_ec', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.thank_you_text).should('contain.text', '¡Felicidades ')
            .and('contain.text', 'Leonel')
            .and('contain.text', ', ya cuentas con tu póliza de seguro!')
            .get(x.thank_you_email_text).should('contain.text', person.email)
        cy.get(x.thankyou__button).click()

    })
})


// MEXICO //
// Personal Details 
Cypress.Commands.add('Details_mob_mx', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.input_name).type(person.name)
            .get(x.input_last_name).type(person.last_name)
            .get(x.input_birth_date).type(dob())
            .get(x.input_id).type(randomRFC())//'ANML891018J47' 
        cy.get(x.select_value_1).click()
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length').then($length => {
                cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
            })
        cy.get(x.input_mobile).type(person.phone_1)
            .get(x.input_email).type(person.email)
            .get(x.input_zipcode).type(address_mx.zipcode)

        cy.intercept('POST', '/api/data/locations').as('getLocation')
            .wait('@getLocation', { timeout: 60000 })

            .get(x.input_colonia).type(address_mx.colonia)
            .get(x.input_address_1).type(address.line1)

        cy.url().then((url) => {
            if (url.includes('/marsh/')) {
                cy.log('////// URL contains " marsh " ///////')
                cy.get(x.input_company).type('América Móvil')
            }
        })
            .wait(1000)
        cy.get(x.forward_button).click()
        cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
            expect($loading).not.to.exist
        })
        cy.wait(1000)
        cy.get('body').then(($body) => {
            if ($body.find('app-applicant-details').is(':visible')) {
                cy.get('app-applicant-details').then(($form) => {
                    if ($form.find('mat-error').is(':visible')) {
                        cy.log('///// Bug Found /////')
                        cy.log('////// Changing ID /////')
                            .get(x.input_birth_date).clear().type(dob())
                        cy.get(x.input_id).type(randomRFC()).wait(1000)
                        cy.get(x.forward_button).click()
                        cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
                            expect($loading).not.to.exist
                        })
                    }
                    cy.wait(1000)
                    if ($body.find('#application-errors').is(':visible')) {
                        cy.log('//// UNRECOGNIZED ERROR FOUND ////')
                    }
                })
            }

        })

    })
})
//Pyment page Checking
Cypress.Commands.add('Checking_mob_mx', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.collapsable_bar).click()
        cy.get(x.review_items)
            .should('contain.text', person.name)
            .and('contain.text', person.last_name)
            .and('contain.text', person.phone_1)
            .and('contain.text', person.email)
            .and('contain.text', address_mx.zipcode)
            .and('contain.text', address_mx.colonia)
            .and('contain.text', address.line1)
    })
})
//Edit
Cypress.Commands.add('Edit_mob_mx', () => {
    cy.fixture('locators').then((x) => {
        cy.wait(1000)
            .get(x.input_colonia).click({ force: true })
            .wait(1000)
            .get(x.colonia_option_text).first().click({ force: true })
            .wait(1000)
        cy.get(x.input_address_1).clear()
            .type(address.line2)
        cy.get(x.forward_button).click()
        cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
            expect($loading).not.to.exist
        })
        cy.get(x.collapsable_bar).click()
        cy.get(x.review_items)
            .should('contain.text', address.line2)
    })
})
// Payment Page 
Cypress.Commands.add('Payment_mob_mx', () => {
    cy.fixture('locators').then((x) => {
        cy.log('/////// Radio Group - 1 ///////')
        cy.get(x.radio_group)
            .find(x.check_outer_circle).should('have.length.greaterThan', 0)
            .its('length').then($length => {
                cy.get(x.check_outer_circle).eq(Cypress._.random($length - 1)).click({ force: true })
            })

        cy.iframe(x.card_iframe).then($ => {
            cy.wrap($[0])
                .find(x.input_card)
                .type(payment.visa_card_num_1)
                .get(x.input_card_name).type(payment.card_holder)
                .get(x.input_expiry_date).type(payment.expiration_date_2)
        })
        cy.iframe(x.cvv_iframe).then($iframes => {
            cy.wrap($iframes[0])
                .find(x.input_cvv)
                .type(payment.cvv_1)
                .get(x.checkboxes).check({ force: true }).should('be.checked')
                .get(x.forward_button).should('be.enabled')

        })
        // cy.url().then((url) => {
        //     if (url.includes('https://la.studio-uat.chubb.com/')) {
        //         cy.wait(1000)
        //         cy.get(x.forward_button).click()
        //         cy.get('.loading-indicator__container').should(($loading) => {
        //             expect($loading).not.to.exist
        //         })
        //     }
        // })
    })
})


// COLOMBIA
// Personal Details 
Cypress.Commands.add('Details_mob_co', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.input_name).type(person.name)
            .get(x.input_last_name).type(person.last_name)
            .get(x.input_birth_date).first().type(date)
        cy.log('/////// Gener ///////')
        cy.get(x.select_value).first().click()
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length').then($length => {
                cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
            })
            .get(x.input_id).type(Random(1000000000, 1999999999))
            .get(x.input_birth_date).eq(1).type(date)
            .get(x.input_mobile).type(person.phone_3)
            .get(x.input_email).type(person.email)
            .get(x.input_address_1).type(address.line1)
            .get(x.input_province).type(address_co.department)
            .get(x.input_city).type(address_co.city)
        cy.log('/////// Question ///////')
        cy.get(x.select_value).eq(1).click()
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length').then($length => {
                cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
            })
            .get(x.forward_button).click()
        cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
            expect($loading).not.to.exist
        })
        cy.wait(1000)
        cy.get('body').then(($body) => {
            if ($body.find('app-applicant-details').is(':visible')) {
                cy.get('app-applicant-details').then(($form) => {
                    if ($form.find('mat-error').is(':visible')) {
                        cy.log('///// Bug Found /////')
                        cy.log('////// Changing ID /////')
                        cy.get(x.input_id).type(Random(1000000000, 1999999999)).wait(1000)
                        cy.get(x.forward_button).click()
                        cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
                            expect($loading).not.to.exist
                        })
                    }
                    cy.wait(1000)
                    if ($body.find('#application-errors').is(':visible')) {
                        cy.log('//// UNRECOGNIZED ERROR FOUND ////')
                    }
                })
            }

        })
    })
})
//Pyment page Checking
Cypress.Commands.add('Checking_mob_co', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.review_items)
            .should('contain.text', person.name)
            .and('contain.text', person.last_name)
            .and('contain.text', person.phone_3)
            .and('contain.text', person.email)
            .and('contain.text', address.line1)
            .and('contain.text', address_co.department)
            .and('contain.text', address_co.city)

    })
})
//Edit
Cypress.Commands.add('Edit_mob_co', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.input_address_1).clear()
            .type(address.line2)
        cy.get(x.forward_button).click()
        cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
            expect($loading).not.to.exist
        })
        cy.get(x.review_items)
            .should('contain.text', address.line2)
    })
})
// Payment Page 
Cypress.Commands.add('Payment_mob_co', () => {
    cy.fixture('locators').then((x) => {
        cy.iframe(x.card_iframe).then($ => {
            cy.wrap($[0])
                .find(x.input_card)
                .type(payment.amex_card_num)
                .get(x.input_card_name).type(payment.card_holder)
                .get(x.input_expiry_date).type(payment.expiration_date)
        })
        cy.iframe(x.cvv_iframe).then($iframes => {
            cy.wrap($iframes[0])
                .find(x.input_cvv)
                .type(payment.cvv_2)
                .get(x.checkboxes).check({ force: true }).should('be.checked')
                .get(x.forward_button).should('be.enabled')

        })
        // cy.url().then((url) => {
        //     if (url.includes('https://la.studio-uat.chubb.com/')) {
        //         cy.wait(1000)
        //         cy.get(x.forward_button).click()
        //         cy.get('.loading-indicator__container').should(($loading) => {
        //             expect($loading).not.to.exist
        //         })
        //     }
        // })
    })
})


// CHILE //
// Personal Details 
Cypress.Commands.add('Details_mob_cl', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.input_name).type(person.name)
            .get(x.input_last_name).type(person.last_name)
            .get(x.input_birth_date).type(dob())
        cy.log('/////// Gener ///////')
        cy.get(x.select_value).first().click()
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length').then($length => {
                cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
            })
        cy.get(x.input_id).type(randomRUT())
        cy.get(x.input_mobile).type(person.phone_4)
            .get(x.input_email).type(person.email)
            .get(x.input_address_1).type(address.line1)
        cy.get(x.select_value).last().click()
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length').then($length => {
                cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
            })
            .wait(1000)
            .get(x.forward_button).click()
        cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
            expect($loading).not.to.exist
        })
        cy.wait(1000)
        cy.get('body').then(($body) => {
            if ($body.find('app-applicant-details').is(':visible')) {
                cy.get('app-applicant-details').then(($form) => {
                    if ($form.find('mat-error').is(':visible')) {
                        cy.log('///// Bug Found /////')
                        cy.log('////// Changing ID /////')
                        cy.get(x.input_id).type(randomRUT()).wait(1000)
                        cy.get(x.forward_button).click()
                        cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
                            expect($loading).not.to.exist
                        })
                    }
                    cy.wait(1000)
                    if ($body.find('#application-errors').is(':visible')) {
                        cy.log('//// UNRECOGNIZED ERROR FOUND ////')
                    }
                })
            }

        })
    })
})
//Pyment page Checking
Cypress.Commands.add('Checking_mob_cl', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.collapsable_bar).click()
        cy.get(x.review_items)
            .should('contain.text', person.name)
            .and('contain.text', person.last_name)
            .and('contain.text', person.phone_4)
            .and('contain.text', person.email)
            .and('contain.text', address.line1)
    })
})
//Edit
Cypress.Commands.add('Edit_mob_cl', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.input_address_1).clear()
            .type(address.line2)
        cy.get(x.forward_button).click()
        cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
            expect($loading).not.to.exist
        })
        cy.get(x.collapsable_bar).click()
        cy.get(x.review_items)
            .should('contain.text', address.line2)
    })
})
// Payment Page 
Cypress.Commands.add('Payment_mob_cl', () => {
    cy.fixture('locators').then((x) => {
        cy.iframe(x.card_iframe).then($ => {
            cy.wrap($[0])
                .find(x.input_card)
                .type(payment.visa_card_num_1)
                .get(x.input_card_name).type(payment.card_holder)
                .get(x.input_expiry_date).type(payment.expiration_date_2)
        })
        cy.iframe(x.cvv_iframe).then($iframes => {
            cy.wrap($iframes[0])
                .find(x.input_cvv)
                .type(payment.cvv_1)
                .get(x.checkboxes).check({ force: true }).should('be.checked')
                .get(x.forward_button).should('be.enabled')

        })
        // cy.url().then((url) => {
        //     if (url.includes('https://la.studio-uat.chubb.com/')) {
        //         cy.wait(1000)
        //         cy.get(x.forward_button).click()
        //         cy.get('.loading-indicator__container').should(($loading) => {
        //             expect($loading).not.to.exist
        //         })
        //     }
        // })
    })
})


// ARGENTINA //
// Quote 
Cypress.Commands.add('Quote_mob_ar', () => {
    cy.fixture('locators').then((x) => {
        cy.log('////// Quote /////')
        cy.get(x.button_1).click()
            .get(x.input_imei).type(mobile.tac_1 + Random(1000000, 9999999).toString())
            .get(x.quote_button).click()
        cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
            expect($loading).not.to.exist
        })
    })
})
// Personal Details 
Cypress.Commands.add('Details_mob_ar', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.input_name).type(person.name)
            .get(x.input_last_name).type(person.last_name)
            .get(x.input_birth_date).type(dob())
        cy.log('/////// Gener ///////')
        cy.get(x.select_value).first().click()
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length').then($length => {
                cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
            })
        cy.get(x.input_id).type(randomDNI())//
        cy.get(x.input_mobile).type(person.phone_1)
            .get(x.input_email).type(person.email)
            .get(x.input_address_1).type(address.line1)
            .get(x.input_address_2).type(address.line1)
            .get(x.input_address_3).type(address_ar.localidad)
            .get(x.input_city).type(address_ar.city)
            .get(x.input_province).type(address_ar.province)
            .get(x.input_zipcode).type(address_ar.zipcode)
            .get(x.forward_button).click()
        cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
            expect($loading).not.to.exist
        })
        cy.wait(1000)
        cy.get('body').then(($body) => {
            if ($body.find('app-applicant-details').is(':visible')) {
                cy.get('app-applicant-details').then(($form) => {
                    if ($form.find('mat-error').is(':visible')) {
                        cy.log('///// Bug Found /////')
                        cy.log('////// Changing ID /////')
                        cy.get(x.input_id).type(randomDNI()).wait(1000)
                        cy.get(x.forward_button).click()
                        cy.get('.loading-indicator__container', { timeout: 50000 }).should(($loading) => {
                            expect($loading).not.to.exist
                        })
                    }
                    cy.wait(1000)
                    if ($body.find('#application-errors').is(':visible')) {
                        cy.log('//// UNRECOGNIZED ERROR FOUND ////')

                    }
                })
            }

        })
    })
})
//Pyment page Checking
Cypress.Commands.add('Checking_mob_ar', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.collapsable_bar).click()
        cy.get(x.review_items)
            .should('contain.text', person.name)
            .and('contain.text', person.last_name)
            .and('contain.text', person.phone_1)
            .and('contain.text', person.email)
            .and('contain.text', address.line1)
            .and('contain.text', address.line1)
            .and('contain.text', address_ar.localidad)
            .and('contain.text', address_ar.city)
            .and('contain.text', address_ar.province)
            .and('contain.text', address_ar.zipcode)

    })
})
//Edit
Cypress.Commands.add('Edit_mob_ar', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.input_address_1).clear()
            .type(address.line2)
        cy.get(x.forward_button).click()
        cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
            expect($loading).not.to.exist
        })
        cy.get(x.collapsable_bar).click()
        cy.get(x.review_items)
            .should('contain.text', address.line2)
    })
})
// Payment Page  
Cypress.Commands.add('Payment_mob_ar', () => {
    cy.fixture('locators').then((x) => {
        cy.iframe(x.card_iframe).then($ => {
            cy.wrap($[0])
                .find(x.input_card)
                .type(payment.amex_card_num)
                .get(x.input_card_name).type(payment.card_holder)
                .get(x.input_expiry_date).type(payment.expiration_date_2)
        })
        cy.iframe(x.cvv_iframe).then($iframes => {
            cy.wrap($iframes[0])
                .find(x.input_cvv)
                .type(payment.cvv_1)
                .get(x.checkboxes).check({ force: true }).should('be.checked')
                .get(x.forward_button).should('be.enabled')

        })
        // cy.url().then((url) => {
        //     if (url.includes('https://la.studio-uat.chubb.com/')) {
        //         cy.wait(1000)
        //         cy.get(x.forward_button).click()
        //         cy.get('.loading-indicator__container').should(($loading) => {
        //             expect($loading).not.to.exist
        //         })
        //     }
        // })
    })
})


// BRASIL //
// Personal Details 
Cypress.Commands.add('Details_mob_br', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.input_name).type(person.name)
            .get(x.input_last_name).type(person.last_name)
            .get(x.input_birth_date).type(dob())
        cy.log('/////// Gener ///////')
        cy.get(x.select_value).first().click()
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length').then($length => {
                cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
            })
            .get(x.input_mobile).type(person.phone_2)
            .get(x.input_email).type(person.email)
            .get(x.input_id).type(randomCPF())
            .wait(1000)
            .get(x.input_zipcode).type(address_br.zipcode)
            .intercept('https://viacep.com.br/ws/22050000/json').as('Location')
            .wait('@Location')
            .get(x.input_address_1).type(address.line1)
            .get(x.input_ext_number).type(address_br.ext_num)
            .get(x.input_address_2).type(address.line1)
            .get(x.input_address_3).type(address_br.barrio)
            .get(x.input_city).type(address_br.city)
            .get(x.input_province).type(address_br.province)
        cy.get(x.checkboxes).check({ force: true }).should('be.checked')
            .wait(1000)
            .get(x.forward_button).click()
        cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
            expect($loading).not.to.exist
        })
        cy.wait(1000)
        cy.get('body').then(($body) => {
            if ($body.find('app-applicant-details').is(':visible')) {
                cy.get('app-applicant-details').then(($form) => {
                    if ($form.find('mat-error').is(':visible')) {
                        cy.log('///// Bug Found /////')
                        cy.log('////// Changing ID /////')
                        cy.get(x.input_id).type(randomCPF()).wait(1000)
                        cy.get(x.forward_button).click()
                        cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
                            expect($loading).not.to.exist
                        })
                    }
                    cy.wait(1000)
                    if ($body.find('#application-errors').is(':visible')) {
                        cy.log('//// UNRECOGNIZED ERROR FOUND ////')
                    }
                })
            }

        })
    })
})
//Pyment page Checking
Cypress.Commands.add('Checking_mob_br', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.review_items)
            .should('contain.text', person.name)
            .and('contain.text', person.last_name)
            .and('contain.text', person.phone_2)
            .and('contain.text', person.email)
            .and('contain.text', address_br.zipcode)
            .and('contain.text', address.line1)
            .and('contain.text', address_br.ext_num)
            .and('contain.text', address.line1)
            .and('contain.text', address_br.barrio)
            .and('contain.text', address_br.city)
            .and('contain.text', address_br.province)
    })
})
//Edit
Cypress.Commands.add('Edit_mob_br', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.input_address_1).type(address.line2)
            .get(x.input_address_3).type(address_br.barrio)
            .wait(1000)
            .get(x.input_city).type(address_br.city)
            .wait(1000)
            .get(x.input_province).type(address_br.province)
            .wait(1000)
        cy.get(x.checkboxes).check({ force: true }).should('be.checked')
            .wait(1000)
        cy.get(x.forward_button).click()
        cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
            expect($loading).not.to.exist
        })
        cy.get(x.review_items)
            .should('contain.text', address.line2)
            .and('contain.text', address.line1)
            .and('contain.text', address_br.barrio)
            .and('contain.text', address_br.city)
            .and('contain.text', address_br.province)
    })
})
// Payment Page 
Cypress.Commands.add('Payment_mob_br', () => {
    cy.fixture('locators').then((x) => {
        cy.iframe(x.card_iframe).then($ => {
            cy.wrap($[0])
                .find(x.input_card).click()
                .type(payment.visa_card_num_1)
                .get(x.input_card_name)
                .type(payment.card_holder)
                .get(x.input_expiry_date).type(payment.expiration_date)
        })
        cy.iframe(x.cvv_iframe).then($iframes => {
            cy.wrap($iframes[0])
                .find(x.input_cvv)
                .type(payment.cvv_1)
                .get(x.checkboxes).check({ force: true }).should('be.checked')
                .get(x.forward_button).should('be.enabled')

        })
        // cy.url().then((url) => {
        //     if (url.includes('https://la.studio-uat.chubb.com/')) {
        //         cy.wait(1000)
        //         cy.get(x.forward_button).click()
        //         cy.get('.loading-indicator__container').should(($loading) => {
        //             expect($loading).not.to.exist
        //         })
        //     }
        // })
    })
})


// PERU //
// Personal Details 
Cypress.Commands.add('Details_mob_pe', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.input_name).type(person.name)
            .get(x.input_last_name).type(person.last_name)
            .get(x.input_birth_date).type(dob())
        cy.log('/////// Gener ///////')
        cy.get(x.select_value).first().click()
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length').then($length => {
                cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
            })
        cy.get(x.input_id).type(randomDNI())
        cy.get(x.input_mobile).type(person.phone_1)
            .get(x.input_email).type(person.email)
            .get(x.input_address_1).type(address.line1)
            .get(x.input_address_2).type(address.line1)
            .get(x.input_address_3).type(address_ar.localidad)
            .get(x.input_city).type(address_ar.city)
            .get(x.input_province).type(address_ar.province)
            .get(x.input_postal_Code).type(address_ar.zipcode)
            .get(x.forward_button).click()
        cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
            expect($loading).not.to.exist
        })
        cy.wait(1000)
        cy.get('body').then(($body) => {
            if ($body.find('app-applicant-details').is(':visible')) {
                cy.get('app-applicant-details').then(($form) => {
                    if ($form.find('mat-error').is(':visible')) {
                        cy.log('///// Bug Found /////')
                        cy.log('////// Changing ID /////')
                        cy.get(x.input_id).type(randomDNI()).wait(1000)
                        cy.get(x.forward_button).click()
                        cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
                            expect($loading).not.to.exist
                        })
                    }
                    cy.wait(1000)
                    if ($body.find('#application-errors').is(':visible')) {
                        cy.log('//// UNRECOGNIZED ERROR FOUND ////')
                    }
                })
            }

        })
    })
})
//Pyment page Checking
Cypress.Commands.add('Checking_mob_pe', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.collapsable_bar).click()
        cy.get(x.review_items)
            .should('contain.text', person.name)
            .and('contain.text', person.last_name)
            .and('contain.text', person.phone_4)
            .and('contain.text', person.email)
            .and('contain.text', address.line1)
    })
})
//Edit
Cypress.Commands.add('Edit_mob_pe', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.input_address_1).clear()
            .type(address.line2)
        cy.get(x.forward_button).click()
        cy.get('.loading-indicator__container', { timeout: 35000 }).should(($loading) => {
            expect($loading).not.to.exist
        })
        cy.get(x.collapsable_bar).click()
        cy.get(x.review_items)
            .should('contain.text', address.line2)
    })
})
// Payment Page   
Cypress.Commands.add('Payment_mob_pe', () => {
    cy.fixture('locators').then((x) => {
        cy.iframe(x.card_iframe).then($ => {
            cy.wrap($[0])
                .find(x.input_card)
                .type(payment.visa_card_num_3)
                .get(x.input_card_name).type(payment.card_holder)
                .get(x.input_expiry_date).type(payment.expiration_date_5)
        })
        cy.iframe(x.cvv_iframe).then($iframes => {
            cy.wrap($iframes[0])
                .find(x.input_cvv)
                .type(payment.cvv4)
                .get(x.checkboxes).check({ force: true }).should('be.checked')
                .get(x.forward_button).should('be.enabled')

        })
        // cy.url().then((url) => {
        //     if (url.includes('https://la.studio-uat.chubb.com/')) {
        //         cy.wait(1000)
        //         cy.get(x.forward_button).click()

        //         cy.get('.loading-indicator__container').should(($loading) => {
        //             expect($loading).not.to.exist
        //         })
        //     }
        // })
    })
})

