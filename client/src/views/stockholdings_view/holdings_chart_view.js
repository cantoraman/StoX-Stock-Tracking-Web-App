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
  this.getTotalInvestment(userData[0].holdings, this.container);
  this.getPercentagesForEachStock(userData[0].holdings);
};

PieChartView.prototype.getTotalInvestment = function (userData) {

const totalInvestedValueInArray = [];
userData.forEach((holding) => {
  totalInvestedValueInArray.push(parseInt(holding.investedValue));
});
const total = totalInvestedValueInArray.reduce(function(sum, volume) {
  return sum += volume;
}, 0)
return total;
};

PieChartView.prototype.getPercentagesForEachStock = function (userData) {
  const totalInvestmentForEachShare = this.getTotalInvestment(userData);
  const percentageOfInvestedValueByHolding = [];
  const namesArray = [];

  userData.forEach((holding) => {
    namesArray.push(holding.stock);
  })

  userData.forEach((holding) => {
    percentageOfInvestedValueByHolding.push(parseInt(holding.investedValue));
});
console.log(namesArray);

const arrayOfPercentages = percentageOfInvestedValueByHolding.map(value => ((value/totalInvestmentForEachShare)*100).toFixed(2));
parseInt(arrayOfPercentages);

this.renderNewPieChart(namesArray, arrayOfPercentages);
}

module.exports = PieChartView;
