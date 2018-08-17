const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');
const API_KEY_NEWS = require('../api_key_news.js');

const NewsfeedData = function (url) {
  this.url = `https://newsapi.org/v2/top-headlines?sources=bloomberg&apiKey=${API_KEY_NEWS}`;
  this.request = new Request(this.url);
};

NewsfeedData.prototype.bindEvents = function () {

  PubSub.subscribe('Newsfeed:request-news', (evt) => {
    this.url = `https://newsapi.org/v2/top-headlines?sources=bloomberg&q=${evt.detail}&apiKey=${API_KEY_NEWS}`;
    const request = new Request(this.url);

  });

};

NewsfeedData.prototype.initializeList = function () {
  const request = new Request(this.url);
  request.get().then((data) => {
    this.publishInitialNews(data);
  });
};


NewsfeedData.prototype.publishInitialNews = function (data) {
  PubSub.publish('Newsfeed:publish-news', data);
};


NewsfeedData.prototype.publishFocusedNews = function (data) {
  PubSub.publish('Newsfeed:publish-news', data);
};




module.exports = NewsfeedData;
