const PubSub = require('../../helpers/pub_sub.js');
const Highcharts = require('highcharts');

const GraphView = function (container) {
  this.container = container;
}

GraphView.prototype.bindEvents = function () {
  PubSub.subscribe('Graph:publish-graphdata', (evt) => {
    this.arrangeStockToRender(evt.detail);
  });
  PubSub.subscribe('Graph:publish-crypto', (evt) => {
    this.arrangeCryptoToRender(evt.detail);
  });
  PubSub.subscribe('Graph:publish-forex', (evt) => {
    this.arrangeForexToRender(evt.detail);
  });

};
GraphView.prototype.arrangeStockToRender = function (rawData) {
  const listOfDates = [];
  const listOfPrices = [];
  const priceData = rawData[Object.keys(rawData)[0]];
  priceData.chart.forEach(function(day) {
    listOfDates.push(day.date);
    listOfPrices.push(parseFloat(day.close));
  })
  const arrangedData = {
    "chartTitle": Object.keys(rawData)[0],
    "listOfDates": listOfDates,
    "yTitle": "$",
    "listOfPrices": listOfPrices
  };
  this.render(arrangedData);
};

GraphView.prototype.arrangeCryptoToRender = function (rawData) {
  const listOfDates = [];
  const listOfPrices = [];
  const priceData = rawData.Data;
  priceData.forEach(function(day) {
    listOfDates.push(day.time);
    listOfPrices.push(parseFloat(day.close));
  });
  const arrangedData = {
    "chartTitle": rawData.title,
    "listOfDates": listOfDates,
    "yTitle": "$",
    "listOfPrices": listOfPrices
  };
  this.render(arrangedData);
};

GraphView.prototype.arrangeForexToRender = function (rawData) {
  const listOfDates = [];
  const listOfPrices = [];
  const bulkData = rawData["Time Series FX (Daily)"];
  for (var key in bulkData){
    listOfDates.push(key);
    listOfPrices.push(parseFloat(bulkData[key]["4. close"]));
  }
  const arrangedData = {
    "chartTitle": `${rawData["Meta Data"]["2. From Symbol"]}/${rawData["Meta Data"]["3. To Symbol"]}`,
    "listOfDates": listOfDates,
    "yTitle": `${rawData["Meta Data"]["3. To Symbol"]}`,
    "listOfPrices": listOfPrices
  };
  this.render(arrangedData);
};

GraphView.prototype.render = function (graphData) {
  this.container.innerHTML = '';
  const container = document.createElement('div');
  const listOfDates = graphData.listOfDates;
  const listOfPrices = graphData.listOfPrices;
  const chartTitle = graphData.chartTitle;
  const yTitle = graphData.yTitle;
  const chart = this.summonChart(container, chartTitle, listOfDates, yTitle, listOfPrices);
  const date = new Date();
  const dateHead = document.createElement('p')
  dateHead.innerHTML = date;
  this.container.appendChild(dateHead);
  this.container.appendChild(container);

};

GraphView.prototype.summonChart = function (container, chartTitle, listOfDates, yTitle, listOfPrices) {
  const chart = new Highcharts.Chart(
    {
      chart: {
        type: 'line',
        renderTo: container,
        width: 600
      },
      title: {
        text: chartTitle
      },
      series: listOfDates,
      xAxis: {
        categories: [],
        title: {
          text: "Time"
        }
      },
      yAxis: [{
        title: {
          text: yTitle
        }
      }],
      series: [{
        type: 'line',
        data: listOfPrices,
        name: 'Price'
      }]
    }
  )
  return chart;
};
module.exports = GraphView;
