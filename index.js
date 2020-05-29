const mongoose = require("mongoose")

// Map global promise - get rid of warning
mongoose.Promise = global.Promise

// Connect to db
const db = mongoose.connect("mongodb://localhost:27017/customer-cli", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

// Import model
const Customer = require("./models/customer")

// Add customer
const addCustomer = customer => {
	Customer.create(customer)
		.then(customer => {
			console.info("New customer added")
			mongoose.disconnect()
		})
		.catch(err => {
			console.log("Error adding a customer")
			console.log(err)
			mongoose.disconnect()
		})
}

// Find customer
const findCustomer = name => {
	// Make cutomer name case insensitive
	const search = new RegExp(name, "i")
	Customer.find({ $or: [{ firstname: search }, { lastname: search }] })
		.then(customer => {
			console.info(customer)
			console.info(`${customer.length} names matched`)
			mongoose.disconnect()
		})
		.catch(err => {
			console.log("Error Finding a customer")
			console.log(err)
			mongoose.disconnect()
		})
}

// Update customer
const updateCustomer = (_id, customer) => {
	Customer.updateOne({ _id }, customer)
		.then(customer => {
			console.info("Customer updated successfully")
			mongoose.disconnect()
		})
		.catch(err => {
			console.log("Error updating customer")
			console.log(err)
			mongoose.disconnect()
		})
}

// Remove customer
const removeCustomer = _id => {
	Customer.deleteOne({ _id })
		.then(customer => {
			console.info("Customer removed successfully")
			mongoose.disconnect()
		})
		.catch(err => {
			console.log("Error removing customer")
			console.log(err)
			mongoose.disconnect()
		})
}

// Get all customers
const getAllCustomers = () => {
	Customer.find()
		.then(customers => {
			console.info(customers)
			console.info(`\x1b[36m ${customers.length} customers found`)
			mongoose.disconnect()
		})
		.catch(err => {
			console.log(`Error getting all customers`)
			console.log(err)
			mongoose.disconnect()
		})
}

// Export methods
module.exports = {
	addCustomer,
	findCustomer,
	updateCustomer,
	removeCustomer,
	getAllCustomers,
}
