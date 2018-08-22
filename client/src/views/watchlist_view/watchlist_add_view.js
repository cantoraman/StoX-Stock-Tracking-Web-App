const PubSub = require('../../helpers/pub_sub.js');

const WatchAddView = function (container){
  this.container = container;
}

WatchAddView.prototype.bindEvents = function () {
  // PubSub.subscribe('WatchlistTableView:data-loaded', (evt) => {
  //   this.arrangeFindSymbolFormToRender(evt);
  // });
};

WatchAddView.prototype.initializeWatchAddView = function () {
  this.arrangeFindSymbolFormToRender();
};

WatchAddView.prototype.arrangeFindSymbolFormToRender = function () {
  const container = document.createElement('div');
  container.classList.add('search');

  const body = document.querySelector("#pageBody");
  body.appendChild(container);


  const searchHeader = document.createElement('div')
  searchHeader.textContent = "Please enter a Stock Symbol to add"
  body.appendChild(searchHeader)

  const searchForm = document.createElement('form');
  searchForm.classList.add('search-form')
  searchHeader.appendChild(searchForm);

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
    const newHolding = symbolInput.value;
    PubSub.publish('Watchlist:request-search-data', newHolding);
    symbolInput.textContent="";
  });

};

module.exports = WatchAddView;
