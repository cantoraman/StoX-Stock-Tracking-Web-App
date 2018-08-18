const PubSub = require('../../helpers/pub_sub.js');

const ForexView = function (container) {
  this.container = container;
}

ForexView.prototype.bindEvents = function () {
  PubSub.subscribe('Forex:publish-listOfPrices', (evt) => {
    this.render(evt.detail);
  });
};

ForexView.prototype.render = function (data) {
  this.container.innerHTML = '';
console.log(data);
  data.forEach((item) => {
    this.container.appendChild(this.createItem(item));
  })

};

ForexView.prototype.createItem = function (item) {
  const itemNode = document.createElement('ul');
  const pairNode = document.createElement('p');
  itemNode.classList.add('forex-item');
  itemNode.textContent = item.price;
  pairNode.textContent = item.symbol;
  itemNode.appendChild(pairNode);
  return itemNode;
};

module.exports = ForexView;
