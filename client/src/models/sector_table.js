const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');
const API_KEY_STOCK_CHART = require('../api_key_stock_charts.js');

const SectorTable = function (url) {
  this.url = `https://api.iextrading.com/1.0/stock/market/sector-performance`;
  this.request = new Request(this.url);
};

SectorTable.prototype.bindEvents = function () {

  };


SectorTable.prototype.initialize = function () {
  const request = new Request(this.url);
  request.get().then((data) => {
    this.publishSectorData(data);
  });
};


SectorTable.prototype.publishSectorData = function (data) {
  PubSub.publish('SectorTable:publish-sector-data', data);
};
















module.exports = SectorTable;
