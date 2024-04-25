const categoryModel = require("../models/categoryModel");
const expenseModel = require("../models/expenseModel");

// Create Category
exports.createCategory = async (req, res) => {
  const title = req.body.title;
  try {
    const newCat = await new categoryModel({ title }).save();
    return res.status(201).json({
      success: true,
      message: "Category created",
      newCat,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while creating the category",
      error,
    });
  }
};

// Get all Categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    return res.status(200).json({
      success: false,
      message: "Getting all categories",
      categories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting the categories",
      error,
    });
  }
};

// Find by Category Title
exports.findByCat = async (req, res) => {
  const slug = req.params.slug;
  try {
    const category = await categoryModel.find({
      $or: [{ title: { $regex: slug, $options: "i" } }],
    });

    const expense = await expenseModel
      .find({ title: category })
      .populate("title");
    return res.status(200).json({
      success: true,
      message: "Expense getting",
      expense,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while finding by category",
      error,
    });
  }
};
