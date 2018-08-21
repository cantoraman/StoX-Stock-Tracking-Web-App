const HoldingsTableView = require('./views/stockholdings_view/holdings_table_view.js');
const StockHoldings = require('./models/stock_holdings.js');
const PubSub = require('./helpers/pub_sub.js');
const Search = require('./models/search_function.js');
const SearchFormView = require('./views/stockholdings_view/search_form_view.js')
const PieChartView = require('./views/stockholdings_view/holdings_chart_view.js');




const HoldingsController = function (){
};

HoldingsController.prototype.initializePage = function () {

  PubSub.subscribe('AppData:data-loaded', (evt)=>{


    const userData = evt.detail;
    const pageBody = document.querySelector('#pageBody');
    const pieContainer = document.createElement('div');
    pieContainer.id = 'pie-chart';
    const holdingsTable = document.createElement('div');
    holdingsTable.id = 'holdings-table';
    const searchForm = document.createElement('div');
    searchForm.id = 'search-form';
    const newPieChartContainer = document.createElement('div');
    newPieChartContainer.id = 'new-pie-chart';
    pageBody.innerHTML = '';
    pageBody.appendChild(searchForm);
    pageBody.appendChild(holdingsTable);
    holdingsTable.appendChild(newPieChartContainer);
    holdingsTable.appendChild(pieContainer);

    const pieChartView = new PieChartView(newPieChartContainer)
    pieChartView.initializePieChart(userData);


    const holdingsTableView = new HoldingsTableView(holdingsTable, pieContainer);
    holdingsTableView.initializeTable(userData);
    holdingsTableView.bindEvents();

    const stockHoldings = new StockHoldings(userData);
    stockHoldings.bindEvents();

    const searchFormView = new SearchFormView(searchForm);
    searchFormView.initializeSearchView();
    searchFormView.bindEvents();


    const stockHoldings = new StockHoldings(userData);
    stockHoldings.bindEvents();

    const search = new Search();
    search.bindEvents();

  });
};


module.exports = HoldingsController;
