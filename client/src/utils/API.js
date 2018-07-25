import axios from "axios";

// Defining methods for the FacilitiesController
module.exports = {
  findAll: function(req, res) {
    return axios.get("/api/facilities");
  },
  findById: function(req, res) {
   
  },
  create: function(req, res) {
    
  },
  update: function(req, res) {
   
  },
  remove: function(req, res) {
   
  }
};