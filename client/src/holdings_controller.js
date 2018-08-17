const HoldingView = require('./views/stockholdings_view/stock_holdings_view.js');

const HoldingsController = function (){

};

HoldingsController.prototype.initializePage = function () {

   const example = document.createElement('div#example-holdings');
   example.textContent= "Holdings Display";




};

  // const formView = new FormView(form);
  // formView.bindEvents();
  // const bucketList = document.querySelector('div#bucket-list');
  // const listView = new ListView(bucketList);
  // listView.bindEvents();
  //
  // const wishes = new Wishes();
  // wishes.bindEvents();

module.exports = HoldingsController;
