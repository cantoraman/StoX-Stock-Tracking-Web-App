const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');
const API_KEY_STOCK_CHART = require('../api_key_stock_charts.js');

const Graph = function (url) {
  this.url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=${API_KEY_STOCK_CHART}`;
  this.request = new Request(this.url);
};

Graph.prototype.bindEvents = function () {

  PubSub.subscribe('HomeView:selected-stock', (evt) => {
    this.url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${evt.detail}&apikey=${API_KEY_STOCK_CHART}`;
    const request = new Request(this.url);
  });

};




Graph.prototype.initializeGraph = function () {
  const request = new Request(this.url);
  request.get().then((data) => {
    this.publishInitialGraph(data);
  });
};

Graph.prototype.publishInitialGraph = function (data) {
  PubSub.publish('Graph:publish-graphdata', data);
};


module.exports = Graph;
