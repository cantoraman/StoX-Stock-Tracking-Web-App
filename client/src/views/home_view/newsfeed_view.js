const PubSub = require('../../helpers/pub_sub.js');

const NewsfeedView = function (container) {
  this.container = container;
}

NewsfeedView.prototype.bindEvents = function () {
  PubSub.subscribe('Newsfeed:publish-news', (evt) => {
    this.createArticleTable(evt.detail);
  });
}

  NewsfeedView.prototype.createArticleTable = function (articles) {
    const newsTable = document.createElement('table');
    newsTable.classList.add('news-table');
    this.container.appendChild(newsTable);

    const tableHeader = newsTable.insertRow(0);
    tableHeader.innerHTML = "Latest Financial News";

    const newsHeadlines = [];
    const newsImages = [];


    articles.articles.forEach(function(article) {
      const headlineLink = document.createElement('a');
      const headline = document.createTextNode(article.title);
      headlineLink.appendChild(headline);
      headlineLink.title = article.title;
      headlineLink.href = article.url;
      headlineLink.setAttribute('target', '_blank');
      newsImages.push(article.urlToImage);
      const row = newsTable.insertRow(1);
      tableHeader.classList.add('news-header');

      const headlineCell = row.insertCell(0);
      const imageCell = row.insertCell(1);
      // headlineCell.innerHTML = article.title;
      const image = document.createElement('img');
      image.id = 'headline-image'
      image.src = article.urlToImage;
      imageCell.appendChild(image);
      headlineCell.appendChild(headlineLink);
  });
};
module.exports = NewsfeedView;
