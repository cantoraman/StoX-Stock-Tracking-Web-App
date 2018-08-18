const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');
const API_KEY_STOCK_CHART = require('../api_key_stock_charts.js');


const Forex = function (url) {
  this.url = `https://api.iextrading.com/1.0/stock/market/batch?symbols=MSFT&types=chart&range=1m&last=5`;
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

  let request = new Request(`https://forex.1forge.com/1.0.3/quotes?pairs=EURUSD,GBPUSD,USDJPY,AUDUSD,USDCHF,EURGBP,USDCAD,TRYUSD&api_key=${API_KEY_STOCK_CHART}`);
  request.get().then((data) => {
  this.publishExchangeRates(data)
  });

  };


Forex.prototype.publishExchangeRates = function (data) {
 PubSub.publish('Forex:publish-listOfPrices', data);
  };


// NewsfeedData.prototype.publishFocusedNews = function (data) {
//   PubSub.publish('Newsfeed:publish-news', data);
// };




module.exports = Forex;
