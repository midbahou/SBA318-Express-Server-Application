const express = require("express");
const { route } = require("./products");
const router = express.Router();

// Sample data
const categories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Furniture" },
  { id: 3, name: "Kitchen" },
];

// GET /categories - Get all categories
router.get("/", (req, res) => {
  res.render("categories", { categories }); // render the categories view
});

// GET /categories/:id - Get a single category by ID
router.get("/:id", (req, res) => {
  const category = categories.find((c) => c.id === parseInt(req.params.id));
  if (!category)
    return res.status(404).json({ message: "Category not found!" });
  res.json(category);
});

// POST /categories - Add a new category
router.post("/:id", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(404).json({ message: "Please provide a name" });
  }
  const newCategory = { id: categories.length + 1, name };
  categories.push(newCategory);
  res.status(201).json(newCategory);
});

// DELETE /categories/:id - Delete a category by ID
router.delete("/:id", (req, res) => {
  const categoryIndex = categories.findIndex(
    (c) => c.id === parseInt(req.params.id)
  );
  if (categoryIndex === -1)
    return res.status(404).json({ message: "Category not found!" });
  res.json({ message: "Category deleted" });
});

module.exports = router;
