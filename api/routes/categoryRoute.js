const {
  createCategory,
  getCategories,
  findByCat,
} = require("../controllers/categoryController");

const router = require("express").Router();

router.post("/create-category", createCategory);

router.get("/all-categories", getCategories);

router.get("/find-cat/:slug", findByCat);

module.exports = router;
