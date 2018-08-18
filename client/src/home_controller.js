const HomeView = require('./views/home_view/home_view.js');
const CryptoView = require('./views/home_view/crypto_view.js');
const GraphView = require('./views/graph_view/graph_view.js');
const ForexView = require('./views/home_view/forex_view.js');
const NewsfeedView = require('./views/home_view/newsfeed_view.js');
const NewsfeedModel = require('./models/newsfeed_model.js');
const Graph = require('./models/graph.js');
const Crypto = require('./models/crypto.js');
const Forex = require('./models/forex.js');

const HomeController = function (){

};

HomeController.prototype.initializePage = function () {
   //
   // const example = document.createElement('div');
   // example.textContent= "Home Display";
   const pageBody = document.querySelector('#pageBody');
   // pageBody.appendChild(example);

   const forexList = document.querySelector('#forex-list');

   const forexListView = new ForexView(forexList);
   forexListView.bindEvents();

   const cryptoList = document.querySelector('#crypto-list');
   const cryptoListView = new CryptoView(cryptoList);
   cryptoListView.bindEvents();

   const graphNode = document.querySelector('#graph');
   const graphView = new GraphView(graphNode);
   graphView.bindEvents();

   const newsfeedList = document.querySelector('#newsfeed-list');
   const newsfeedView = new NewsfeedView(newsfeedList);
   newsfeedView.bindEvents();

   const newsfeedModel = new NewsfeedModel();
   newsfeedModel.initializeList();

   const graph = new Graph();
   graph.initializeGraph();

   const crypto = new Crypto();
   crypto.initialize();

   const forex = new Forex();
   forex.initialize();

 };

  // const formView = new FormView(form);
  // formView.bindEvents();
  // const bucketList = document.querySelector('div#bucket-list');
  // const listView = new ListView(bucketList);
  // listView.bindEvents();
  //
  // const wishes = new Wishes();
  // wishes.bindEvents();

module.exports = HomeController;
