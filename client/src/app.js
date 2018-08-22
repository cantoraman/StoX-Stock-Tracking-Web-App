const AppData = require('./models/app_data.js');
const HomeController = require('./home_controller.js');
const WatchlistController = require('./watchlist_controller.js');
const HoldingsController = require('./holdings_controller.js');
const HoldingsTableView = require('./views/stockholdings_view/holdings_table_view.js');

document.addEventListener('DOMContentLoaded', () => {

  const holdingsController = new HoldingsController();
  const dataUrl = 'http://localhost:3000/api/user';
  const appData = new AppData(dataUrl);
  const watchlistController = new WatchlistController();
  const homeController = new HomeController();
  const homeButton = document.querySelector('#home-button');
  const watchlistButton = document.querySelector('#watchlist-button');
  const holdingsButton = document.querySelector('#holdings-button');
  const pageBody = document.querySelector('#pageBody');


  appData.launchData();


  homeController.initializePage();

  homeButton.addEventListener('click', (event) => {
    event.preventDefault();
    pageBody.innerHTML = '';
    homeController.initializePage();
  });


  watchlistButton.addEventListener('click', (event) => {
    event.preventDefault();
    pageBody.innerHTML = '';
    watchlistController.initializePage();
  //  appData.getData();
  });


  holdingsButton.addEventListener('click', (event) => {
    event.preventDefault();
    pageBody.innerHTML = '';
    holdingsController.initializePage(appData.getUserData());
    holdingsController.bindEvents();
  //  appData.getData();
  });


});
