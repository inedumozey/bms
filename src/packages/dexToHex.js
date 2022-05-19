function resolve(val){
    let val_
    switch(val){
        case 10: val_ = "a"; break;
        case 11: val_ = "b"; break;
        case 12: val_ = "c"; break;
        case 13: val_ = "d"; break;
        case 14: val_ = "e"; break;
        case 15: val_ = "f"; break;
        default: val_ = val
    };
    return val_
}
function dexToHex(a, b, c){
    //first digit
    const first = resolve(Math.floor(a / 16))
    const firstRem = resolve(Math.floor(a % 16))

    //second digit
    const second = resolve(Math.floor(b / 16))
    const secondRem = resolve(Math.floor(b % 16))

    //third digit
    const third = resolve(Math.floor(c / 16))
    const thirdRem = resolve(Math.floor(c % 16))

    //add them up
    const rgb = "#" + first + firstRem + second + secondRem + third + thirdRem
    return rgb;
}

module.exports = {dexToHex};