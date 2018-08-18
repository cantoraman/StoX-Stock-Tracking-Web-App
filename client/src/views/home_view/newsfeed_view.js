const PubSub = require('../../helpers/pub_sub.js');

const NewsfeedView = function (container) {
  this.container = container;
}

NewsfeedView.prototype.bindEvents = function () {
  PubSub.subscribe('Newsfeed:publish-news', (evt) => {
    this.render(evt.detail);
  });
};

NewsfeedView.prototype.render = function (news) {
  this.container.innerHTML = '';
  news.articles.forEach((article) => {
    this.container.appendChild(this.createArticleItem(article));
  })
};

NewsfeedView.prototype.createArticleItem = function (article) {
  const articleItemNode = document.createElement('ul');
  articleItemNode.classList.add('article-item');

  const title = document.createElement('a');
  title.textContent=article.title;
  title.href = article.url;
  articleItemNode.appendChild(title);

  return articleItemNode;
};

module.exports = NewsfeedView;
