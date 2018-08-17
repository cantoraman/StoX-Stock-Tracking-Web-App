const PubSub = require('../../helpers/pub_sub.js');

const ChartView = function (container) {
  this.container = container;
}

ChartView.prototype.bindEvents = function () {
  PubSub.subscribe('', (evt) => {
    this.render(evt.detail);
  });
};

ChartView.prototype.render = function (games) {
  this.container.innerHTML = '';
  console.log("newsfeed rendering complete");
  // const newsfeedView = new NewsfeedviewView(this.container);
  // games.forEach((game) => gameView.render(game));
};

module.exports = ChartView;
