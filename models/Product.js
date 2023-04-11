const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	description: String,
	category: {
		type: String,
		enum: ["electronics", "books", "home", "clothing"],
		required: true,
	},
	dateAdded: {
		type: Date,
		default: Date.now,
	},
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
