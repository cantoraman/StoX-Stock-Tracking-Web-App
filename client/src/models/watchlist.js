const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');
const AppData = require('./app_data.js');

const Watchlist = function (userData) {
  this.url = 'http://localhost:3000/api/user';
  this.request = new Request(this.url);
  this.userData = userData;
};

Watchlist.prototype.bindEvents = function () {
PubSub.subscribe('Watchlist:request-search-data', (evt) => {
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
    let appData = new AppData('http://localhost:3000/api/user');
    appData.launchData();
  })
  .catch(console.error);
};



module.exports = Watchlist;
