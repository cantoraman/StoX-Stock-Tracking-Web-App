const PubSub = require('../../helpers/pub_sub.js');

const WatchAddView = function (container){
  this.container = container;
}

WatchAddView.prototype.bindEvents = function () {
  // PubSub.subscribe('Search:publish-search-data', (evt) => {
  //   // this.arrangeSearchFormToRender(evt.detail);
  // })
};

WatchAddView.prototype.initializeWatchAddView = function () {
  this.arrangeSearchFormToRender();
};

WatchAddView.prototype.arrangeSearchFormToRender = function () {

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

  const submitButton = document.createElement('button');
  submitButton.id = "submit-button";
  submitButton.textContent = "Submit";
  submitButton.style.backgroundColor = "navy";
  searchForm.appendChild(submitButton);

  submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const newHolding = {};
    newHolding.stock = symbolInput.value;
    PubSub.publish('Watchlist:request-search-data', newHolding);

    symbolInput.textContent="";

  });

};

module.exports = WatchAddView;
