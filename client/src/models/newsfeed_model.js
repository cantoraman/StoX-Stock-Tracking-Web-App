const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');
const API_KEY_NEWS = require('./api_key.js');

const NewsfeedData = function (url) {
  this.url = 'https://newsapi.org/v2/top-headlines?sources=bloomberg&apiKey=API_KEY';
  this.request = new Request(this.url);
};

NewsfeedData.prototype.bindEvents = function () {

  PubSub.subscribe('Newsfeed:request-news', (evt) => {
    this.url = `https://newsapi.org/v2/top-headlines?sources=bloomberg&q=${evt.detail}&apiKey=${API_KEY_NEWS}`;
  )};

};


NewsfeedData.prototype.getFocusedNews = function (subject) {
  PubSub.publish('Newsfeed:publish-news', newGame);

};

GameFormView.prototype.handleSubmit = function (evt) {
  evt.preventDefault();
  const newGame = this.createGame(evt.target);
  PubSub.publish('GameView:game-submitted', newGame);
  evt.target.reset();
};


module.exports = NewsfeedView;
