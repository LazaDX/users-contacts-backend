const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");

connectDB();

const app = express();

const port = process.env.PORT || 5001;

app.use(express.json()); // parse the data on the body to json

app.use("/api/contacts", require("./routes/contactRoute"));
app.use("/api/users", require("./routes/userRoute"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`The server run on port ${port}`);
});
