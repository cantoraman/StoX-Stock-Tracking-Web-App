const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');
const API_KEY_STOCK_CHART = require('../api_key_stock_charts.js');

const Graph = function (url) {
  this.url = `https://api.iextrading.com/1.0/stock/market/batch?symbols=MSFT&types=chart&range=1m&last=5`;

};

Graph.prototype.bindEvents = function () {

  PubSub.subscribe('HomeView:selected-stock', (evt) => {
    this.url = `https://api.iextrading.com/1.0/stock/market/batch?symbols=MSFT&types=chart&range=1m&last=5`;

    //TODO be able to click stock to get graph 

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
