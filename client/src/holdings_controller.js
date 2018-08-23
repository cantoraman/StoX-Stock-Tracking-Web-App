const HoldingsTableView = require('./views/stockholdings_view/holdings_table_view.js');
const StockHoldings = require('./models/stock_holdings.js');
const PubSub = require('./helpers/pub_sub.js');
const Search = require('./models/search_function.js');
const AppData = require('./models/app_data.js');
const SearchFormView = require('./views/stockholdings_view/search_form_view.js')
const PieChartView = require('./views/stockholdings_view/holdings_chart_view.js');

const HoldingsController = function (){
  this.userData = null;
};
HoldingsController.prototype.bindEvents = function () {
  console.log("h4-Bind events subscribes to AppData:Data-loaded");
  PubSub.subscribe('AppData:data-loaded', (evt)=>{
    console.log("hx-HoldingBindEvents:someone fired AppData:data-loaded, I am making a call to publishuserdata");
    this.publishUserData(evt.detail);
  });
};

HoldingsController.prototype.publishUserData = function (userData) {
  console.log("h3-HoldingsControl publishes user data !!on the function!! thruHoldController");
  PubSub.publish('HoldingsController:data-loaded', userData);
};


HoldingsController.prototype.initializePage = function (userLoader) {
    console.log("h1-Initilize Page is loaded");
    this.userData = userLoader;
    const userData = userLoader;
    const pageBody = document.querySelector('#pageBody');
    pageBody.innerHTML = "";

    const pieContainer = document.createElement('div');
    pieContainer.id = 'pie-chart';
    const totalsContainer = document.createElement('div');
    totalsContainer.id = 'totals-container';
    const holdingsTable = document.createElement('div');
    holdingsTable.id = 'holdings-table';
    const searchForm = document.createElement('div');
    searchForm.id = 'search-form';
    const newPieChartContainer = document.createElement('div');
    newPieChartContainer.id = 'new-pie-chart';
    //?
    pageBody.appendChild(newPieChartContainer);
    pageBody.appendChild(pieContainer);
    pageBody.appendChild(holdingsTable);
    pageBody.appendChild(totalsContainer);
    pageBody.appendChild(searchForm)
  //  holdingsTable.appendChild(searchForm);


    const pieChartView = new PieChartView(newPieChartContainer);
    pieChartView.bindEvents();

    const holdingsTableView = new HoldingsTableView(holdingsTable, pieContainer, totalsContainer);
    holdingsTableView.bindEvents();

    const searchFormView = new SearchFormView(searchForm);
    searchFormView.bindEvents();

    const stockHoldings = new StockHoldings(userData);
    stockHoldings.bindEvents();

    const search = new Search();
    search.bindEvents();

    console.log("h2-holdingController:initializePage makes a request to publish user data**");
    this.publishUserData(userData);

  //  holdingsTableView.initializeTable(userData);
//    searchFormView.initializeSearchView();
//  });
};

module.exports = HoldingsController;
