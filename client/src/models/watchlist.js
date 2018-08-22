const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Watchlist = function (userData) {
  this.url = 'http://localhost:3000/api/user';
  this.request = new Request(this.url);
  this.userData = userData;
  console.log(userData);
};

Watchlist.prototype.bindEvents = function () {
PubSub.subscribe('Watchlist:request-search-data', (evt) => {
  console.log(evt.detail);
  this.addNewItem(evt.detail);
});
};

Watchlist.prototype.addNewItem = function (newItem) {
  this.userData[0].watchList.push(newItem);
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
