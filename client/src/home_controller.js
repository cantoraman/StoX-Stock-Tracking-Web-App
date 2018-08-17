const HomeView = require('./views/home_view/home_view.js');

const HomeController = function (){

};

HomeController.prototype.initializePage = function () {

   const example = document.createElement('div#example-home');
   example.textContent= "Home Display";




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
