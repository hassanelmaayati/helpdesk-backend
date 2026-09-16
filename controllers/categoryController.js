const Category = require("../models/Category");

const index = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    if (req.user.role !== "it-staff") {
      return res.status(403).json({ error: "Access denied" });
    }
    const newCategory = await Category.create({ name: req.body.name });
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    if (req.user.role !== "it-staff") {
      return res.status(403).json({ error: "Access denied" });
    }
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { returnDocument: "after", runValidators: true },
    );
    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    if (req.user.role !== "it-staff") {
      return res.status(403).json({ error: "Access denied" });
    }
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(deletedCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  index,
  create,
  update,
  deleteCategory,
};
