const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');
const API_KEY_STOCK_CHART = require('../api_key_stock_charts.js');

const SectorTable = function (url) {
  this.url = `https://api.iextrading.com/1.0/stock/market/sector-performance`;
};

SectorTable.prototype.bindEvents = function () {
  PubSub.subscribe('SectorTable:request-graphdata', (evt) => {
    this.url = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${evt.detail}&types=chart&range=1m&last=5`;
    this.initializeSectorTable();
  });
};

SectorTable.prototype.initializeSectorTable = function () {
  this.bindEvents();
  const request = new Request(this.url);
  request.get().then((data) => {
    this.publishSectorTableData(data);
  });
};

SectorTable.prototype.publishSectorTableData = function (data) {
  PubSub.publish('SectorTable:publish-graphdata', data);
};

module.exports = SectorTable;
