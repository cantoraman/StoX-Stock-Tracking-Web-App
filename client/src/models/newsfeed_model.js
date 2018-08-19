const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');
const API_KEY_NEWS2 = require('../api_news2_key.js');

const NewsfeedData = function (url) {
  this.url = `https://newsapi.org/v2/top-headlines?sources=financial-times&apiKey=${API_KEY_NEWS2}`;
  this.request = new Request(this.url);
};

NewsfeedData.prototype.bindEvents = function () {

  PubSub.publish('Newsfeed:loaded-news', (evt) => {
    this.url = `https://newsapi.org/v2/top-headlines?sources=financial-times&apiKey=${API_NEWS2_KEY}`;
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
