const WatchlistView = require('./views/watchlist_view/watchlist_view.js');
const WatchlistTableView = require('./views/watchlist_view/watchlist_table_view.js');
const GraphView = require('./views/graph_view/graph_view.js');
const Graph = require('./models/graph.js');
const PubSub = require('./helpers/pub_sub.js');
const WatchlistAddView = require('./views/watchlist_view/watchlist_add_view.js');
const Watchlist = require('./models/watchlist.js');

const WatchlistController = function (){

};

WatchlistController.prototype.initializePage = function () {

  PubSub.subscribe('AppData:data-loaded', (evt)=>{

    const userData = evt.detail;
    const pageBody = document.querySelector('#pageBody');
    pageBody.innerHTML = '';

    const graphNode = document.createElement('div');
    pageBody.appendChild(graphNode);
    graphNode.id = 'graph';
    const graphView = new GraphView(graphNode);
    graphView.bindEvents();

    const watchlistNode = document.createElement('div');
    watchlistNode.id = 'watchlist';
    pageBody.appendChild(watchlistNode);

    const watchlistTableView = new WatchlistTableView(watchlistNode);
    watchlistTableView.initializeTable(userData);
    watchlistTableView.bindEvents();

    const watchlist = new Watchlist(userData);
    watchlist.bindEvents();

    const graph = new Graph();
    graph.initializeGraph();

    const addForm = document.createElement('div');
    addForm.id = 'add-form';
    pageBody.appendChild(addForm);
    const watchlistAddView = new WatchlistAddView(addForm);

    watchlistAddView.initializeWatchAddView();

    const addToWatchButton = document.createElement('div');
    addToWatchButton.textContent="Add New Stock";
    addToWatchButton.classList.add("indicator");
    watchlistNode.appendChild(addToWatchButton);

  });















};



module.exports = WatchlistController;
