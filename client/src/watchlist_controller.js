const WatchlistView = require('./views/watchlist_view/watchlist_view.js');
const WatchlistTableView = require('./views/watchlist_view/watchlist_table_view.js');
const GraphView = require('./views/graph_view/graph_view.js');
const Graph = require('./models/graph.js');
const PubSub = require('./helpers/pub_sub.js');
const WatchlistAddView = require('./views/watchlist_view/watchlist_add_view.js');
const Watchlist = require('./models/watchlist.js');

const WatchlistController = function (){
  this.userData = null;
};

WatchlistController.prototype.bindEvents = function () {
  PubSub.subscribe('AppData:data-loaded', (evt)=>{
    this.publishUserData(evt.detail);
  });
};

WatchlistController.prototype.publishUserData = function (userData) {
  PubSub.publish('WatchlistController:data-loaded', userData);
};

WatchlistController.prototype.initializePage = function (userLoader) {
    this.userData = userLoader;
    const userData = userLoader;
    const pageBody = document.querySelector('#pageBody');
    pageBody.innerHTML = '';

    const graphNode = document.createElement('div');
    pageBody.appendChild(graphNode);
    graphNode.id = 'graph';

    const addForm = document.createElement('div');
    addForm.id = 'add-form';
    pageBody.appendChild(addForm);

    const watchlistNode = document.createElement('div');
    watchlistNode.id = 'watchlist';
    pageBody.appendChild(watchlistNode);

    const watchlistTableView = new WatchlistTableView(watchlistNode);
    watchlistTableView.bindEvents();
    const graphView = new GraphView(graphNode);
    graphView.bindEvents();
    const watchlist = new Watchlist(userData);
    watchlist.bindEvents();
    const watchlistAddView = new WatchlistAddView(addForm);
    watchlistAddView.bindEvents();


    const symbolToDisplay = this.symbolPicker(userData);
    const graph = new Graph(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbolToDisplay}&types=chart&range=1m&last=5`);
    graph.initializeGraph();

    this.publishUserData(userData);

    //watchlistAddView.initializeWatchAddView();

    // const addToWatchButton = document.createElement('div');
    // addToWatchButton.textContent="Add New Stock";
    // addToWatchButton.classList.add("indicator");
    // watchlistNode.appendChild(addToWatchButton);

  };


WatchlistController.prototype.symbolPicker = function (userData) {
  return userData[0].watchList[0];
};


module.exports = WatchlistController;
