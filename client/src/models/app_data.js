const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const AppData = function (url) {
  this.url = url;
};

AppData.prototype.bindEvents = function () {

  PubSub.subscribe('UserData:data-loaded', (event) => {
    } );
};

AppData.prototype.getData = function () {
  this.request = new Request(this.url);
  this.request.get()
    .then((userData) => {
      PubSub.publish('AppData:data-loaded', userData);
    })
    .catch(console.error);
};



// AppData.prototype.postData = function (appData) {
//   this.request.post(appData)
//   .then((wishes) => {
//     PubSub.publish('AppData:data-loaded',wishes);
//   })
//   .catch(console.error);
// };
//
// AppData.prototype.deleteData = function (appDataId) {
//   this.request.delete(appDataId)
//     .then((wishes) => {
//       PubSub.publish('AppData:data-loaded', wishes);
//     })
//     .catch(console.error);
// };
//
//
// AppData.prototype.putData = function (appData) {
//   this.request.put(appData)
//   .then((wishes) => {
//     console.log("AppData after Put:", wishes);
//     PubSub.publish('AppData:data-loaded', wishes);
//   })
//   .catch(console.error);
// };

module.exports = AppData;
