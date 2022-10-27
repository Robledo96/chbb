
import { Random, dob, randomRFC, randomRUT, randomDNI, randomCPF } from './utils'
import { person, payment, mobile, address, address_ec, address_mx, address_co, address_ar, address_br } from '../support/objects_mobile'
let date = dob()

// Quote
Cypress.Commands.add('quote', () => {
    cy.fixture('locators').then((x) => {
        cy.log('////// Quote /////')
        cy.get(x.button_1).click()
            .get(x.input_imei).type(mobile.tac + Random(1000000, 9999999).toString())
            .get(x.quote_button).click()
        cy.get('.loading-indicator__container').should(($loading) => {
            expect($loading).not.to.exist
        })
        cy.log('////// Select PLan /////')
        cy.get(x.plans_select_button).click()
        cy.get('.loading-indicator__container').should(($loading) => {
            expect($loading).not.to.exist
        })
    })
})

// ECUADOR
// Personal Details 
Cypress.Commands.add('personal_details_ec', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.input_name).type(person.name)
            .get(x.input_last_name).type(person.last_name)
            .get(x.input_birth_date).type(dob())
        cy.log('/////// Gener //////')
        cy.get(x.select_value).click()
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length').then(($length) => {
                cy.get(x.select_option).eq(Cypress._.random($length - 1)).click()
            })
            .get(x.input_id).type(1896297523)//'1896297523'
            .get(x.input_mobile).type(person.phone)
            .get(x.input_email).type(person.email)
            .get(x.input_address_1).type(address.line1)
            .get(x.input_city).type(address_ec.city)
            .get(x.input_province).type(address_ec.province)
            .get(x.forward_button).click()
        cy.get('.loading-indicator__container').should(($loading) => {
            expect($loading).not.to.exist
        })
        cy.wait(1000)
        cy.get('form').then($form => {
            if ($form.find(x.errors).is(':visible')) {
                cy.log('///// Bug Found /////')
                if (cy.get(x.errors).should('contain.text', ' Ingresa tu cédula ')) {
                    cy.log('////// Changing ID /////')
                    cy.get(x.input_id).type(Random(1000000000, 1999999999)).wait(1000)
                        .get(x.forward_button).click()
                }
            }
        })
        cy.get('.loading-indicator__container').should(($loading) => {
            expect($loading).not.to.exist
        })
    })
})
// Payment Page 
Cypress.Commands.add('payment_page_ec', () => {
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
                        .wait(500)
                        .get(x.input_card_name).type(payment.card_holder)
                        .get(x.input_expiry_date).type(payment.expiration_date)

                        .get(x.checkboxes).click({ multiple: true })
                        .wait(500)
                        .get(x.input_expiry_date).click({ multiple: true })
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
            cy.url().then((url) => {
                if (url.includes('https://la.studio-uat.chubb.com/')) {
                    cy.wait(1000)
                    cy.get(x.forward_button).click()

                    cy.get('.loading-indicator__container').should(($loading) => {
                        expect($loading).not.to.exist
                    })
                }
            })
        })

    })
})

// MEXICO
// Personal Details 
Cypress.Commands.add('personal_details_mx', () => {
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
        cy.get('.loading-indicator__container').should(($loading) => {
            expect($loading).not.to.exist
        })
        cy.wait(1000)
        cy.get('form').then($form => {
            if ($form.find(x.errors).is(':visible')) {
                cy.log('///// Bug Found /////')
                if (cy.get(x.errors).should('contain.text', "  RFC Inválido  ")) {
                    cy.log('////// Changing ID /////')
                    cy.get(x.input_id).type(randomRFC()).wait(1000)
                        .get(x.forward_button).click()
                }
            }
        })
        cy.get('.loading-indicator__container').should(($loading) => {
            expect($loading).not.to.exist
        })

    })
})
// Payment Page 
Cypress.Commands.add('payment_page_mx', () => {
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
        cy.url().then((url) => {
            if (url.includes('https://la.studio-uat.chubb.com/')) {
                cy.wait(1000)
                cy.get(x.forward_button).click()

                cy.get('.loading-indicator__container').should(($loading) => {
                    expect($loading).not.to.exist
                })
            }
        })
    })
})

// COLOMBIA
// Personal Details 
Cypress.Commands.add('personal_details_co', () => {
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
        cy.get('.loading-indicator__container').should(($loading) => {
            expect($loading).not.to.exist
        })
        cy.wait(1000)
        cy.get('form').then($form => {
            if ($form.find(x.errors).is(':visible')) {
                cy.log('///// Bug Found /////')
                if (cy.get(x.errors).should('contain.text', ' Ingresa tu cédula ')) {
                    cy.log('////// Changing ID /////')
                    cy.get(x.input_id).type(Random(1000000000, 1999999999)).wait(1000)
                        .get(x.forward_button).click()
                }
            }
        })
        cy.get('.loading-indicator__container').should(($loading) => {
            expect($loading).not.to.exist
        })
    })
})
// Payment Page 
Cypress.Commands.add('payment_page_co', () => {
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
        cy.url().then((url) => {
            if (url.includes('https://la.studio-uat.chubb.com/')) {
                cy.wait(1000)
                cy.get(x.forward_button).click()

                cy.get('.loading-indicator__container').should(($loading) => {
                    expect($loading).not.to.exist
                })
            }
        })
    })
})

