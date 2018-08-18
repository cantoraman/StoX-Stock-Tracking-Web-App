const PubSub = require('../../helpers/pub_sub.js');

const CryptoView = function (container) {
  this.container = container;
}

CryptoView.prototype.bindEvents = function () {

  PubSub.subscribe('Crypto:publish-data', (evt) => {
    this.renderList(evt.detail);
    // this.renderCryptoGraph(evt.detail);
  });

};

CryptoView.prototype.renderList = function (cryptoData) {
  const cryptoList = document.createElement('ul');
  this.container.appendChild(cryptoList);
  const todaysOpen = []
  const cryptoPriceData = cryptoData["Time Series (Digital Currency Daily)"]
  Object.keys(cryptoPriceData).forEach(function(day) {
    todaysOpen.push(parseFloat(cryptoPriceData[day]["4a. close (USD)"]));
  });
  const caughtOpenPrice = todaysOpen[0];
  console.log(caughtOpenPrice);
};



CryptoView.prototype.renderCryptoGraph = function (graphdata) {
  this.container.innerHTML = '';
  const container = document.createElement('div');
  const listOfDates = [];
  const listOfPrices = [];
const priceData = graphdata["Time Series (Digital Currency Daily)"];
Object.keys(priceData).forEach(function(day) {
  // closingPriceData[day];
  // console.log(priceData[day]["4. close"]);
  //console.log(day);
  listOfDates.push(day);
  listOfPrices.push(parseFloat(priceData[day]["4a. close (USD)"]));
  // listOfPrices.reverse();
});
};


CryptoView.prototype.createArticleItem = function (article) {
  const articleItemNode = document.createElement('ul');
  articleItemNode.classList.add('article-item');

  const title = document.createElement('a');
  title.textContent=article.title;
  title.href = article.url;
  articleItemNode.appendChild(title);

  return articleItemNode;
};

module.exports = CryptoView;
