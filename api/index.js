const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const userRoute = require("./routes/userRoute");
const EMIRoute = require("./routes/EMIRoute");
const authRoute = require("./routes/authRoute");
const categoryRoute = require("./routes/categoryRoute");
const expenseRoute = require("./routes/expenseRoute");
const cronJob = require("./cronJob");

const app = express();

// Configuration
dotenv.config();
connectDb();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/emi", EMIRoute);
app.use("/api/category", categoryRoute);
app.use("/api/expense", expenseRoute);

app.get("/", (req, res) => {
  res.send("Hello from server");
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`SERVER IS RUNNING ON http://localhost:${port}`);
});
