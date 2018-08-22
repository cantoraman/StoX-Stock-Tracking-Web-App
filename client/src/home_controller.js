const HomeView = require('./views/home_view/home_view.js');
const CryptoView = require('./views/home_view/crypto_view.js');
const GraphView = require('./views/graph_view/graph_view.js');
const ForexView = require('./views/home_view/forex_view.js');
const NewsfeedView = require('./views/home_view/newsfeed_view.js');
const NewsfeedModel = require('./models/newsfeed_model.js');
const Graph = require('./models/graph.js');
const Crypto = require('./models/crypto.js');
const Forex = require('./models/forex.js');
const SectorTableView = require('./views/home_view/sector_table_view.js')
const SectorTable = require('./models/sector_table.js');

const HomeController = function (){

};

HomeController.prototype.initializePage = function () {

   const pageBody = document.querySelector('#pageBody');


   const graphNode = document.createElement('div');
   pageBody.appendChild(graphNode);
   graphNode.id = 'graph';
   const graphView = new GraphView(graphNode);
   graphView.bindEvents();

   const forexList = document.createElement('div');
   forexList.id = 'forex-list';
   pageBody.appendChild(forexList);

   const forexListView = new ForexView(forexList);
   forexListView.bindEvents();

   const cryptoList = document.createElement('div');
   cryptoList.id = 'crypto-list';
   pageBody.appendChild(cryptoList);
   const cryptoListView = new CryptoView(cryptoList);
   cryptoListView.bindEvents();

   const newsfeedList = document.createElement('div');
   newsfeedList.id = 'newsfeed-list';
   pageBody.appendChild(newsfeedList);
   const newsfeedView = new NewsfeedView(newsfeedList);
   newsfeedView.bindEvents();

   const newsfeedModel = new NewsfeedModel();
   newsfeedModel.initializeList();

   const sectorTable = document.createElement('div');
   sectorTable.id = 'sector-list'
   pageBody.appendChild(sectorTable);
   const sectorTableView = new SectorTableView(sectorTable);
   sectorTableView.bindEvents();

   const graph = new Graph('https://api.iextrading.com/1.0/stock/market/batch?symbols=MSFT&types=chart&range=1m&last=5');
   graph.initializeGraph();

   const crypto = new Crypto();
   crypto.initialize();

   const forex = new Forex();
   forex.initialize();

   const sectors = new SectorTable()
   sectors.initialize();
 };


module.exports = HomeController;
