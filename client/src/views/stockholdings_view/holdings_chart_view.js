const PubSub = require('../../helpers/pub_sub.js');
const Highcharts = require('highcharts');

const PieChartView = function (container) {
  this.container = container;
}

PieChartView.prototype.bindEvents = function () {
  PubSub.subscribe('HoldingsTableView:data-loaded', (evt) => {
    console.log("HoldingsSubscribedData:",evt.detail);
  });
};

PieChartView.prototype.initializePieChart = function (userData) {
  console.log(userData);
  this.renderHoldings(userData[0].holdings, this.container, userData[0]);

};

PieChartView.prototype.renderHoldings = function () {

};

module.exports = PieChartView;
