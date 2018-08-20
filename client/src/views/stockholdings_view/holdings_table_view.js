const PubSub = require('../../helpers/pub_sub.js');
const AppData = require('../../models/app_data.js');
const Highcharts = require('highcharts');
const PieChartView = require('./holdings_chart_view.js');

const HoldingsTableView = function (container) {
  this.container = container;
}

HoldingsTableView.prototype.bindEvents = function () {

  // PubSub.subscribe('AppData:data-loaded', (evt) => {
  //   console.log(evt.detail[0]);
  //   this.renderHoldings(evt.detail[0].holdings, this.container);
  // });

};

HoldingsTableView.prototype.initializeTable = function (userData) {
  this.getTotalVolume(userData[0].holdings);

  this.renderHoldings(userData[0].holdings, this.container);
};

HoldingsTableView.prototype.renderHoldings = function (userData, pageBody) {

  const holdingsTable = document.createElement('table');
  holdingsTable.classList.add('holdings-table');
  this.container.appendChild(holdingsTable);
  const tableHeader = holdingsTable.insertRow(0);

  const nameHeader = tableHeader.insertCell(0);
  const valueHeader = tableHeader.insertCell(1);
  const sharesHeldHeader = tableHeader.insertCell(2);
  const profitLossHeader = tableHeader.insertCell(3);
  const holdingsPercentHeader = tableHeader.insertCell(4);
  // stock, invested value, shares held, profit/loss
  const stockNames = [];
  const stockValues = [];
  const sharesHeld = [];
  const profitLoss = [];
  const holdingsPercent = [];

  const totalVolume = this.getTotalVolume(userData);
  // const holdingsPercentageByStock = (stock.noOfSharesHeld/totalVolume)*100;
  const namesArray = [];
  const percentArray = [];
  userData.forEach(function(stock) {
    stockValues.push(stock.investedValue);
    stockNames.push(stock.stock);
    sharesHeld.push(stock.noOfSharesHeld);
    profitLoss.push(stock.profitLoss);
    holdingsPercent.push((stock.noOfSharesHeld/totalVolume)*100)
    console.log("holdingsPercent", holdingsPercent);


    const row = holdingsTable.insertRow(1);
    tableHeader.classList.add('holdings-header');

    const stockNamesCell = row.insertCell(0);
    const stockValuesCell = row.insertCell(1);
    const sharesHeldCell = row.insertCell(2);
    const profitLossCell = row.insertCell(3);
    const percentageCell = row.insertCell(4);
    stockNamesCell.innerHTML = stock.stock;
    stockValuesCell.innerHTML = stock.investedValue;
    sharesHeldCell.innerHTML = stock.noOfSharesHeld;
    profitLossCell.innerHTML = stock.profitLoss;
    const calculatedpercentage = ((stock.noOfSharesHeld/totalVolume)*100).toFixed(2);
    percentageCell.innerHTML = calculatedpercentage;
    namesArray.push(stock.stock);
    percentArray.push(calculatedpercentage);
  });

  this.renderPieChart(namesArray, percentArray, this.container);


  nameHeader.innerHTML = "Stock";
  valueHeader.innerHTML = "Invested Value";
  sharesHeldHeader.innerHTML = "Volume";
  profitLossHeader.innerHTML = "Profit/Loss";
  holdingsPercentHeader.innerHTML = "% of total holdings"
};

HoldingsTableView.prototype.getTotalVolume = function (rawData) {
  console.log("rawData", rawData);
  const individualHoldings = rawData;
  const totalStockVolumeInArray = [];

  individualHoldings.forEach((holding) => {
    totalStockVolumeInArray.push(parseInt(holding.noOfSharesHeld));
  })
  const total = totalStockVolumeInArray.reduce(function(sum, volume) {
    return sum += volume;
  }, 0)
  console.log(total);
  return total;
};

// [{
//      name: `${name}`,
//      y: `${percentage}`
//  }, {
//      name: 'Internet Explorer',
//      y: 11.84
//  }, {
// }]

HoldingsTableView.prototype.renderPieChart = function (names,percentages, container) {

const finalDataArray = names.map((name, index) => {
  return {name: name, y: (parseInt(percentages[index]))}
})

console.log(finalDataArray);

  // names.forEach((name) => {
  //   `${name}`
  // });
  //
  // percentages.forEach((percentage) => {
  //   `${percentage}`
  // })

  var pieChart = new Highcharts.Chart(
    {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        renderTo: container,
        type: 'pie'
      },
      title: {
        text: 'Browser market shares in January, 2018'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
          }
        }
      },
      series: [{
        name: 'Stock Holdings',
        colorByPoint: true,
        data: finalDataArray
    }]
  });
};

  module.exports = HoldingsTableView;
