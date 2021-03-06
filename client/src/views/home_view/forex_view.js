const PubSub = require('../../helpers/pub_sub.js');

const ForexView = function (container) {
  this.container = container;
}

ForexView.prototype.bindEvents = function () {
  PubSub.subscribe('Forex:publish-listOfPrices', (evt) => {
    this.createTable(evt.detail);
  });
};

ForexView.prototype.createTable = function (data) {

  const forexTable = document.createElement('table');
  forexTable.classList.add('forex-table');
  this.container.appendChild(forexTable);
  const tableHeader = forexTable.insertRow(0);
  const nameHeader = tableHeader.insertCell(0);
  const priceHeader = tableHeader.insertCell(1);

  const tradingPrice = [];
  const forexName = [];


  data.reverse();
  data.forEach(function(day, i) {
    forexName.push(data[i].symbol);
    tradingPrice.push(data[i].price);
    const row = forexTable.insertRow(1);
    tableHeader.classList.add('forex-header');
    row.addEventListener('click', (event) => {
      PubSub.publish('Forex:request-historicaldata', day.symbol);
    });
    const nameCell = row.insertCell(0);
    nameCell.classList.add("indicator");
    nameCell.innerHTML = data[i].symbol;
    const priceCell = row.insertCell(1);
    priceCell.innerHTML = data[i].price.toFixed(2);
  });
  nameHeader.innerHTML = "Forex";
  priceHeader.innerHTML = "Price";
};

module.exports = ForexView;
