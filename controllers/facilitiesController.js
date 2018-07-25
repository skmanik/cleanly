var request = require('request');

module.exports = {
  findAll: function (req, res) {

    request('https://data.sfgov.org/resource/sipz-fjte.json', { json: true }, (err, apiResponse, body) => {
      if (err) { 
        res.json({'error': err});
      } else {
        res.json(apiResponse);
      }
    }); 
  },
  findById: function (req, res) {

    var url = 'https://data.sfgov.org/resource/sipz-fjte.json?business_id=' + req.params.id;

    request(url, { json: true }, (err, apiResponse, body) => {
      if (err) { 
        res.json({'error': err});
      } else {
        res.json(apiResponse);
      }
    });
  },
  create: function (req, res) {

  },
  update: function (req, res) {

  },
  remove: function (req, res) {

  }
};
