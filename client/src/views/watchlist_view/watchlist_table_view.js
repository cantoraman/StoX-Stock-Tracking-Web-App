const PubSub = require('../../helpers/pub_sub.js');
const AppData = require('../../models/app_data.js');

const WatchlistTableView = function (container) {
  this.container = container;
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

  names.forEach(function(stock, index) {
    stockNames.push(stock);
    const row = watchlistTable.insertRow(1);
    row.addEventListener('click', (event) => {
      PubSub.publish('Graph:request-graphdata', stock);
    });
    tableHeader.classList.add('watchlist-header');
    const stockNamesCell = row.insertCell(0);
    stockNamesCell.textContent = stock;
    stockNamesCell.classList.add("indicator");

    const price = prices[index]
    stockPrices.push(price);
    const priceCell = row.insertCell(1);
    priceCell.textContent = price;

  });



};

module.exports = WatchlistTableView;
