const { createExpense, getExpense } = require("../controllers/expenseController");

const router = require("express").Router();

router.post("/create-expense", createExpense);

router.get("/get-expenses", getExpense);

module.exports = router;
