const PubSub = require('../../helpers/pub_sub.js');
const Highcharts = require('highcharts');

const PieChartView = function (container) {
  this.container = container;
}

PieChartView.prototype.initializePieChart = function (userData) {
  this.bindEvents();
  this.publishPieChart(userData);
};

PieChartView.prototype.publishPieChart = function (data) {
  PubSub.publish('PieChart:publish-chart-data', data);
};

PieChartView.prototype.bindEvents = function () {
  PubSub.subscribe('AppData:data-loaded', (evt) => {
    this.arrangePieChartToRender(evt.detail);
  });
}

PieChartView.prototype.arrangePieChart = function (name, percentage) {
  // console.log("hi");
  // console.log("name",name);
  // const arrangedData = {
  //             "name": `${name}`,
  //             "y": `${percentage}`
  //         }
  //         this.renderPieChart(arrangedData, container);
};



module.exports = PieChartView;
