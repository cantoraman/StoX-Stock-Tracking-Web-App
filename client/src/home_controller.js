const HomeView = require('./views/home_view/home_view.js');

const HomeController = function (){

};

HomeController.prototype.initializePage = function () {

   const example = document.createElement('div');
   example.textContent= "Home Display";


   const pageBody = document.querySelector('#pageBody');
   pageBody.appendChild(example);

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
