const PubSub = require('../../helpers/pub_sub.js');

const ChartView = function (container) {
  this.container = container;
}

ChartView.prototype.bindEvents = function () {
  PubSub.subscribe('', (evt) => {
    this.render(evt.detail);
  });
};

ChartView.prototype.render = function (data) {
  this.container.innerHTML = '';
  console.log("newsfeed rendering complete");
};

module.exports = ChartView;
