/*
* Need to be HTML parser
* id="main_maplayout" -> buttons have data. span class="name" is city
* http://ncov.mohw.go.kr
*/
const cheerio = require('cheerio')
const fetch = require('node-fetch')
const dictionary = {
    data:[]
};

module.exports.refreshState = async () => {
    const response = await fetch('http://ncov.mohw.go.kr')
    const body = await response.text()

    const $ = cheerio.load(body)
    const result = $('button', '#main_maplayout')

    for (let i = 0; i < result.length; i++) {
        const span = result[i]['children']
        dictionary.data[i] = {
            city: span[0]['children'][0]['data'],
            case: span[1]['children'][0]['data'] + span[2]['children'][0]['data']
        }
    }
};

module.exports.getState = () => {
    return dictionary
}

