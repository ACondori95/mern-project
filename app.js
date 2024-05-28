const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/error");

// IMPORT ROUTES
const routes = require("./routes");

// CONNECT DATABASE
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

// MIDDLEWARES
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// ROUTES MIDDLEWARE
app.use("/", routes);

// ERROR MIDDLEWARE
app.use(errorHandler);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
