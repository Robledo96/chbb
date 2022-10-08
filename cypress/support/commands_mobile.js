
import { Random, dob, randomRFC, randomRUT, randomDNI, randomCPF } from './utils'
import { person, payment, mobile, address, address_ec, address_mx, address_co, address_ar, address_br } from '../support/objects_mobile'
let n = 0
let date = dob()

// Quote
Cypress.Commands.add('quote', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.button_1).click()
            .get(x.input_imei).type(mobile.tac + Random(1000000, 9999999).toString())
            .get(x.quote_button).click()
            .wait(1000)
    })
})

// Personal Details ECUADOR
Cypress.Commands.add('personal_details_ec', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.input_name).type(person.name)
            .get(x.input_last_name).type(person.last_name)
            .get(x.input_birth_date).type(dob())
        cy.get(x.select_value).click()//gender
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length')
            .then(cy.log)
            .then(() => {
                n = Cypress._.random(0, 1)
                cy.log(n)
                cy.get(x.select_option).eq(n).click()
            })
            .get(x.input_id).type(Random(1000000000, 1999999999))//'1896297523'
            .get(x.input_mobile).type(person.phone)
            .get(x.input_email).type(person.email)
            .get(x.input_address_1).type(address.line1)
            .get(x.input_city).type(address_ec.city)
            .get(x.input_province).type(address_ec.province)
            .get(x.forward_button).click()
            .wait(20000)
        cy.get(x.errors, { timeout: 90000 }).then(($error) => {
            if ($error.is(':visible')) {
                cy.get(x.input_id).type(Random(1000000000, 1999999999))
                    .get(x.forward_button).click()
                    .wait(500)
            }
        })
    })
})
// Payment Page ECUADOR
Cypress.Commands.add('payment_page_ec', () => {
    cy.fixture('locators').then((x) => {

        cy.url().then((url) => {
            if (url.includes('/diners/')) {
                //Diners
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
                    //OLX
                    cy.iframe(x.card_iframe).then($ => {
                        cy.wrap($[0])
                            .find(x.input_card).click()
                            .type(payment.visa_card_num)
                            .wait(500)
                            .get(x.input_card_name).click().type(payment.card_holder)
                            .get(x.input_expiry_date).click().type(payment.expiration_date_1)
                    })
                    cy.iframe(x.cvv_iframe).then($iframes => {
                        cy.wrap($iframes[0])
                            .find(x.input_cvv).click()
                            .type(payment.cvv)
                            .wait(500)
                            .get(x.checkboxes).click({ multiple: true })
                            .wait(500)
                            .get(x.forward_button).should('be.enabled')

                    })
                }
            })
        })

    })
})

// Personal Details MEXICO
Cypress.Commands.add('personal_details_mx', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.input_name).type(person.name)
            .get(x.input_last_name).type(person.last_name)
            .get(x.input_birth_date).type(dob())
            .get(x.input_id).type(randomRFC())//'ANML891018J47'
        cy.get(x.select_value_1).click()
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length')
            .then(cy.log)
            .then(() => {
                n = Cypress._.random(0, 18)
                cy.log(n)
                cy.get(x.select_option).eq(n).click()
            })
        cy.get(x.input_mobile).type(person.phone_1)
            .get(x.input_email).type(person.email)
            .get(x.input_postal_Code).type(address_mx.zipcode)
        cy.url().then((url) => {
            if (url.includes('/la.studio-uat.chubb.com/')) {
                cy.wait(50000)
            } else {
                cy.wait(10000)
            }
        })

        cy.get(x.input_colonia).type(address_mx.colonia)
            .get(x.input_address_1).type(address.line1)
        cy.url().then((url) => {
            if (url.includes('/marsh/')) {
                cy.get(x.input_company).type('América Móvil')
            }
        })

        cy.get(x.forward_button).click()
            .wait(10000)
        cy.get(x.errors).then(($error) => {
            if ($error.is(':visible')) {
                cy.get(x.input_birth_date).clear()
                    .get(x.input_birth_date).type(dob())
                    .get(x.input_id).type(randomRFC())
                    .get(x.forward_button).click()
                    .wait(500)
            }
        })
    })
})
// Payment Page MEXICO
Cypress.Commands.add('payment_page_mx', () => {
    cy.fixture('locators').then((x) => {
        cy.iframe(x.card_iframe).then($ => {
            cy.wrap($[0])
                .find(x.input_card)
                .type(payment.visa_card_num_1)
                .wait(500)
                .get(x.input_card_name).type(payment.card_holder)
                .get(x.input_expiry_date).type(payment.expiration_date_2)
        })
        cy.iframe(x.cvv_iframe).then($iframes => {
            cy.wrap($iframes[0])
                .find(x.input_cvv)
                .type(payment.cvv_1)
                .wait(500)
                .get(x.checkboxes).click({ multiple: true })
                .wait(500)
                .get(x.input_expiry_date).click()
                .get(x.input_card_name).click()
                .get(x.forward_button).should('be.enabled')

        })
    })
})

