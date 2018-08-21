const HoldingsTableView = require('./views/stockholdings_view/holdings_table_view.js');
const StockHoldings = require('./models/stock_holdings.js');
const PubSub = require('./helpers/pub_sub.js');


const HoldingsController = function (){
};

HoldingsController.prototype.initializePage = function () {

  PubSub.subscribe('AppData:data-loaded', (evt)=>{
    console.log(evt.detail);
    const userData = evt.detail;
    const pageBody = document.querySelector('#pageBody');
    const pieContainer = document.createElement('div');
    pieContainer.id = 'pie-chart';
    const holdingsTable = document.createElement('div');
    holdingsTable.id = 'holdings-table';
    pageBody.innerHTML = '';
    pageBody.appendChild(holdingsTable);
    holdingsTable.appendChild(pieContainer);

    const holdingsTableView = new HoldingsTableView(holdingsTable, pieContainer);
    holdingsTableView.initializeTable(userData);
    holdingsTableView.bindEvents();



  });
};


module.exports = HoldingsController;
