const PubSub = require('../../helpers/pub_sub.js');

const ForexView = function (container) {
  this.container = container;
}

ForexView.prototype.bindEvents = function () {
  PubSub.subscribe('Forex:publish-listOfPrices', (evt) => {
    this.createTable(evt.detail);
  });
};

// ForexView.prototype.render = function (data) {
//   this.container.innerHTML = '';
//   data.forEach((item) => {
//     this.container.appendChild(this.createItem(item));
//   })

// };

ForexView.prototype.createTable = function (data) {

  // const itemNode = document.createElement('ul');
  // const pairNode = document.createElement('p');
  // itemNode.classList.add('forex-item');
  // itemNode.textContent = item.price;
  // pairNode.textContent = item.symbol;
  // itemNode.appendChild(pairNode);
  // return itemNode;

  const forexTable = document.createElement('table');
  forexTable.classList.add('forex-table');
  this.container.appendChild(forexTable);
  const tableHeader = forexTable.insertRow(0);
  const nameHeader = tableHeader.insertCell(0);
  const priceHeader = tableHeader.insertCell(1);

  const tradingPrice = [];
  const forexName = [];

  i = 0;
  data.forEach(function(day) {
    forexName.push(data[i].symbol);
    tradingPrice.push(data[i].price);
    const row = forexTable.insertRow(1);
    tableHeader.classList.add('forex-header');

    const nameCell = row.insertCell(0);
    const priceCell = row.insertCell(1);
    nameCell.innerHTML = data[i].symbol;
    priceCell.innerHTML = data[i].price.toFixed(2);
    i++
  });


  nameHeader.innerHTML = "Forex";
  priceHeader.innerHTML = "Price";
};

module.exports = ForexView;
