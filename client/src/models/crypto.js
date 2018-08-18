const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');
const API_CRYPTO_KEY = require('../api_crypto_key.js');

const CryptoData = function (url) {
  this.url =`https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=USD&apikey=${API_CRYPTO_KEY}`;
};

CryptoData.prototype.bindEvents = function () {

  PubSub.subscribe('Crypto:request-data', (evt) => {
    this.url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=USD&apikey=${API_CRYPTO_KEY}`;
  });

};

CryptoData.prototype.initialize = function () {
  const request = new Request(this.url);
  request.get().then((data) => {
    this.publishCryptoData(data);
  });
};


CryptoData.prototype.publishCryptoData = function (data) {
  PubSub.publish('Crypto:publish-data', data);
};

CryptoData.prototype.callSingleCrypto = function (symbol) {
  const newURL = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${symbol}&market=USD&apikey=${API_CRYPTO_KEY}`;
  const request = new Request(newURL);
  request.get().then((data) => {
    this.publishCryptoData(data);
  });
};



module.exports = CryptoData;
