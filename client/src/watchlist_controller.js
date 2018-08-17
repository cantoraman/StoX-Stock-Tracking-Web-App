const WatchlistView = require('./views/watchlist_view/watchlist_view.js');

const WatchlistController = function (){

};

WatchlistController.prototype.initializePage = function () {

   const example = document.createElement('div#example-watchlist');
   example.textContent= "Watchlist Display";




};

  // const formView = new FormView(form);
  // formView.bindEvents();
  // const bucketList = document.querySelector('div#bucket-list');
  // const listView = new ListView(bucketList);
  // listView.bindEvents();
  //
  // const wishes = new Wishes();
  // wishes.bindEvents();

module.exports = WatchlistController;
