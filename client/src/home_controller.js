const HomeView = require('./views/home_view/home_view.js');
const CommoditiesView = require('./views/home_view/commodities_view.js');
const ChartView = require('./views/home_view/chart_view.js');
const ForexView = require('./views/home_view/forex_view.js');
const NewsfeedView = require('./views/home_view/newsfeed_view.js');

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

   const commoditiesList = document.querySelector('#commodities-list');
   const commoditiesListView = new CommoditiesView(forexList);
   commoditiesListView.bindEvents();

   const chartNode = document.querySelector('#chart');
   const chartView = new ChartView(chartNode);
   chartView.bindEvents();

   const newsfeedList = document.querySelector('#newsfeed-list');
   const newsfeedView = new NewsfeedView(newsfeedList);
   newsfeedView.bindEvents();

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
