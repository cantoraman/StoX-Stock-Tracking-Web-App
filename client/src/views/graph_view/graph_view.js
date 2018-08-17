const PubSub = require('../../helpers/pub_sub.js');

const GraphView = function (container) {
  this.container = container;
}

GraphView.prototype.bindEvents = function () {
  PubSub.subscribe('Graph:publish-graphdata', (evt) => {
    this.render(evt.detail);
  });
};

GraphView.prototype.render = function (graphdata) {
  this.container.innerHTML = '';
  console.log("graph rendering complete:", graphdata);
  // const newsfeedView = new NewsfeedviewView(this.container);
  // games.forEach((game) => gameView.render(game));
};

module.exports = GraphView;
