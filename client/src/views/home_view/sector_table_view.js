const PubSub = require('../../helpers/pub_sub.js');

const SectorTableView = function (container) {
  this.container = container;
}

SectorTableView.prototype.bindEvents = function () {
  PubSub.subscribe('SectorTable:publish-sector-data', (evt) => {
    this.createSectorTable(evt.detail);
  });
}

SectorTableView.prototype.createSectorTable = function (data) {
  const sectorTable = document.createElement('table');
  sectorTable.classList.add('sector-table');
  this.container.appendChild(sectorTable);

  const tableHeader = sectorTable.insertRow(0);

  const nameHeader = tableHeader.insertCell(0);
  nameHeader.textContent = "Sector performance"
  const performanceHeader = tableHeader.insertCell(1);

  const sectorName = [];
  const sectorPerformance =[]

  data.reverse();
  data.forEach(function(day, i) {
    const row = sectorTable.insertRow(1);
    sectorName.push(data[i].name);
    sectorPerformance.push(data[i].performance);
    const nameCell = row.insertCell(0);
    nameCell.id = 'sector-name'
    nameCell.classList.add("indicator");
    nameCell.textContent = data[i].name;
    const priceCell = row.insertCell(1);
    priceCell.id = 'price-cell';
    priceCell.textContent = data[i].performance;
    if (priceCell.textContent > 0) {
      priceCell.classList.add('positive')
    } else { priceCell.classList.add('negative')}
  });
  nameHeader.innerHTML = "Sector";
  performanceHeader.innerHTML = "Performance";
};
module.exports = SectorTableView;
