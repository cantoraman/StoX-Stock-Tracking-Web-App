const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');
const API_CRYPTO_KEY = require('../api_crypto_key.js');

const CryptoData = function (url) {
  this.url = 'https://api.iextrading.com/1.0/stock/market/crypto';
};

CryptoData.prototype.bindEvents = function () {

  PubSub.subscribe('Crypto:request-data', (evt) => {
    this.url = 'https://api.iextrading.com/1.0/stock/market/crypto';
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
  const newURL = 'https://api.iextrading.com/1.0/stock/market/crypto';
  const request = new Request(newURL);
  request.get().then((data) => {
    this.publishCryptoData(data);
  });
};



module.exports = CryptoData;