const PubSub = require('../../helpers/pub_sub.js');
const AppData = require('../../models/app_data.js');

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

this.renderHoldings(userData[0].holdings, this.container);
};

HoldingsTableView.prototype.renderHoldings = function (userData, pageBody) {

        generatePopupForm();

  const holdingsTable = document.createElement('table');
  holdingsTable.classList.add('holdings-table');
  this.container.appendChild(holdingsTable);
  const tableHeader = holdingsTable.insertRow(0);

  const nameHeader = tableHeader.insertCell(0);
  const valueHeader = tableHeader.insertCell(1);
  const currentValueHeader = tableHeader.insertCell(2);
  const sharesHeldHeader = tableHeader.insertCell(3);
  const profitLossHeader = tableHeader.insertCell(4);
  const addHeader = tableHeader.insertCell(5);
  const removeHeader = tableHeader.insertCell(6);
  // stock, invested value, shares held, profit/loss
  const stockNames = [];
  const stockValues = [];
  const stockCurrentValue = [];
  const sharesHeld = [];
  const profitLoss = [];


  i = 0;


  userData.forEach(function(stock) {
    stockValues.push(stock.investedValue);
    stockNames.push(stock.stock);
    sharesHeld.push(stock.noOfSharesHeld);
    profitLoss.push(stock.profitLoss);
    const row = holdingsTable.insertRow(1);
    tableHeader.classList.add('holdings-header');

    const stockNamesCell = row.insertCell(0);
    const stockValuesCell = row.insertCell(1);
    const stockCurrentValueCell = row.insertCell(2);
    const sharesHeldCell = row.insertCell(3);
    const profitLossCell = row.insertCell(4);
    const addCell = row.insertCell(5);
    const removeCell = row.insertCell(6);
    stockNamesCell.innerHTML = stock.stock;
    stockValuesCell.innerHTML = stock.investedValue;
    stockCurrentValueCell.innerHTML = 100;
    sharesHeldCell.innerHTML = stock.noOfSharesHeld;
    profitLossCell.innerHTML = stock.profitLoss;
    addCell.innerHTML = "Add";
    addCell.classList.add("indicator");
    removeCell.innerHTML = "Remove";
    removeCell.classList.add("indicator");
    addCell.addEventListener('click', (event) => {
      console.log("add button pressed");
      popThePopup();
    });
    removeCell.addEventListener('click', (event) => {
      console.log("remove button pressed");
    });
    i++
  });




function generatePopupForm() {
  const container = document.createElement('div');
  container.classList.add("popup");
  const body = document.querySelector("#pageBody");
  body.appendChild(container);

  const span = document.createElement('span');
  span.id="myPopup";
  span.classList.add("popuptext");
  span.textContent = "HELLO WORLD";
  container.appendChild(span);

  const closeButton = document.createElement('button');
  closeButton.id = "close-button";
  span.appendChild(closeButton);
  closeButton.addEventListener('click', (event) => {
  togglePopup();
});
  //
  // const form = document.createElement('form');
  // const input = document.createElement('input');
  //
  //
  // //
  // form.classList.add = "myPopup" ;
  // var popup = document.querySelector("myPopup");
    //popup.classList.toggle("show");
};

function togglePopup(){
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");

}

  nameHeader.innerHTML = "Stock";
  valueHeader.innerHTML = "Invested Value";
  currentValueHeader.innerHTML = "Current Price";
  sharesHeldHeader.innerHTML = "Volume";
  profitLossHeader.innerHTML = "Profit/Loss";
  addHeader.innerHTML = "Bought";
  removeHeader.innerHTML = "Sold";



};



module.exports = HoldingsTableView;
