
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const facilitySchema = new Schema({
    idFacility: {type: String, required:true },
    comment: { type: String, required: true },
});

const Facility = mongoose.model("Facility", facilitySchema);

module.exports = Facility;