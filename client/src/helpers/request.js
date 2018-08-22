const Request = function (url) {
  this.url = url;
};

Request.prototype.get = function () {
  return fetch(this.url)
  .then((response) => response.json())
  .catch(error => console.log('error:', error));
};


Request.prototype.post = function (payload) {
  return fetch(this.url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  })
    .then((response) => response.json());
};

Request.prototype.delete = function (id) {
  return fetch(`${this.url}/${id}`, {
    method: 'DELETE'
  })
    .then((response) => response.json());
};

Request.prototype.put = function (payload) {
console.log("Payload:", payload);

  return fetch(`${this.url}/${payload[0]._id}`, {
    method: 'PUT',
    body: JSON.stringify(payload[0]),
    headers: { 'Content-Type': 'application/json' }
  })
  .then((response) => response.json())
  .catch((error)=>{
    console.error(error);
  });

};

Request.prototype.update = function (payload) {
  console.log(payload._id);
  return fetch(`${this.url}/${payload._id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  })
  .then((response) => response.json())
  .catch((error)=>{
    console.error(error);
  });
};

module.exports = Request;
