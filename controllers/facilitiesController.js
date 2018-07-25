//var soda = require('../lib/soda-js');

module.exports = {
  findAll: function (req, res) {

    // var consumer = new soda.Consumer('https://data.sfgov.org/resource/sipz-fjte.json?business_id=68483');

    // consumer.query()
    //   .on('success', function (rows) { console.log("rows", rows); })
    //   .on('error', function (error) { console.error(error); });

    console.log("Controller");
    return res.json("hello");
  },
  findById: function (req, res) {

  },
  create: function (req, res) {

  },
  update: function (req, res) {

  },
  remove: function (req, res) {

  }
};
