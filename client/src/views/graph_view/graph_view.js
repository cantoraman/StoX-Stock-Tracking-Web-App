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

  console.log("graph rendering complete:", graphdata);
  var chart = new Highcharts.Chart(
    {
      chart: {
        type: 'line',
        renderTo: container
      },
      title: {
        text: "test"
      },
      series: [1, 2, 3, 4, 5, 6],
      xAxis: {
        categories: []
      },
      yAxis: [{
        title: {
          text: "Y axis"
        }
      }],
      series: [{
        type: 'line',
        data: [1, 2, 3, 4, 5, 6],
        name: 'y axis data'
      }]
    }
  )
  this.container.appendChild(container);


  };



module.exports = GraphView;
