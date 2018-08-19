const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');
const API_KEY_STOCK_CHART = require('../api_key_stock_charts.js');

const Graph = function (url) {
  this.url = `https://api.iextrading.com/1.0/stock/market/batch?symbols=MSFT&types=chart&range=1m&last=5`;

};

Graph.prototype.bindEvents = function () {

  PubSub.subscribe('Graph:request-graphdata', (evt) => {
    this.url = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${evt.detail}&types=chart&range=1m&last=5`;
    this.initializeGraph();
  });

};




Graph.prototype.initializeGraph = function () {
  this.bindEvents();
  const request = new Request(this.url);
  request.get().then((data) => {
    this.publishGraphData(data);
  });
};

Graph.prototype.publishGraphData = function (data) {
  PubSub.publish('Graph:publish-graphdata', data);
};


module.exports = Graph;
