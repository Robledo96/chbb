var month = 0;
var day = 0;
var year = 0;
// Function generates random
function Random(min, max) {

    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min) + min)
}
// Function generates date of birth
function dob() {
    month = Random(10, 12);
    day = month === 11 ? Random(10, 30) : Random(10, 31);
    year = Random(1940, 2000);
    return day + '/' + month + '/' + year
}

//Function generate random RUT
function randomRUT() {

    var min = Math.ceil(1);
    var max = Math.floor(9);


    var residual, numbers, digit;

    var n1 = Math.floor(Math.random() * (max - min) + min);
    var n2 = Math.floor(Math.random() * (max - min) + min);
    var n3 = Math.floor(Math.random() * (max - min) + min);
    var n4 = Math.floor(Math.random() * (max - min) + min);
    var n5 = Math.floor(Math.random() * (max - min) + min);
    var n6 = Math.floor(Math.random() * (max - min) + min);
    var n7 = Math.floor(Math.random() * (max - min) + min);
    var n8 = Math.floor(Math.random() * (max - min) + min);

    var sum = n8 * 2 + n7 * 3 + n6 * 4 + n5 * 5 + n4 * 6 + n3 * 7 + n2 * 2 + n1 * 3

    residual = sum % 11

    digit = 11 - residual

    if (digit == "11") {

        digit = "0";
    }

    if (digit == "10") {

        digit = "K";
    }

    numbers = "" + n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8+'-'
    return numbers + digit;

}
//Function generate random RFC
function randomRFC() {
    var year2 = (year.toString()).substr(-2);
    return "ANML" + year2 + month + day + "J47"
}

export {
    dob,
    Random,
    randomRFC,
    randomRUT
}

