/*
* Using setTimeout for update dictionary
* Data api will be updated every 5min
* https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/stores/json?page=1~54
*/
const fetch = require('node-fetch');
const dictionary = {
    storeInfos : []
};
const maxPage = 1;

exports.refreshState = async () => {
    //let sum = 0
    for (let i = 1; i <= maxPage; i++) {
        const url = 'https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/stores/json?page=' + i
        const response = await fetch(url)
        const body = await response.text()
        const json = JSON.parse(body)
        dictionary.storeInfos = dictionary.storeInfos.concat(json['storeInfos'])
        //Loading percentage
        /*sum += json['storeInfos'].length
        console.log(`progress : ${(i / maxPage * 100.0).toFixed(1)}%`)
        console.log(`count : ${sum}(+${json['storeInfos'].length})`)*/
    }
    //console.log(`count of data : ${sum}`)
};

exports.getState = () => {
    return dictionary
}