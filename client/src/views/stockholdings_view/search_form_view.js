const PubSub = require('../../helpers/pub_sub.js');

const SearchView = function (container){
  this.container = container;
}

SearchView.prototype.bindEvents = function () {
  // PubSub.subscribe('Search:publish-search-data', (evt) => {
  //   // this.arrangeSearchFormToRender(evt.detail);
  // })
};

SearchView.prototype.initializeSearchView = function () {
  this.arrangeSearchFormToRender();
};

SearchView.prototype.arrangeSearchFormToRender = function () {

  const container = document.createElement('div');
  container.classList.add('search');

  const body = document.querySelector("#pageBody");
  body.appendChild(container);

  const searchForm = document.createElement('form');
  searchForm.classList.add('search-form')
  container.appendChild(searchForm);

  const symbolInput = document.createElement('input');
  symbolInput.setAttribute("type", "text");
  symbolInput.style.backgroundColor = "white";
  symbolInput.style.color = "black";
  symbolInput.placeholder = "Enter Symbol";
  searchForm.appendChild(symbolInput);

  const priceInput = document.createElement('input');
  priceInput.setAttribute("type", "text");
  priceInput.style.backgroundColor = "white";
  priceInput.style.color = "black";
  priceInput.placeholder = "Enter Price Paid"
  searchForm.appendChild(priceInput);

  const sharesInput = document.createElement('input');
  sharesInput.setAttribute("type", "text");
  sharesInput.style.backgroundColor = "white";
  sharesInput.style.color = "black";
  sharesInput.placeholder = "No of shares bought"
  searchForm.appendChild(sharesInput);

  const submitButton = document.createElement('button');
  submitButton.id = "submit-button";
  submitButton.textContent = "Submit";
  submitButton.style.backgroundColor = "navy";
  searchForm.appendChild(submitButton);

  submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const newHolding = {};
    newHolding.stock = symbolInput.value.toUpperCase();
    newHolding.investedValue = priceInput.value;
    newHolding.noOfSharesHeld = sharesInput.value;
    newHolding.profitLoss = 100;
    PubSub.publish('Search:request-search-data', newHolding);
    symbolInput.value="";
    priceInput.value="";
    sharesInput.value="";

  });

};

module.exports = SearchView;
