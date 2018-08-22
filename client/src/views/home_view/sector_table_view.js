const PubSub = require('../../helpers/pub_sub.js');

const SectorTableView = function (container) {
  this.container = container;
}

SectorTableView.prototype.bindEvents = function () {
  PubSub.subscribe('SectorTable:publish-sector', (evt) => {
    console.log(evt);
    this.createSectorTable(evt.detail);
  });
}

  SectorTableView.prototype.createSectorTable = function (sectors) {
    const sectorTable = document.createElement('table');
    sectorTable.classList.add('sector-table');
    this.container.appendChild(sectorTable);

    const tableHeader = sectorTable.insertRow(0);
    tableHeader.innerHTML = "Sector";

    const performanceHeader = sectorTable.insertRow(1);
    tableHeader.innerHTML = "Yesterday's Performance";



};
module.exports = SectorTableView;
