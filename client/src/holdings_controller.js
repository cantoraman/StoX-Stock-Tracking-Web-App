const HoldingsTableView = require('./views/stockholdings_view/holdings_table_view.js');
const PubSub = require('./helpers/pub_sub.js');
const HoldingsController = function (){
};

HoldingsController.prototype.initializePage = function () {

  PubSub.subscribe('AppData:data-loaded', (evt)=>{
    console.log(evt.detail);
    const userData = evt.detail;
    const pageBody = document.querySelector('#pageBody');

    const holdingsTable = document.createElement('div');
    holdingsTable.id = 'holdings-table';
    pageBody.appendChild(holdingsTable);

    const holdingsTableView = new HoldingsTableView(holdingsTable);

    holdingsTableView.initializeTable(userData);
    holdingsTableView.bindEvents();
  });
};

//get a list of all holdings
//display stock, invested value, shares held, profit/loss
  //list all.





  // const formView = new FormView(form);
  // formView.bindEvents();
  // const bucketList = document.querySelector('div#bucket-list');
  // const listView = new ListView(bucketList);
  // listView.bindEvents();
  //
  // const wishes = new Wishes();
  // wishes.bindEvents();

module.exports = HoldingsController;
