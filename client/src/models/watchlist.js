const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');
const API_KEY_STOCK_CHART = require('../api_key_stock_charts.js');

const  = function (userData) {
  this.url = 'http://localhost:3000/api/user';
  this.request = new Request(this.url);
  this.userData = userData;
};

Watchlist.prototype.bindEvents = function () {
  PubSub.subscribe('Watchlist:request-search-data', (evt) => {
    this.addNewHolding(evt.detail);
  });
};

Watchlist.prototype.addNewHolding = function (newHolding) {
  this.userData[0].watchList.push(newHolding);
  console.log();
  this.postChangedUserData();
};

Watchlist.prototype.postChangedUserData = function () {
  this.request.put(this.userData)
  .then((watchlist) => {

    PubSub.publish('WatchlistTableView:data-loaded', watchlist);
  })
  .catch(console.error);
};



module.exports = Watchlist;
