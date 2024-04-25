const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const userRoute = require("./routes/userRoute");
const EMIRoute = require("./routes/EMIRoute");
const authRoute = require("./routes/authRoute");
const categoryRoute = require("./routes/categoryRoute");
const fs = require("fs")
const https = require("https");
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

const PORT = 8182;
const appInProduction = true;
if (!appInProduction) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} ✅`);
  });
} else {
  const httpsOptions = {
    key: fs.readFileSync("./config/https/private.key"),
    cert: fs.readFileSync("./config/https/certificate.crt"),
    ca: [fs.readFileSync("./config/https/ca_bundle.crt")],
  };

  https.createServer(httpsOptions, app).listen(PORT, (error) => {
    if (error) {
      console.error("Error starting HTTPS server:", error);
    } else {
      console.log(
        `Server running on https://154-56-63-113.cprapid.com:${PORT} ✅`
      );
    }
  });
}