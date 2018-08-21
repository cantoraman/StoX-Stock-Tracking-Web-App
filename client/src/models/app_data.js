const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const AppData = function (url) {
  this.url = url;
  this.data = null;
};

AppData.prototype.bindEvents = function () {

  // PubSub.subscribe('UserData:data-loaded', (event) => {
  //   } );
};

AppData.prototype.getData = function () {
  this.request = new Request(this.url);
  this.request.get()
    .then((userData) => {
      PubSub.publish('AppData:data-loaded', userData);
      this.initializeStocks(userData[0]);
      this.data = userData;
    })
    .catch(console.error);
};

AppData.prototype.initializeStocks = function (userData) {
  const stockNames = [];

  userData.holdings.forEach(function(stock) {
    stockNames.push(stock.stock);
  });
  const names = stockNames.toString();

  this.callPrices(names);

};

AppData.prototype.callPrices = function (names) {
  const arrayOfPrices = [];
  const arrayOfNames = [];
  const newURL = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${names}&types=quote,news,chart&range=1m&last=5`
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


module.exports = AppData;
