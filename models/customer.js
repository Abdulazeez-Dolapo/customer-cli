const mongoose = require("mongoose")

// Customer Schema
const customerSchema = mongoose.Schema({
	firstname: { type: String },
	lastname: { type: String },
	phone: { type: String },
	email: { type: String },
})

// Define and export model
module.exports = mongoose.model("Customer", customerSchema)
