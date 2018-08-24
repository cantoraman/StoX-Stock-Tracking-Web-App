const PubSub = require('../../helpers/pub_sub.js');
const AppData = require('../../models/app_data.js');
const Request = require('../../helpers/request.js');

const WatchlistTableView = function (container) {
  this.container = container;
  this.userData = null;
}

WatchlistTableView.prototype.bindEvents = function () {
  PubSub.subscribe('WatchlistController:data-loaded', (evt) => {
    this.initializeTable(evt.detail);
  });

};

WatchlistTableView.prototype.initializeTable = function (rawUserData) {
  PubSub.subscribe("Watchlist:prices-array-loaded", (prices) => {
    const watchListPrices = prices.detail[0];
    const watchListNames = prices.detail[1];
    this.renderWatchlist(watchListPrices, watchListNames, rawUserData)
  });
  const appData = new AppData('http://localhost:3000/api/user');
  appData.initializeStocks(rawUserData);
};

WatchlistTableView.prototype.renderWatchlist = function (prices, names, rawUserData) {
  this.container.innerHTML="";
  this.userData=rawUserData;
  const watchlistTable = document.createElement('table');
  watchlistTable.classList.add('watchlist-table');
  this.container.appendChild(watchlistTable);
  const tableHeader = watchlistTable.insertRow(0);
  const nameHeader = tableHeader.insertCell(0);
  nameHeader.textContent = "Watching";
  const priceHeader = tableHeader.insertCell(1);
  priceHeader.textContent = "Latest Price";

  const stockNames = [];
  const stockPrices = [];
console.log("renderedlist:", this.userData);
  names.forEach(function(stock, index) {
    stockNames.push(stock);
    const row = watchlistTable.insertRow(1);
    tableHeader.classList.add('watchlist-header');
    const stockNamesCell = row.insertCell(0);
    stockNamesCell.textContent = stock;
    stockNamesCell.classList.add("indicator");
    stockNamesCell.addEventListener('click', (event) => {
      PubSub.publish('Graph:request-graphdata', stock);
    });

    const price = prices[index]
    stockPrices.push(price);
    const priceCell = row.insertCell(1);
    priceCell.textContent = price;

    const deleteCell = row.insertCell(2);
    deleteCell.textContent = "Delete";
    deleteCell.id = "delete-button";
    deleteCell.classList.add("indicator");

    deleteCell.addEventListener('click', (event) => {
      console.log("delete clicked,", this.userData, "and", stock);
      this.deleteStock(this.userData, stock)
    });

  }, this);



};

WatchlistTableView.prototype.deleteStock = function (userData, stockInput) {
  var x=0;
  userData[0].watchList.forEach(function(stock, index){
    if(stock===stockInput && x===0){
      x++;
      // userData[0].watchList.splice(index,1);
      PubSub.publish('Watchlist:watch-item-deleted', index);
    //  this.updateDatabase(userData);
    };
  }, this);
};

// WatchlistTableView.prototype.updateDatabase = function (userData) {
//     const request = new Request('http://localhost:3000/api/user');
//     console.log("WatchlistUpdatexxx:", userData);
//     request.put(userData)
//     .then((userData) => {
//       let appData = new AppData('http://localhost:3000/api/user');
//       appData.launchData();
//       //PubSub.publish('AppData:data-loaded', userData);
//       //PubSub.publish('HoldingsTableView:data-loaded', userData);
//     })
//     .catch(console.error);
// };


module.exports = WatchlistTableView;
