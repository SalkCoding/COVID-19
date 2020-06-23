/*
* For world confirm cases
* https://api.covid19api.com/summary
*/
const fetch = require('node-fetch')
let dictionary;

exports.refreshState = async () => {
    const response = await fetch('https://api.covid19api.com/summary')
    const body = await response.text()

    dictionary = JSON.parse(body)

    //console.log(worldState)
}

exports.getState = () => {
    return dictionary
}