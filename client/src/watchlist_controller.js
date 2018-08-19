const WatchlistView = require('./views/watchlist_view/watchlist_view.js');
const Watchlist = require('./models/watchlist.js');

const WatchlistController = function (){

};

WatchlistController.prototype.initializePage = function () {

  const pageBody = document.querySelector('#pageBody');

  const graphNode = document.createElement('div');
  pageBody.appendChild(graphNode);
  graphNode.id = 'graph';
  const graphView = new GraphView(graphNode);
  graphView.bindEvents();

  const watchlistNode = document.createElement('div');
  watchlistNode.id = 'watchlist';
  pageBody.appendChild(watchlistNode);

  const graph = new Graph();
  graph.initializeGraph();

  const watchlist = new Watchlist();
  watchlist.initialize();

};



module.exports = WatchlistController;
