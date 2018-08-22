const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const AppData = function (url) {
  this.url = url;
  this.data = null;
};

AppData.prototype.bindEvents = function () {
};

AppData.prototype.launchData = function () {
  this.request = new Request(this.url);
  this.request.get()
    .then((userData) => {
      this.data = userData;
      PubSub.publish('AppData:data-loaded', this.data);
      // this.initializeStocks(userData[0]);

    })
    .catch(console.error);
};

AppData.prototype.initializeStocks = function (userData) {
  const watchListArray = []
  const stockNames = [];
  userData[0].holdings.forEach(function(stock) {
    stockNames.push(stock.stock);
  });
  userData.watchList.forEach(function(stock) {
    watchListArray.push(stock);
  });
  const watchListNames = watchListArray.toString();
  const names = stockNames.toString();
  this.callPrices(names);
  this.callPricesWatchlist(watchListNames);
};


AppData.prototype.callPricesWatchlist = function (watchListNames) {
  const arrayOfPrices = [];
  const arrayOfNames = [];
  const newURL = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${watchListNames}&types=quote,news,chart&range=1m&last=5`
  const request = new Request(newURL);
  request.get().then((data) => {
    Object.keys(data).forEach(function(stock) {
    arrayOfPrices.push(data[stock].quote.latestPrice);
    arrayOfNames.push(stock);
    });
    var arrays = [arrayOfPrices, arrayOfNames];
    PubSub.publish('AppData:watchlist-prices-array-loaded', arrays)
  });
};

AppData.prototype.callPrices = function (names) {
  const arrayOfPrices = [];
  const arrayOfNames = [];
  const newURL = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${names}&types=quote&range=1m&last=5`
  const request = new Request(newURL);
  request.get().then((data) => {
    Object.keys(data).forEach(function(stock) {
    arrayOfPrices.push(data[stock].quote.latestPrice);
    arrayOfNames.push(stock);
    });
    var arrays = [arrayOfPrices, arrayOfNames];

    PubSub.publish('HoldingsTableView:prices-array-loaded', arrays)
  });
};


AppData.prototype.postData = function (appData) {
  this.request.post(appData)
  .then((wishes) => {
    PubSub.publish('AppData:data-loaded',wishes);
  })
  .catch(console.error);
};

AppData.prototype.deleteData = function (appDataId) {
  this.request.delete(appDataId)
    .then((wishes) => {
      PubSub.publish('AppData:data-loaded', wishes);
    })
    .catch(console.error);
};


AppData.prototype.putData = function (appData) {
  this.request.put(appData)
  .then((wishes) => {
    console.log("AppData after Put:", wishes);
    PubSub.publish('AppData:data-loaded', wishes);
  })
  .catch(console.error);
};



// AppData.prototype.postData = function (appData) {
//   this.request.post(appData)
//   .then((wishes) => {
//     PubSub.publish('AppData:data-loaded',wishes);
//   })
//   .catch(console.error);
// };
//
// AppData.prototype.deleteData = function (appDataId) {
//   this.request.delete(appDataId)
//     .then((wishes) => {
//       PubSub.publish('AppData:data-loaded', wishes);
//     })
//     .catch(console.error);
// };
//
//
// AppData.prototype.putData = function (appData) {
//   this.request.put(appData)
//   .then((wishes) => {
//     console.log("AppData after Put:", wishes);
//     PubSub.publish('AppData:data-loaded', wishes);
//   })
//   .catch(console.error);
// };

AppData.prototype.getUserData = function () {
  return this.data;
};
module.exports = AppData;
