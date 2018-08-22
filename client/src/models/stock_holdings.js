const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');
const API_KEY_STOCK_CHART = require('../api_key_stock_charts.js');

const StockHoldings = function (userData) {
  this.url = 'http://localhost:3000/api/user';
  this.request = new Request(this.url);
  this.userData = userData;
};

StockHoldings.prototype.bindEvents = function () {
  PubSub.subscribe('StockHoldings:holding-submitted', (evt) => {
    this.arrangeHoldingChange(evt.detail);
  });
  PubSub.subscribe('StockHoldings:new-holding-submitted', (evt) => {
    this.addNewHolding(evt.detail);
  });
};

StockHoldings.prototype.addNewHolding = function (newHolding) {
  this.userData[0].holdings.push(newHolding);
  this.postChangedUserData();
};

StockHoldings.prototype.arrangeHoldingChange = function (updatedHolding) {

  this.userData[0].holdings.forEach(function (holding){
    if(holding.stock === updatedHolding.stock){
      let i =1;
      i = updatedHolding.investedValue<0 ? -1:1;
      // if(updatedHolding.investedValue<0){
      //   i=(-1);
      // }
        holding.investedValue=parseInt(holding.investedValue)+updatedHolding.investedValue;
        holding.noOfSharesHeld=parseInt(holding.noOfSharesHeld)+(i*updatedHolding.noOfSharesHeld);
      };
  });
  this.postChangedUserData();
};

StockHoldings.prototype.postChangedUserData = function () {
  this.request.put(this.userData)
  .then((holdings) => {
    console.log("Holdings after Put:", holdings);
    PubSub.publish('HoldingsTableView:data-loaded', holdings);
  })
  .catch(console.error);
};



module.exports = StockHoldings;
