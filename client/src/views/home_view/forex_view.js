const PubSub = require('../../helpers/pub_sub.js');

const ForexView = function (container) {
  this.container = container;
}

ForexView.prototype.bindEvents = function () {
  PubSub.subscribe('', (evt) => {
    this.render(evt.detail);
  });
};

ForexView.prototype.render = function (games) {
  this.container.innerHTML = '';
  console.log("foreex rendering comlete");
  // const newsfeedView = new NewsfeedviewView(this.container);
  // games.forEach((game) => gameView.render(game));
};

module.exports = ForexView;
