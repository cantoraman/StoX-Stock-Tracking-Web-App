const HoldingsTableView = require('./views/stockholdings_view/holdings_table_view.js');
const PubSub = require('./helpers/pub_sub.js');
const Search = require('./models/search_function.js');
const SearchFormView = require('./views/stockholdings_view/search_form_view.js')




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
    const searchForm = document.createElement('div');
    searchForm.id = 'search-form';
    pageBody.innerHTML = '';
    pageBody.appendChild(searchForm);
    pageBody.appendChild(holdingsTable);
    holdingsTable.appendChild(pieContainer);

    const holdingsTableView = new HoldingsTableView(holdingsTable, pieContainer);
    holdingsTableView.initializeTable(userData);
    holdingsTableView.bindEvents();

    const searchFormView = new SearchFormView(searchForm);
    searchFormView.bindEvents();

    const search = new Search();
    search.initializeSearch();

  });
};


module.exports = HoldingsController;
