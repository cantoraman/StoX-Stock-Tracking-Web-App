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

PieChartView.prototype.arrangePieChartToRender = function (rawData) {
  const individualHoldings = rawData[0].holdings;
  const totalStockVolumeInArray = [];

  individualHoldings.forEach((holding) => {
    totalStockVolume.push(parseInt(holding.noOfSharesHeld));
  })
//TOTAL IS TOTAL VOLUME OF ALL STOCKS OWNED BY USER
const total = totalStockVolumeInArray.reduce(function(sum, volume) {
  return sum += volume;
}, 0)

};

PieChartView.prototype.summonChart = function (container) {
  //   var pieChart = new Highcharts.Chart(
  //     chart: {
  //         plotBackgroundColor: null,
  //         plotBorderWidth: null,
  //         plotShadow: false,
  //         renderTo: container,
  //         type: 'pie'
  //     },
  //     title: {
  //         text: 'Browser market shares in January, 2018'
  //     },
  //     tooltip: {
  //         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  //     },
  //     plotOptions: {
  //         pie: {
  //             allowPointSelect: true,
  //             cursor: 'pointer',
  //             dataLabels: {
  //                 enabled: true,
  //                 format: '<b>{point.name}</b>: {point.percentage:.1f} %',
  //                 style: {
  //                     color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
  //                 }
  //             }
  //         }
  //     },
  //     series: [{
  //         name: 'Brands',
  //         colorByPoint: true,
  //         data: [{
  //             name: 'Chrome',
  //             y: 61.41,
  //             sliced: true,
  //             selected: true
  //         }, {
  //             name: 'Internet Explorer',
  //             y: 11.84
  //         }, {
  //             name: 'Firefox',
  //             y: 10.85
  //         }, {
  //             name: 'Edge',
  //             y: 4.67
  //         }, {
  //             name: 'Safari',
  //             y: 4.18
  //         }, {
  //             name: 'Sogou Explorer',
  //             y: 1.64
  //         }, {
  //             name: 'Opera',
  //             y: 1.6
  //         }, {
  //             name: 'QQ',
  //             y: 1.2
  //         }, {
  //             name: 'Other',
  //             y: 2.61
  //         }]
  //     }]
  // });
};

module.exports = PieChartView;
