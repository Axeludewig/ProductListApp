const express = require("express");
const app = express();

const mongoose = require("mongoose");

mongoose
	.connect(
		"mongodb+srv://axelramirezludewig:0fz0gm0gpNaJyek6@cluster0.iqjsymq.mongodb.net/?retryWrites=true&w=majority",
		{ useNewUrlParser: true }
	)
	.then(() => {
		console.log("Connected to MongoDB Atlas");
	})
	.catch((error) => {
		console.error("Error connecting to MongoDB Atlas: ", error);
	});

const Product = require("./models/Product.js");

app.use(express.json());
app.use(express.static("public"));

app.post("/products", async (req, res) => {
	const newProduct = new Product({
		name: req.body.name,
		price: req.body.price,
		description: req.body.description,
		category: req.body.category,
	});

	try {
		const savedProduct = await newProduct.save();
		res.status(201).json(savedProduct);
		console.log("New Item Created!");
		console.log(savedProduct);
	} catch (err) {
		console.error("Error creating product:", err);
		res.status(500).json({ error: "Could not create product" });
	}
});

app.get("/products", async (req, res) => {
	try {
		const products = await Product.find();
		const reversed_products = products.reverse();
		res.json(reversed_products);
	} catch (error) {
		console.error("Error getting products:", error);
		res.status(500).json({ error: "Could not get products" });
	}
});

app.get("/", (req, res) => {
	res.sendFile("index.html");
});

app.listen(3000, () => {
	console.log("Example app listening on port 3000!");
});
