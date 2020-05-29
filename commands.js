#!/usr/bin/env node

const program = require("commander")
const { prompt } = require("inquirer")

const {
	addCustomer,
	findCustomer,
	updateCustomer,
	removeCustomer,
	getAllCustomers,
} = require("./index")

// Add version and description to app
program.version("1.0.0").description("A client management system")

// Questions asked when trying to add a new customer
const questions = [
	{
		type: "input",
		name: "firstname",
		message: "Customer's First name",
	},
	{
		type: "input",
		name: "lastname",
		message: "Customer's Last name",
	},
	{
		type: "input",
		name: "phone",
		message: "Customer's Phone number",
	},
	{
		type: "input",
		name: "email",
		message: "Customer's Email Address",
	},
]

// Add a new customer
// program
// 	.command("add <firstname> <lastname> <phone> <email>")
// 	.alias("a")
// 	.description("Add a customer")
// 	.action((firstname, lastname, phone, email) => {
// 		addCustomer({ firstname, lastname, phone, email })
// 	})

// Add a new customer using prompt in the terminal
program
	.command("add")
	.alias("a")
	.description("Add a customer")
	.action(() => {
		prompt(questions).then(answers => addCustomer(answers))
	})

// Find an existing customer
program
	.command("find <name>")
	.alias("f")
	.description("Find a customer")
	.action(name => {
		findCustomer(name)
	})

// Update an existing customer using prompt in the terminal
program
	.command("update <_id>")
	.alias("u")
	.description("Update a customer")
	.action(_id => {
		prompt(questions).then(answers => updateCustomer(_id, answers))
	})

// Remove an existing customer
program
	.command("remove <_id>")
	.alias("rm")
	.description("Remove a customer")
	.action(_id => removeCustomer(_id))

// List all available customers
program
	.command("list")
	.alias("l")
	.description("List all customers")
	.action(() => getAllCustomers())

program.parse(process.argv)
