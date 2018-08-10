
const request = require('request');
const db = require("../models");

module.exports = {
  findAll: function (req, res) {
    // check if query is included, if so run
    // findByQuery function defined further below
    console.log(req.query.q);

    if (req.query.q) {
      module.exports.findByQuery(req, res);
      return;
    }

    request('https://data.sfgov.org/resource/sipz-fjte.json', { json: true }, (err, apiResponse, body) => {
      if (err) {
        res.json({ 'error': err });
      } else {
        res.json(apiResponse);
      }
    });
  },
  findById: function (req, res) {
    const url = 'https://data.sfgov.org/resource/sipz-fjte.json?business_id=' + req.params.id;

    request(url, { json: true }, (err, apiResponse, body) => {
      if (err) {
        res.json({ 'error': err });
      } else {
        const detailsById = mergeDetailsById(body);
        res.json(detailsById);
      }
    });
  },
  findByQuery: function (req, res) {
    // fixing capitalization problem
    const query = req.query.q.toLowerCase().split("'").join("''");
    const url = encodeURI("https://data.sfgov.org/resource/sipz-fjte.json?$where=lower(business_name) like '%" + query + "%'");

    request(url, { json: true }, (err, apiResponse, body) => {
      if (err) {
        res.json({ 'error': err });

      } else {
        const businessesById = mergeBusinessesByInspections(body);
        let businessesArr = [];

        for (let business_id in businessesById) {
          businessesArr.push(businessesById[business_id]);
        }

        // fetchBusinessPhotos(businessArr, (results) => {
        //   res.json(businessesArr);
        // })
        res.json(businessesArr);
      }
    });
  },
  findByName: function (req, res) {
    const name = encodeURIComponent(req.params.name.split("'").join("''"));
    const url = 'https://data.sfgov.org/resource/sipz-fjte.json?business_name=' + name;

    request(url, { json: true }, (err, apiResponse, body) => {
      if (err) {
        res.json({ 'error': err });
      } else {
        const detailsByName = mergeDetailsByName(body, req.params.id);
        res.json(detailsByName);
      }
    });
  },
  findTop: function (req, res) {
    const url = 'https://data.sfgov.org/resource/sipz-fjte.json?$where=inspection_score=100';

    request(url, { json: true }, (err, apiResponse, body) => {
      if (err) {
        res.json({ 'error': err });
      } else {
        const bestPlaces = mergeDetailsByName(body, 0).slice(0, 10);

        let count = 0;
        for (const place of bestPlaces) {
          getPhoto(place.name, imageUrl => {
            count++;
            place.photo = imageUrl;
            if (count >= bestPlaces.length) {
              res.json(bestPlaces);
            }
          })
        }

      }
    });
  },
  findPhotoByName: function (req, res) {
    const url = 'https://api.yelp.com/v3/businesses/search?term=' + req.params.name + '&location=' + 'San Francisco';

    request.get(
      {
        url: url,
        'auth': {
          'bearer': 'o5TK22LavqG5H7xgHmlqBQJTli848SG1BwswfnJwHUddsy3eItvlmi2zbs-GB44tBi7KcCHHSah8kCkkE8n-1cdmczRnpzDPD9OAUwwVnTTrX1IbpCIpaVpWVozNWnYx'
        }
      },
      (err, apiResponse, body) => {
        if (err) {
          apiResponse.json({ 'error': err });
        } else {
          res.json(apiResponse.body);
        }
      });
  },
  saveComment: function (req, res) {
    console.log("THIS IS DB!!", db.Facility);

    db.Facility
      .create(req.body)
      .then(dbModel => {
        console.log("THIS IS THE MODEL!!", dbModel);
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  findCommentByFacility: function (req, res) {
    db.Facility
      .find({ 'idFacility': req.params.idFacility })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
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


const photoCache = {};
const getPhoto = (businessName, callback) => {
  const url = 'https://api.yelp.com/v3/businesses/search?term=' + businessName + '&location=' + 'San Francisco';
  if (photoCache[url]) {
    // Already exists in the photo cache
    callback(photoCache[url]);
    console.log('cache hit', photoCache)
    return;
  }

  request.get(
    {
      url: url,
      'auth': {
        'bearer': 'o5TK22LavqG5H7xgHmlqBQJTli848SG1BwswfnJwHUddsy3eItvlmi2zbs-GB44tBi7KcCHHSah8kCkkE8n-1cdmczRnpzDPD9OAUwwVnTTrX1IbpCIpaVpWVozNWnYx'
      }
    },
    (err, apiResponse, body) => {
      if (err) {
        console.log("ERROR OCCURED :( :( :( ", err)
        callback({error: err})
      } else {
        //callback(apiResponse.body);
        const businesses = JSON.parse(apiResponse.body).businesses;

        let img = null;
        if (businesses && businesses.length > 0) {
          img = businesses[0].image_url;
        }
        photoCache[url] = img;
        console.log('getting image back', img) 
        callback(img);
      }
    });
}

const mergeDetailsById = (businesses) => {
  const violationDescription = [];
  let average = 0;
  let totalItems = 0;
  let name;
  let id = 0;
  let address;

  for (let currentBusiness of businesses) {

    name = currentBusiness.business_name;
    address = currentBusiness.business_address + ", " + currentBusiness.business_city + ", " + currentBusiness.business_postal_code;

    if (typeof currentBusiness.inspection_score != 'undefined') {
      average = average + parseInt(currentBusiness.inspection_score);
      totalItems++;
    }
    if (currentBusiness.violation_description != null) {

      let violation = violationDescription.find(vio => vio['violation_description'] === currentBusiness.violation_description);

      if (violation === undefined) {
        id++;
        violationDescription.push({
          violation_description: currentBusiness.violation_description,
          risk_category: currentBusiness.risk_category,
          inspection_id: id
        });
      }
    }
  }

  average = (average / totalItems).toFixed(2);

  const details = {
    name: name,
    address: address,
    average: average,
    violationDescription: violationDescription
  }
  return details;
}

const mergeDetailsByName = (businesses, id) => {
  const temporalFacility = [];
  const facility = [];

  for (let currentBusiness of businesses) {

    if (currentBusiness.business_id !== id) {
      name = currentBusiness.business_name;

      let facilityAddress = temporalFacility.find(vendor => vendor['business_address'] === currentBusiness.business_address);

      if (facilityAddress === undefined) {

        const violation_description = [];
        violation_description.push(currentBusiness.violation_description);

        const inspection_score = [];
        inspection_score.push(currentBusiness.inspection_score);

        temporalFacility.push({
          name: currentBusiness.business_name,
          business_id: currentBusiness.business_id,
          business_address: currentBusiness.business_address,
          business_city: currentBusiness.business_city,
          business_postal_code: currentBusiness.business_postal_code,
          business_state: currentBusiness.business_state,
          violation_description: violation_description,
          inspection_score: inspection_score
        });
      }
      else {
        facilityAddress.violation_description.push(currentBusiness.violation_description);
        facilityAddress.inspection_score.push(currentBusiness.inspection_score);
      }
    }
  }

  for (let iterator = 0; iterator < temporalFacility.length; iterator++) {
    let countItem = 0;
    let average = 0;
    const violation = [];

    for (let averageItem = 0; averageItem < temporalFacility[iterator].inspection_score.length; averageItem++) {
      if (typeof temporalFacility[iterator].inspection_score[averageItem] != 'undefined') {
        countItem++;
        average = average + parseInt(temporalFacility[iterator].inspection_score[averageItem]);
      }
    }
    for (let violationItem = 0; violationItem < temporalFacility[iterator].violation_description.length; violationItem++) {

      let description = temporalFacility[iterator].violation_description[violationItem];

      if (description != null) {

        const exist = violation.includes(description);

        if (exist == false) {
          violation.push(description);
        }
      }
    }

    average = (average / countItem).toFixed(2);

    facility.push({
      id: iterator,
      name: temporalFacility[iterator].name,
      business_id: temporalFacility[iterator].business_id,
      business_address: temporalFacility[iterator].business_address,
      business_city: temporalFacility[iterator].business_city,
      business_postal_code: temporalFacility[iterator].business_postal_code,
      business_state: temporalFacility[iterator].business_state,
      average: average,
      violation_description: violation
    })
  }
  return facility;
}