// Personal Details COLOMBIA
Cypress.Commands.add('personal_details_co', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.input_name).type(person.name)
            .get(x.input_last_name).type(person.last_name)
            .get(x.input_birth_date).first().type(date)
        cy.get(x.select_value).first().click()
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length')
            .then(cy.log)
            .then(() => {
                n = Cypress._.random(0, 1)
                cy.log(n)
                cy.get(x.select_option).eq(n).click()
            })
            .get(x.input_id).type(Random(1000000000, 1999999999))//'1896297523'
            .get(x.input_birth_date).eq(1).type(date)
            .get(x.input_mobile).type(person.phone_3)
            .get(x.input_email).type(person.email)
            .get(x.input_address_1).type(address.line1)
            .get(x.input_province).type(address_co.department)
            .get(x.input_city).type(address_co.city)
        cy.get(x.select_value).eq(1).click()
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length')
            .then(cy.log)
            .then(() => {
                n = Cypress._.random(0, 1)
                cy.log(n)
                cy.get(x.select_option).eq(n).click()
            })
            .get(x.forward_button).click()
            .wait(10000)
        cy.get(x.errors).then(($error) => {
            if ($error.is(':visible')) {
                cy.get(x.input_id).type(Random(1000000000, 1999999999))
                    .get(x.forward_button).click()
                    .wait(500)
            }
        })
    })
})

// Payment Page COLOMBIA
Cypress.Commands.add('payment_page_co', () => {
    cy.fixture('locators').then((x) => {
        cy.iframe(x.card_iframe).then($ => {
            cy.wrap($[0])
                .find(x.input_card)
                .type(payment.amex_card_num)
                .wait(500)
                .get(x.input_card_name).type(payment.card_holder)
                .get(x.input_expiry_date).type(payment.expiration_date)
        })
        cy.iframe(x.cvv_iframe).then($iframes => {
            cy.wrap($iframes[0])
                .find(x.input_cvv)
                .type(payment.cvv_2)
                .wait(500)
                .get(x.checkboxes).click({ multiple: true })
                .wait(500)
                .get(x.input_expiry_date).click()
                .get(x.forward_button).should('be.enabled')

        })
    })
})

// Personal Details CHILE
Cypress.Commands.add('personal_details_cl', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.input_name).type(person.name)
            .get(x.input_last_name).type(person.last_name)
            .get(x.input_birth_date).type(dob())
        cy.get(x.select_value).first().click()//gender
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length')
            .then(cy.log)
            .then(() => {
                n = Cypress._.random(0, 1)
                cy.log(n)
                cy.get(x.select_option).eq(n).click()
            })
        cy.get(x.input_id).type(randomRUT(10000000, 40000000))
        cy.get(x.input_mobile).type(person.phone_4)
            .get(x.input_email).type(person.email)
            .get(x.input_address_1).type(address.line1)
        cy.get(x.select_value).last().click()
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length')
            .then(cy.log)
            .then(() => {
                n = Cypress._.random(0, 346)
                cy.log(n)
                cy.get(x.select_option).eq(n).click()
            })
            .wait(1000)
            .get(x.forward_button).click()
            .wait(10000)
        cy.get(x.errors).then(($error) => {
            if ($error.is(':visible')) {
                cy.get(x.input_birth_date).clear()
                    .get(x.input_birth_date).type(dob())
                    .get(x.input_id).type(randomRUT(1000000, 40000000))
                    .get(x.forward_button).click()
                    .wait(500)
            }
        })
    })
})
// Payment Page CHILE
Cypress.Commands.add('payment_page_cl', () => {
    cy.fixture('locators').then((x) => {
        cy.iframe(x.card_iframe).then($ => {
            cy.wrap($[0])
                .find(x.input_card)
                .type(payment.visa_card_num_1)
                .wait(500)
                .get(x.input_card_name).type(payment.card_holder)
                .get(x.input_expiry_date).type(payment.expiration_date_2)
        })
        cy.iframe(x.cvv_iframe).then($iframes => {
            cy.wrap($iframes[0])
                .find(x.input_cvv)
                .type(payment.cvv_1)
                .wait(500)
                .get(x.checkboxes).click({ multiple: true })
                .wait(500)
                .get(x.input_expiry_date).click()
                .get(x.forward_button).should('be.enabled')

        })
    })
})

