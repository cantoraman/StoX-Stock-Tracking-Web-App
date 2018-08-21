const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const SearchModel = function (url) {
  this.url = `https://api.iextrading.com/1.0/stock/market/batch?symbols=MSFT&types=chart&range=1m&last=5`;
};

SearchModel.prototype.bindEvents = function () {
  PubSub.subscribe('Search:request-search-data', (evt) => {
    console.log(evt.detail.stock);
    this.url = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${evt.detail.stock}&types=chart&range=1m&last=5`;
    this.initializeSearch();
  });
};

SearchModel.prototype.initializeSearch = function () {
  this.bindEvents();
  const request = new Request(this.url);
  console.log(request);
  request.get().then((data) => {
    console.log(data);
    this.verifySearch(data);
  });
};

SearchModel.prototype.verifySearch = function (data) {
  if(Object.keys(data).length > 0){
    console.log(data);
    PubSub.publish('Search:publish-search-data', data);
};
};

module.exports = SearchModel;
