var month = 0;
var day = 0;
var year = 0;
// Function generates date of birth
function getRandomArbitrary(min, max) {
    var upper = max + 1                      // random() upper limit is excluded
    return Math.floor(Math.random() * (max - min) + min)
}
// Function generates date of birth
function dob() {
    month = getRandomArbitrary(10, 12);
    day = month === 11 ? getRandomArbitrary(10, 30) : getRandomArbitrary(10, 31);
    year = getRandomArbitrary(1940, 2000);
    return day + '/' + month + '/' + year
}
//Function generate random id
function randomId(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
//Function generate random RFC
function randomRFC() {
    var year2 = (year.toString()).substr(-2);
    return "ANML" + year2 + month + day + "J47"
}

export {
    getRandomArbitrary,
    dob,
    randomId,
    randomRFC
}

