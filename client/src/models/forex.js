const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');
const API_KEY_STOCK_CHART = require('../api_key_stock_charts.js');
const API_KEY_ALPHAVANTAGE = require('../api_key_alphavantage.js');

const Forex = function (url) {
  this.url =url;
};

Forex.prototype.bindEvents = function () {
  PubSub.subscribe('Forex:request-historicaldata', (evt) => {
        this.callHistoricalForex(evt.detail);
  });
};

Forex.prototype.initialize = function () {
  this.bindEvents();
  var firstCurrency = ["EUR", "GBP", "USD", "AUD", "USD", "EUR", "USD", "TRY"];
  var secondCurrency = ["USD", "USD", "JPY", "USD", "CHF", "GBP", "CAD", "PGK"];
  var exchangePrices = [];

  let request = new Request(`https://forex.1forge.com/1.0.3/quotes?pairs=EURUSD,GBPUSD,USDJPY,AUDUSD,USDCHF,EURGBP,USDCAD,TRYUSD&api_key=${API_KEY_STOCK_CHART}`);
  request.get().then((data) => {
  this.publishExchangeRates(data)
  });

  };


Forex.prototype.publishExchangeRates = function (data) {
 PubSub.publish('Forex:publish-listOfPrices', data);
  };


Forex.prototype.callHistoricalForex = function (symbol) {
  const newURL = `  https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${symbol.substring(0,3)}&to_symbol=${symbol.substring(3,6)}&outputsize=compact&apikey=${API_KEY_ALPHAVANTAGE}`;

  const request = new Request(newURL);
  request.get().then((data) => {
    PubSub.publish('Graph:publish-forex', data);
  });
  };



module.exports = Forex;
