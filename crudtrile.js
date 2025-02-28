const express = require("express");
const app = express();
const port = 3000;
let dataa = require("./data.json");

// Middleware to parse JSON data in the request body
app.use(express.json());

// GET: Fetch product by ID
app.get("/:id", (req, res) => {
  const ids = req.params.id;
  const filtered = dataa.products.filter((val) => val.id == ids);
  if (filtered.length > 0) {
    res.send(filtered);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

// POST: Add a new product
app.post("/products", (req, res) => {
  const newProduct = req.body;

  // Simple validation to check if the required fields are present
  if (!newProduct.title || !newProduct.price || !newProduct.description) {
    return res.status(400).send({ message: "Missing required fields" });
  }

  // Assign a new ID based on the current highest ID in the products array
  const newId = Math.max(...dataa.products.map((product) => product.id)) + 1;
  newProduct.id = newId;

  // Add the new product to the data array
  dataa.products.push(newProduct);

  // Respond with the newly created product
  res.status(201).send(newProduct);
});

// PUT: Update an existing product (replace entire object)
app.put("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;

  // Find the product to update
  let product = dataa.products.find((product) => product.id === productId);

  if (!product) {
    return res.status(404).send({ message: "Product not found" });
  }

  // Update the product fields
  product.title = updatedProduct.title || product.title;
  product.price = updatedProduct.price || product.price;
  product.description = updatedProduct.description || product.description;
  product.category = updatedProduct.category || product.category;
  product.image = updatedProduct.image || product.image;
  product.rating = updatedProduct.rating || product.rating;

  // Send the updated product
  res.send(product);
});

// PATCH: Update some fields of an existing product (partial update)
app.patch("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedFields = req.body;

  // Find the product to update
  let product = dataa.products.find((product) => product.id === productId);

  if (!product) {
    return res.status(404).send({ message: "Product not found" });
  }

  // Update only the provided fields
  Object.keys(updatedFields).forEach((key) => {
    if (product[key] !== undefined) {
      product[key] = updatedFields[key];
    }
  });

  // Send the updated product
  res.send(product);
});

// DELETE: Remove a product by ID
app.delete("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);

  // Find the index of the product to delete
  const productIndex = dataa.products.findIndex((product) => product.id === productId);

  if (productIndex === -1) {
    return res.status(404).send({ message: "Product not found" });
  }

  // Remove the product from the array
  const deletedProduct = dataa.products.splice(productIndex, 1);

  // Send confirmation of deletion
  res.send({ message: "Product deleted", product: deletedProduct[0] });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
