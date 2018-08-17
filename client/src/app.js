const AppData = require('./models/app_data.js');
const HomeController = require('./home_controller.js');


document.addEventListener('DOMContentLoaded', () => {

  const dataUrl = 'http://localhost:3000/api/user';
  const appData = new AppData(dataUrl);
  appData.getData();

  const homeController = new HomeController();
  homeController.initializePage();

  //
  // homeButton.addEventListener('submit', (event) => {
  //     event.preventDefault();
  //     RESET INNER HTML
  //     load homeController(userData)
  //   });
  //
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
