/*
* Using setTimeout for update dictionary
* Data api will be updated every 5min
*/
const fetch = require('node-fetch');
const dictionary = {};

exports.getMaskState = async (coordinate) => {
    const url = `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=${coordinate.lat}&lng=${coordinate.lng}&m=2000`
    const response = await fetch(url)
    const body = await response.text()
    const json = JSON.parse(body)
    dictionary.stores = json['stores']
    return new Promise(function (resolve, reject) {
        resolve(dictionary)
    })
};