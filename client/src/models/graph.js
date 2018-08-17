const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');
const API_KEY_STOCK_CHART = require('../api_key_stock_charts.js');
const ChartData = function (url) {
  this.url = url;
  this.request = new Request(this.url);
};

Graph.prototype.bindEvents = function () {

  PubSub.subscribe('HomeView:selected-stock', (evt) => {
    this.url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${evt.detail}&apikey=${API_KEY_STOCK_CHART}`;
    const request = new Request(this.url);
  });

};
