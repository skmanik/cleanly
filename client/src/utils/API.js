import axios from "axios";

// Defining methods for the FacilitiesController
export default {
  findAll: function(req, res) {
    return axios.get("/api/facilities");
  },
  findById: function(id) {   
    return axios.get("/api/facilities/" + id);
  },
  findByQuery: function(query) {    
    return axios.get("/api/facilities?q=" + encodeURI(query));
  },
  findByName: function(name, id) {   
    return axios.get("/api/facilities/name/" + name + "/id/" + id);
  },
  findPhotoByName: function(name) {   
    return axios.get("/api/facilities/photo/" + name);
  },
  saveComment: function(comment) {
    return axios.post("/api/facilities", comment);
  },
  findCommentByIdFacility: function(idFacility) {
    return axios.get("/api/facilities/comment/" + idFacility);
   
  }
};