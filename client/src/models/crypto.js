const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');
const API_CRYPTO_KEY = require('../api_crypto_key.js');

const CryptoData = function (url) {
  this.url = 'https://api.iextrading.com/1.0/stock/market/crypto';
};

CryptoData.prototype.bindEvents = function () {

  PubSub.subscribe('Crypto:request-singledata', (evt) => {
    this.callSingleCrypto(evt.detail);
  });

  PubSub.subscribe('Crypto:request-historicaldata', (evt) => {
    this.callHistoricalCrypto(evt.detail);
  });
};

CryptoData.prototype.initialize = function () {
  this.bindEvents();
  this.callCryptoPairs();
};

CryptoData.prototype.callCryptoPairs = function () {
  const newURL = 'https://api.iextrading.com/1.0/stock/market/crypto';
  const request = new Request(newURL);
  request.get().then((data) => {
    PubSub.publish('Crypto:publish-pairs', data);
  });
};

CryptoData.prototype.callHistoricalCrypto = function (symbol) {
  const newURL = `https://min-api.cryptocompare.com/data/histoday?fsym=${symbol.substring(0,3)}&tsym=${symbol.substring(3,6)}&limit=30&aggregate=3&e=CCCAGG`;
  const request = new Request(newURL);
  request.get().then((data) => {
    PubSub.publish('Graph:publish-crypto', data);
  });
};


module.exports = CryptoData;
