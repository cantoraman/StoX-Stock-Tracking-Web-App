const PubSub = require('../../helpers/pub_sub.js');

const CommoditiesView = function (container) {
  this.container = container;
}

CommoditiesView.prototype.bindEvents = function () {
  PubSub.subscribe('', (evt) => {
    this.render(evt.detail);
  });
};

CommoditiesView.prototype.render = function (games) {
  this.container.innerHTML = '';
  console.log("chartview rendering complete");
  // const newsfeedView = new NewsfeedviewView(this.container);
  // games.forEach((game) => gameView.render(game));
};

module.exports = CommoditiesView;
