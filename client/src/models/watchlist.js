const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Watchlist = function (url) {
  this.url =url;
};

Watchlist.prototype.bindEvents = function () {

  PubSub.subscribe('Watchlist:request-stock-history', (evt) => {
        this.callStockHistory(evt.detail);
  });

};

Watchlist.prototype.initialize = function () {
  this.bindEvents();

};

module.exports = Watchlist;
