require('dotenv').config(); // Load environment variables
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// MongoDB URI from environment variables
const dburi = process.env.MONGODB_URI;
if (!dburi) {
  console.error("Error: MONGODB_URI is not set in the environment variables");
  process.exit(1); // Exit if MONGODB_URI is not set
}

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from assets and Media directories
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/Media', express.static(path.join(__dirname, 'Media')));

// Connect to MongoDB
mongoose.connect(dburi, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to Database :: MongoDB");
}).catch(err => {
  console.error("Error connecting to MongoDB:", err);
  process.exit(1); // Exit if database connection fails
});

// Use routes
app.use("/", require("./routes"));

// Start the server
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
