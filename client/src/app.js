const AppData = require('./models/app_data.js');
const HomeController = require('./home_controller.js');
const WatchlistController = require('./watchlist_controller.js');
const HoldingsController = require('./holdings_controller.js');

document.addEventListener('DOMContentLoaded', () => {

  const holdingsController = new HoldingsController();

  const dataUrl = 'http://localhost:3000/api/user';
  const appData = new AppData(dataUrl);
  appData.getData();

  const pageBody = document.querySelector('#pageBody');

  const watchlistController = new WatchlistController();

  const homeController = new HomeController();
  homeController.initializePage();

  const homeButton = document.querySelector('button#home-button');

  homeButton.addEventListener('click', (event) => {
    event.preventDefault();
    pageBody.innerHTML = '';
    homeController.initializePage();
  });

  const watchlistButton = document.querySelector('button#watchlist-button');

  watchlistButton.addEventListener('click', (event) => {
    console.log("zxzxzzzzz");
    event.preventDefault();
    pageBody.innerHTML = '';
    watchlistController.initializePage();
  });

  const holdingsButton = document.querySelector('button#holdings-button');
  holdingsButton.addEventListener('click', (event) => {
    event.preventDefault();
    pageBody.innerHTML = '';
    holdingsController.initializePage();
    appData.getData();
  });


  // watchListButton.addEventListener('submit', (event) => {
  //     event.preventDefault();
  //     RESET INNER HTML
  //     load watchListController(userData)
  //   });
  //
  // holdingsButton.addEventListener('submit', (event) => {
  //     event.preventDefault();
  //     RESET INNER HTML
  //     load holdingsController
  //   });


});


//
//
//   In homeController
//     //we already have the userData
//     const forexNode = document.querySelector('.forex-list')
//     const forexView = new forexView(searchNode);
//     forexView.bindEvents();
//
//     const commoditiesNode = document.querySelector('.commodities-list')
//     const commoditiesView = new CommoditiesView(searchNode);
//     commoditiesView.bindEvents();
//
//     const chartNode = document.querySelector('.chart-placing')
//     const chartView = new ChartView(chartNode);
//     chartView.bindEvents();
//
//     const newsNode = document.querySelector('.news-list')
//     newsView = new NewsView(NewsNode);
//     newsView.bindEvents();
