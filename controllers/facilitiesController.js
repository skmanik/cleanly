const request = require('request');

module.exports = {
  findAll: function (req, res) {
    // check if query is included, if so run
    // findByQuery function defined further below
    if (req.query.q) {
      module.exports.findByQuery(req, res);
      return;
    }

    request('https://data.sfgov.org/resource/sipz-fjte.json', { json: true }, (err, apiResponse, body) => {
      if (err) { 
        res.json({'error': err});
      } else {
        res.json(apiResponse);
      }
    }); 
  },
  findById: function (req, res) {
    const url = 'https://data.sfgov.org/resource/sipz-fjte.json?business_id=' + req.params.id;

    request(url, { json: true }, (err, apiResponse, body) => {
      if (err) { 
        res.json({'error': err});
      } else {
        res.json(apiResponse);
      }
    });
  },
  findByQuery: function (req, res) {
    const url = 'https://data.sfgov.org/resource/sipz-fjte.json?$where=business_name like%20%27%25' + req.query.q + "%25%27";

    request(url, { json: true }, (err, apiResponse, body) => {
      if (err) {
        res.json({'error': err});
      } else {
        const businessesById = mergeBusinessesByInspections(body);
        res.json(businessesById);
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

// functions used by findByQuery
const mergeBusinessesByInspections = (businesses) => {
  const businessesById = {};

  for (let currentBusiness of businesses) {
    if (businessesById.hasOwnProperty(currentBusiness.business_id)) {
      // do merge stuff
      // look at existing object
      const existingObj = businessesById[currentBusiness.business_id];

      if (!existingObj.scores.hasOwnProperty(currentBusiness.inspection_id)) {
        existingObj.scores[currentBusiness.inspection_id] = currentBusiness.inspection_score;
      }
    } else {
      const businessObj = {
        id: currentBusiness.business_id,
        name: currentBusiness.business_name,
        city: currentBusiness.business_city,
        address: currentBusiness.business_address,
        scores: {
          [currentBusiness.inspection_id]: currentBusiness.inspection_score
        }
      }

      // storing in businessesById obj
      businessesById[currentBusiness.business_id] = businessObj;
    }
  }

  return businessesById;
}
