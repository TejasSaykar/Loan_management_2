const expenseModel = require("../models/expenseModel");

// Create Expense
exports.createExpense = async (req, res) => {
  const { title, description, amount } = req.body;
  try {
    const expense = await new expenseModel({
      title,
      description,
      amount,
    }).save();
    return res.status(200).json({
      success: true,
      message: "Expense created",
      expense,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while creating the expense",
      error,
    });
  }
};

// Get all Expenses
exports.getExpense = async (req, res) => {
  try {
    const expenses = await expenseModel.find({}).populate("title");
    return res.status(200).json({
      expensesCount: expenses.length,
      success: true,
      message: "Getting all expenses",
      expenses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting the Expenses",
      error,
    });
  }
};
