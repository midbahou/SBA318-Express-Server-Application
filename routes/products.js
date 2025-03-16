const { json } = require("body-parser");
const express = require("express");
const router = express.Router();

// sample Data

let products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Phone", price: 800 },
  { id: 3, name: "Tablet", price: 600 },
];

// GET /products - Get all products (with optional filtering by max price)
router.get("/", (req, res) => {
  const { maxPrice } = req.query; // extract query parameter for filtering
  let filteredProducts = [...products]; // copy the products array
  if (maxPrice) {
    filteredProducts = filteredProducts.filter(
      (p) => p.price <= parseFloat(maxPrice)
    ); // filter by price
  }

  // if (req.headers.accept && req.headers.accept.includes('application/json')) {
  //     return res.json(filteredProducts); // send json response
  // }
  res.render("products", { products: filteredProducts }); // render the products view
  // res.json(filteredProducts)
});

router.get("/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id)); // find product by ID
  if (!product) return res.status(404).json({ message: "Product Not Found!" });
  res.json(product);
});

// POST method: add a new product
router.post("/", (req, res) => {
  const { name, price } = req.body; // extract data from the request body

  if (!name || !price) {
    return res.status(400).json({ message: "Please provide name and price" });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price: parseFloat(price),
  }; // create a new product
  products.push(newProduct);
  res.status(201).json(newProduct); // return the new product as json
});

// PATCH /products/:id - Partially update the product
router.patch("/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: "Product Not Found!" });

  const { name, price } = req.body;

  // update the field provided in the request
  if (name) product.name = name;
  if (price) product.price = price;

  res.json(product);
});

// DELETE /products/:id - Delete a product by ID
router.delete('/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id)); // Find product index
    if (productIndex === -1) return res.status(404).json({ message: 'Product not found' }); // Return 404 if not found
    products.splice(productIndex, 1); // Remove the product from the array
    res.json({ message: 'Product deleted' }); // Return a success message
});

module.exports = router;



// router.delete("/:id", (req, res, next) => {
//   const product = products.find((p, i) => {
//     if (p.id === req.params.id) {
//       products.splice(i, 1);
//       return true;
//     }
//     if (product) res.json(product);
//     else next();
//   });
// });