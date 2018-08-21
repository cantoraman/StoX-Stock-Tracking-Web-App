const PubSub = require('../../helpers/pub_sub.js');

const SearchView = function (container){
  this.container = container;
}

SearchView.prototype.bindEvents = function () {
  PubSub.subscribe('Search:publish-search-data', (evt) => {
    this.arrangeSearchFormToRender(evt.detail);
    console.log(evt.detail);
  })
};

module.exports = SearchView;
