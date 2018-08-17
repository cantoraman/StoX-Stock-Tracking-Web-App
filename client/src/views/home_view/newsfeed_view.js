const PubSub = require('../../helpers/pub_sub.js');

const NewsfeedView = function (container) {
  this.container = container;
}

NewsfeedView.prototype.bindEvents = function () {

  PubSub.subscribe('Newsfeed:publish-news', (evt) => {
    this.render(evt.detail);
  });
  
};



NewsfeedView.prototype.render = function (games) {
  this.container.innerHTML = '';
  console.log("newsfeed rendering complete");
  // const newsfeedView = new NewsfeedviewView(this.container);
  // games.forEach((game) => gameView.render(game));
};

module.exports = NewsfeedView;
