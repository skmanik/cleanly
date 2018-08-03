import axios from "axios";

// Defining methods for the FacilitiesController
export default {
  findAll: function(req, res) {
    return axios.get("/api/facilities");
  },
  findById: function(id) {
    console.log("API", id);    
    return axios.get("/api/facilities/" + id);
  },
  findByQuery: function(query) {    
    return axios.get("/api/facilities?q=" + encodeURI(query));
  },
  findByName: function(name) {   
    console.log(name); 
    return axios.get("/api/facilities/name/" + name);
  },
  create: function(req, res) {
    
  },
  update: function(req, res) {
   
  },
  remove: function(req, res) {
   
  }
};