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

HoldingsController.prototype.initializePage = function (userLoader) {
    this.userData = userLoader;
    const userData = userLoader;
    const pageBody = document.querySelector('#pageBody');
    pageBody.innerHTML = "";

    const pieContainer = document.createElement('div');
    pieContainer.id = 'pie-chart';
    const holdingsTable = document.createElement('div');
    holdingsTable.id = 'holdings-table';
    const searchForm = document.createElement('div');
    searchForm.id = 'search-form';
    const newPieChartContainer = document.createElement('div');
    newPieChartContainer.id = 'new-pie-chart';

    pageBody.appendChild(searchForm);
    pageBody.appendChild(holdingsTable);
    holdingsTable.appendChild(newPieChartContainer);
    holdingsTable.appendChild(pieContainer);

    const pieChartView = new PieChartView(newPieChartContainer)
    pieChartView.initializePieChart(userData);

    const holdingsTableView = new HoldingsTableView(holdingsTable, pieContainer);
    holdingsTableView.bindEvents();

    let searchFormView = new SearchFormView(searchForm);
    searchFormView.bindEvents();

    const stockHoldings = new StockHoldings(userData);
    stockHoldings.bindEvents();

    const search = new Search();
    search.bindEvents();

    this.publishUserData(userData);

  //  holdingsTableView.initializeTable(userData);
//    searchFormView.initializeSearchView();
//  });
};

HoldingsController.prototype.publishUserData = function (userData) {
  PubSub.publish('HoldingsController:data-loaded', userData);
};

HoldingsController.prototype.bindEvents = function () {
   PubSub.subscribe('AppData:data-loaded', (evt)=>{
     this.publishUserData(evt.detail);

    // this.initializePage(this.userData);
  //  this.renderPage(evt.detail);
   });
};

HoldingsController.prototype.renderPage = function (userData) {

};

module.exports = HoldingsController;
