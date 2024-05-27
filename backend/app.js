const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/error");

// IMPORT ROUTES
const routes = require("./routes");

// CONNECT DATABASE
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

// MIDDLEWARE
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

// ROUTES MIDDLEWARE
app.use("/", routes);

// ERROR HANDLER
app.use(errorHandler);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
