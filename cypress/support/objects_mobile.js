var person = {
    name: "Leonel",
    last_name: "Andres Messi",
    email: "leo.messi@x.com",
    phone: "(685) 676-6757",
    phone_1: "3452736757",
    phone_2: "12456575777",
    phone_3: "(316) 621-4030",
    phone_4: "364874875"

}

var payment = {
    card_holder: "Test Case",
    
    //Mobile: Dainers-EC
    dinersClub_card_num: 30569309025904,
    expiration_date_1: "0525",
    
    //Mobile: OLX-EC
    visa_card_num_1: 4540630099990031,
    cvv1: "484",
    expiration_date_2: "0723",
    
    //Mobile: RAPPI-MX, HEYBANCO_MX, MARSH-MX, AUTOMOVILCLUB-CL, UNIRED-CL
    visa_card_num_2: 4111111111111111,
    cvv2: "777",
    expiration_date_3: "0126",
    
    //Mobile: CAFAM-CO, COLSUBSIDIO-CO 
    amex_card_num: 377813000000001,
    cvv3: "7777",
    expiration_date_4: "0525",
     
    //Mobile: HARTB-BR
     visa_card_num_3: 4111111111111111,
     cvv4: "777",
     expiration_date_5: "0525",
}

var mobile = {
    tac: "35006042",
    model: "Apple iPhone 12 Pro Max",

    tac_1: "35016048",
    model_1: "Apple iPhone 11"

}
var address = {
    line1: "Vigia Dep 1 ",
    line2: "Vigia Piso 3"
}
var address_ec = {
    city: "Guayaquil",
    province: "Pichincha"
}

var address_mx = {
    zipcode: "50000",
    colonia: "Toluca De Lerdo Centro",
    company: "América Móvil"
}
var address_co = {
    city: "Leticia",
    departamento: "Amazonas"
}
var address_ar = {
    localidad: "Aguas Verdes",
    city: "Buenos Aires",
    province: "Buenos Aires",
    zipcode: "1000"
}
var address_br = {
    zipcode: "22050-000",
    ext_num: "196",
    barrio: "Gamboa",
    city: "Rio de Janeiro",
    province: "RJ"

}

export {
    person,
    mobile,
    payment,
    address,
    address_ec,
    address_mx,
    address_co,
    address_ar,
    address_br
};