// Quote ARGENTINA
Cypress.Commands.add('quote_ar', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.button_1).click()
            .get(x.input_imei).type(mobile.tac_1 + Random(1000000, 9999999).toString())
            .get(x.quote_button).click()
            .wait(500)
    })
})
// Personal Details ARGENTINA
Cypress.Commands.add('personal_details_ar', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.input_name).type(person.name)
            .get(x.input_last_name).type(person.last_name)
            .get(x.input_birth_date).type(dob())
        cy.get(x.select_value).first().click()//gender
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length')
            .then(cy.log)
            .then(() => {
                n = Cypress._.random(0, 1)
                cy.log(n)
                cy.get(x.select_option).eq(n).click()
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
            .wait(10000)
        cy.get(x.errors).then(($error) => {
            if ($error.is(':visible')) {
                cy.get(x.input_id).type(randomDNI())
                    .get(x.forward_button).click()
                    .wait(500)
            }
        })
    })
})
// Payment Page ARGENTINA //falta tarjeta cvv y exp.date
Cypress.Commands.add('payment_page_ar', () => {
    cy.fixture('locators').then((x) => {
        cy.iframe(x.card_iframe).then($ => {
            cy.wrap($[0])
                .find(x.input_card)
                .type(payment.visa_card_num_1)
                .wait(500)
                .get(x.input_card_name).type(payment.card_holder)
                .get(x.input_expiry_date).type(payment.expiration_date)
        })
        cy.iframe(x.cvv_iframe).then($iframes => {
            cy.wrap($iframes[0])
                .find(x.input_cvv)
                .type(payment.cvv1)
                .wait(500)
                .get(x.checkboxes).click({ multiple: true })
                .wait(500)
                .get(x.input_expiry_date).click()
                .get(x.forward_button).should('be.enabled')

        })
    })
})

// Personal Details BRASIL
Cypress.Commands.add('personal_details_br', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.input_name).type(person.name)
            .get(x.input_last_name).type(person.last_name)
            .get(x.input_birth_date).type(dob())
        cy.get(x.select_value).first().click()//gender
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length')
            .then(cy.log)
            .then(() => {
                n = Cypress._.random(0, 1)
                cy.log(n)
                cy.get(x.select_option).eq(n).click()
            })
            .get(x.input_mobile).type(person.phone_2)
            .get(x.input_email).type(person.email)
            .get(x.input_id).type(randomCPF())
            .wait(1000)
            .get(x.input_postal_Code).type(address_br.zipcode)
            .wait(1000)
            .get(x.input_address_1).type(address.line1)
            .get(x.input_ext_number).type(address_br.ext_num)
            .wait(1000)
            .get(x.input_address_2).type(address.line1)
            .wait(1000)
            .get(x.input_address_3).type(address_br.barrio)
            .wait(1000)
            .get(x.input_city).type(address_br.city)
            .wait(1000)
            .get(x.input_province).type(address_br.province)
            .wait(1000)
            .get(x.checkboxes).click({ multiple: true })
            .wait(1000)
            .get(x.forward_button).click()
            .wait(10000)
        cy.get(x.errors).then(($error) => {
            if ($error.is(':visible')) {
                cy.get(x.input_id).type(randomCPF())
                    .get(x.forward_button).click()
                    .wait(500)
            }
        })
    })
})
// Payment Page BARSIL
Cypress.Commands.add('payment_page_br', () => {
    cy.fixture('locators').then((x) => {
        cy.iframe(x.card_iframe).then($ => {
            cy.wrap($[0])
                .find(x.input_card)
                .type(payment.visa_card_num_1)
                .wait(500)
                .get(x.input_card_name).type(payment.card_holder)
                .get(x.input_expiry_date).type(payment.expiration_date)
        })
        cy.iframe(x.cvv_iframe).then($iframes => {
            cy.wrap($iframes[0])
                .find(x.input_cvv)
                .type(payment.cvv_1)
                .wait(500)
                .get(x.checkboxes).click({ multiple: true })
                .wait(500)
                .get(x.input_expiry_date).click()
                .get(x.forward_button).should('be.enabled')

        })
    })
})

// Personal Details PREU
Cypress.Commands.add('personal_detail_pe', () => {
    cy.fixture('locators').then((x) => {
        cy.get(x.input_name).type(person.name)
            .get(x.input_last_name).type(person.last_name)
            .get(x.input_birth_date).type(dob())
        cy.get(x.select_value).first().click()//gender
            .get(x.select_option).should('have.length.greaterThan', 0)
            .its('length')
            .then(cy.log)
            .then(() => {
                n = Cypress._.random(0, 1)
                cy.log(n)
                cy.get(x.select_option).eq(n).click()
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
            .wait(10000)
        cy.get(x.errors).then(($error) => {
            if ($error.is(':visible')) {
                cy.get(x.input_id).type(randomDNI())
                    .get(x.forward_button).click()
                    .wait(500)
            }
        })
    })
})
// Payment Page PERU  //falta tarjeta cvv y exp.date
Cypress.Commands.add('payment_page_pe', () => {
    cy.fixture('locators').then((x) => {
        cy.iframe(x.card_iframe).then($ => {
            cy.wrap($[0])
                .find(x.input_card)
                .type(payment.visa_card_num_3)
                .wait(500)
                .get(x.input_card_name).type(payment.card_holder)
                .get(x.input_expiry_date).type(payment.expiration_date_5)
        })
        cy.iframe(x.cvv_iframe).then($iframes => {
            cy.wrap($iframes[0])
                .find(x.input_cvv)
                .type(payment.cvv4)
                .wait(500)
                .get(x.checkboxes).click({ multiple: true })
                .wait(500)
                .get(x.input_expiry_date).click()
                .get(x.forward_button).should('be.enabled')

        })
    })
})

