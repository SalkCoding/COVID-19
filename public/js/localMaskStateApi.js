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
        const stores = dictionary.stores
        for(let i = 0;i<stores.length;i++){
            const store = stores[i]
            switch(store.remain_stat){
                case 'plenty':
                    store.remain_stat = '>100'
                    break;
                case 'some':
                    store.remain_stat = '30~100'
                    break;
                case 'few':
                    store.remain_stat = '1~30'
                    break;
                case 'empty':
                    store.remain_stat = 'Run out'
                    break;
                case 'break':
                    store.remain_stat = 'Stop selling'
                    break;
                default:
                    store.remain_stat = 'Not sales'
                    store.created_at = '-'
                    store.stock_at = '-'
                    break;
            }
        }
        resolve(dictionary)
    })
};