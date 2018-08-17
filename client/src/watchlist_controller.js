const WatchlistView = require('./views/watchlist_view/watchlist_view.js');

const WatchlistController = function (){

};

WatchlistController.prototype.initializePage = function () {

   const example = document.createElement('div');
   example.textContent= "Watchlist Display";

   const pageBody = document.querySelector('#pageBody');
   pageBody.appendChild(example);


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
