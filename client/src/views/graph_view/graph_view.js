const PubSub = require('../../helpers/pub_sub.js');
const Highcharts = require('highcharts');
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
  const container = document.createElement('div');
  const listOfDates = [];
  const listOfPrices = [];
  const priceData = graphdata["MSFT"];
  let i = 0;
  priceData.chart.forEach(function(day) {
    listOfDates.push(day.date);
    listOfPrices.push(parseFloat(day.close));
    i++;
  })




  var chart = new Highcharts.Chart(
    {
      chart: {
        type: 'line',
        renderTo: container,
        width: 600
      },
      title: {
        text: "MSFT"
      },
      series: listOfDates,
      xAxis: {
        categories: []
      },
      yAxis: [{
        title: {
          text: "$"
        }
      }],
      series: [{
        type: 'line',
        data: listOfPrices,
        name: 'Price'
      }]
    }
  )
  this.container.appendChild(container);
};


module.exports = GraphView;