// CHILE
// Personal Details 
Cypress.Commands.add('personal_details_cl', () => {
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
        cy.get(x.input_id).type(randomRUT(10000000, 40000000))
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
        cy.get('.loading-indicator__container').should(($loading) => {
            expect($loading).not.to.exist
        })
        cy.wait(1000)
        cy.get('form').then($form => {
            if ($form.find(x.errors).is(':visible')) {
                cy.log('///// Bug Found /////')
                if (cy.get(x.errors).should('contain.text', ' Ingresa tu cédula ')) {
                    cy.log('////// Changing ID /////')
                    cy.get(x.input_id).type(randomRUT(10000000, 40000000)).wait(1000)
                        .get(x.forward_button).click()
                }
            }
        })
        cy.get('.loading-indicator__container').should(($loading) => {
            expect($loading).not.to.exist
        })
    })
})
// Payment Page 
Cypress.Commands.add('payment_page_cl', () => {
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
        cy.url().then((url) => {
            if (url.includes('https://la.studio-uat.chubb.com/')) {
                cy.wait(1000)
                cy.get(x.forward_button).click()

                cy.get('.loading-indicator__container').should(($loading) => {
                    expect($loading).not.to.exist
                })
            }
        })
    })
})

// ARGENTINA
// Quote 
Cypress.Commands.add('quote_ar', () => {
    cy.fixture('locators').then((x) => {
        cy.log('////// Quote /////')
        cy.get(x.button_1).click()
            .get(x.input_imei).type(mobile.tac_1 + Random(1000000, 9999999).toString())
            .get(x.quote_button).click()
        cy.get('.loading-indicator__container').should(($loading) => {
            expect($loading).not.to.exist
        })
        cy.log('////// Select PLan /////')
        cy.get(x.plans_select_button).click()
        cy.get('.loading-indicator__container').should(($loading) => {
            expect($loading).not.to.exist
        })
    })
})
// Personal Details 
Cypress.Commands.add('personal_details_ar', () => {
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
        cy.get('.loading-indicator__container').should(($loading) => {
            expect($loading).not.to.exist
        })
        cy.wait(1000)
        cy.get('form').then($form => {
            if ($form.find(x.errors).is(':visible')) {
                cy.log('///// Bug Found /////')
                if (cy.get(x.errors).should('contain.text', ' Ingresa tu cédula ')) {
                    cy.log('////// Changing ID /////')
                    cy.get(x.input_id).type(randomDNI()).wait(1000)
                        .get(x.forward_button).click()
                }
            }
        })
        cy.get('.loading-indicator__container').should(($loading) => {
            expect($loading).not.to.exist
        })
    })
})
// Payment Page  
Cypress.Commands.add('payment_page_ar', () => {
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
        cy.url().then((url) => {
            if (url.includes('https://la.studio-uat.chubb.com/')) {
                cy.wait(1000)
                cy.get(x.forward_button).click()

                cy.get('.loading-indicator__container').should(($loading) => {
                    expect($loading).not.to.exist
                })
            }
        })
    })
})

// BRASIL
// Personal Details 
Cypress.Commands.add('personal_details_br', () => {
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
            .get(x.checkboxes).click({ multiple: true })
            .wait(1000)
            .get(x.forward_button).click()
        cy.get('.loading-indicator__container').should(($loading) => {
            expect($loading).not.to.exist
        })
        cy.wait(1000)
        cy.get('form').then($form => {
            if ($form.find(x.errors).is(':visible')) {
                cy.log('///// Bug Found /////')
                if (cy.get(x.errors).should('contain.text', ' Ingresa tu cédula ')) {
                    cy.log('////// Changing ID /////')
                    cy.get(x.input_id).type(randomCPF()).wait(1000)
                        .get(x.forward_button).click()
                }
            }
        })
        cy.get('.loading-indicator__container').should(($loading) => {
            expect($loading).not.to.exist
        })
    })
})
// Payment Page 
Cypress.Commands.add('payment_page_br', () => {
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
        cy.url().then((url) => {
            if (url.includes('https://la.studio-uat.chubb.com/')) {
                cy.wait(1000)
                cy.get(x.forward_button).click()

                cy.get('.loading-indicator__container').should(($loading) => {
                    expect($loading).not.to.exist
                })
            }
        })
    })
})

// PERU
// Personal Details 
Cypress.Commands.add('personal_detail_pe', () => {
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
        cy.get('.loading-indicator__container').should(($loading) => {
            expect($loading).not.to.exist
        })
        cy.wait(1000)
        cy.get('form').then($form => {
            if ($form.find(x.errors).is(':visible')) {
                cy.log('///// Bug Found /////')
                if (cy.get(x.errors).should('contain.text', ' Ingresa tu cédula ')) {
                    cy.log('////// Changing ID /////')
                    cy.get(x.input_id).type(randomDNI()).wait(1000)
                        .get(x.forward_button).click()
                }
            }
        })
        cy.get('.loading-indicator__container').should(($loading) => {
            expect($loading).not.to.exist
        })
    })
})
// Payment Page PERU  
Cypress.Commands.add('payment_page_pe', () => {
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
        cy.url().then((url) => {
            if (url.includes('https://la.studio-uat.chubb.com/')) {
                cy.wait(1000)
                cy.get(x.forward_button).click()

                cy.get('.loading-indicator__container').should(($loading) => {
                    expect($loading).not.to.exist
                })
            }
        })
    })
})

