const PubSub = require('../../helpers/pub_sub.js');
const AppData = require('../../models/app_data.js');

const WatchlistTableView = function (container) {
  this.container = container;
}

WatchlistTableView.prototype.bindEvents = function () {

  PubSub.subscribe('AppData:data-loaded', (evt) => {
    this.renderWatchlist(evt.detail[0], this.container);
  });

};

WatchlistTableView.prototype.initializeTable = function (userData) {
  this.renderWatchlist(userData[0].watchList, this.container);
};

WatchlistTableView.prototype.renderWatchlist = function (userData, pageBody) {

  console.log(userData);
  const watchlistTable = document.createElement('table');
  watchlistTable.classList.add('watchlist-table');
  this.container.appendChild(watchlistTable);
  const tableHeader = watchlistTable.insertRow(0);
  const nameHeader = tableHeader.insertCell(0);

  const stockNames = [];


userData.forEach(function(stock) {
  stockNames.push(stock);
  const row = watchlistTable.insertRow(1);
  row.addEventListener('click', (event) => {
    PubSub.publish('Graph:request-graphdata', stock);
  });
  tableHeader.classList.add('watchlist-header');
  const stockNamesCell = row.insertCell(0);
  stockNamesCell.innerHTML = stock;
  stockNamesCell.classList.add("indicator");
});

  //
  //
  // nameHeader.innerHTML = "Stock";
  // valueHeader.innerHTML = "Invested Value";
  // sharesHeldHeader.innerHTML = "Volume";
  // profitLossHeader.innerHTML = "Profit/Loss";
  //
  //
  //

};

module.exports = WatchlistTableView;
