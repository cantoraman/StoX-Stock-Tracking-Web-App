const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const SearchModel = function (url) {
  this.url = `https://api.iextrading.com/1.0/stock/market/batch?symbols=MSFT&types=chart&range=1m&last=5`;
  this.userData=null;
};

SearchModel.prototype.bindEvents = function () {

  PubSub.subscribe('Search:request-search-data', (evt) => {
    this.url = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${evt.detail.stock}&types=chart&range=1m&last=5`;
    this.userData=evt.detail;
    this.initializeSearch();
  });
};

SearchModel.prototype.initializeSearch = function () {

  const request = new Request(this.url);
  request.get().then((data) => {
    this.verifySearch(data);
  });
};

SearchModel.prototype.verifySearch = function (data) {
  if(Object.keys(data).length > 0){
    console.log(data);
    PubSub.publish('StockHoldings:new-holding-submitted', this.userData);
  };
};

module.exports = SearchModel;
