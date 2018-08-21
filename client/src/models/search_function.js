const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const SearchModel = function (url) {
  this.url = `https://api.iextrading.com/1.0/stock/market/batch?symbols=MSFT&types=chart&range=1m&last=5`;
};

SearchModel.prototype.bindEvents = function () {
  PubSub.subscribe('Search:request-search-data', (evt) => {
    this.url = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${evt.detail}&types=chart&range=1m&last=5`;
    this.initializeGraph();
  });
};

SearchModel.prototype.initializeSearch = function () {
  this.bindEvents();
  const request = new Request(this.url);
  request.get().then((data) => {
    this.publishSearchData(data);
  });
};

SearchModel.prototype.publishSearchData = function (data) {
  PubSub.publish('Search:publish-search-data', data);
};

module.exports = SearchModel;
