const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');
const API_KEY_STOCK_CHART = require('../api_key_stock_charts.js');

const StockHoldings = function (url) {
  this.url = 'http://localhost:3000/api/user';
  this.request = new Request(this.url);
};

StockHoldings.prototype.bindEvents = function () {
  PubSub.subscribe('StockHoldings:holding-submitted', (evt) => {
    this.postHoldingChange(evt.detail);
  });
};

StockHoldings.prototype.postHoldingChange = function (holding) {
  this.request.put(holding)
  .then((holdings) => {
    console.log("Holdings after Put:", holdings);
    PubSub.publish('HoldingsTableView:data-loaded', holdings);
  })
  .catch(console.error);

};

module.exports = StockHoldings;
