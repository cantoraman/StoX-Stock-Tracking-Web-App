const PubSub = require('../../helpers/pub_sub.js');
const AppData = require('../../models/app_data.js');

const HoldingsTableView = function (container) {
  this.container = container;
}

HoldingsTableView.prototype.bindEvents = function () {

  // PubSub.subscribe('AppData:data-loaded', (evt) => {
  //   console.log(evt.detail[0]);
  //   this.renderHoldings(evt.detail[0].holdings, this.container);
  // });

};

HoldingsTableView.prototype.initializeTable = function (userData) {

this.renderHoldings(userData[0].holdings, this.container);
};

HoldingsTableView.prototype.renderHoldings = function (userData, pageBody) {

  const holdingsTable = document.createElement('table');
  holdingsTable.classList.add('holdings-table');
  this.container.appendChild(holdingsTable);
  const tableHeader = holdingsTable.insertRow(0);

  const nameHeader = tableHeader.insertCell(0);
  const valueHeader = tableHeader.insertCell(1);
  const sharesHeldHeader = tableHeader.insertCell(2);
  const profitLossHeader = tableHeader.insertCell(3);
  // stock, invested value, shares held, profit/loss
  const stockNames = [];
  const stockValues = [];
  const sharesHeld = [];
  const profitLoss = [];

  i = 0;


  userData.forEach(function(stock) {
    stockValues.push(stock.investedValue);
    stockNames.push(stock.stock);
    sharesHeld.push(stock.noOfSharesHeld);
    profitLoss.push(stock.profitLoss);
    const row = holdingsTable.insertRow(1);
    tableHeader.classList.add('holdings-header');

    const stockNamesCell = row.insertCell(0);
    const stockValuesCell = row.insertCell(1);
    const sharesHeldCell = row.insertCell(2);
    const profitLossCell = row.insertCell(3);
    stockNamesCell.innerHTML = stock.stock;
    stockValuesCell.innerHTML = stock.investedValue;
    sharesHeldCell.innerHTML = stock.noOfSharesHeld;
    profitLossCell.innerHTML = stock.profitLoss;

    i++
  });


  nameHeader.innerHTML = "Stock";
  valueHeader.innerHTML = "Invested Value";
  sharesHeldHeader.innerHTML = "Volume";
  profitLossHeader.innerHTML = "Profit/Loss";




};

module.exports = HoldingsTableView;
