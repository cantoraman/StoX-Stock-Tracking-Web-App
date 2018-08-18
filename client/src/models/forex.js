const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');
const API_KEY_STOCK_CHART = require('../api_key_stock_charts.js');


const Forex = function (url) {
  this.url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=JPY&apikey=${API_KEY_STOCK_CHART}`;
  this.request = new Request(this.url);
};

Forex.prototype.bindEvents = function () {

  PubSub.subscribe('', (evt) => {
    this.url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${evt.detail.firstCurrency}to_currency=${evt.detail.secondCurrency}&apikey=${API_KEY_STOCK_CHART}`;
      const request = new Request(this.url);
      console.log("RECEIVED FOREX REQUEST");
  });

};

Forex.prototype.initialize = function () {
  var firstCurrency = ["EUR", "GBP", "USD", "AUD", "USD", "EUR", "USD", "TRY"];
  var secondCurrency = ["USD", "USD", "JPY", "USD", "CHF", "GBP", "CAD", "PGK"];
  var exchangePrices = [];

  for (var i = 0; i < 8; i++) {

  let request = new Request(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${firstCurrency[i]}&to_currency=${secondCurrency[i]}&apikey=${API_KEY_STOCK_CHART}`);
  request.get().then((data) => {
    console.log(data);
    exchangePrices.push(data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]);
  });
  this.publishExchangeRates(exchangePrices);
  };

  };






Forex.prototype.publishExchangeRates = function (data) {
  console.log(data);
//  PubSub.publish('Forex:publish-listOfPrices', data);
  };


// NewsfeedData.prototype.publishFocusedNews = function (data) {
//   PubSub.publish('Newsfeed:publish-news', data);
// };




module.exports = Forex;
