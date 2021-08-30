const express = require("express");
const passport = require("passport");
const morgan = require("morgan");
const path = require("path");
const chalk = require("chalk");
const cors = require("cors");
const routes = require("./routes");
// const secureRoute = require("./routes/secureRoutes");
const ConnectMongoDb = require("./db/connection");
const session = require("express-session");
const apiRoute = require("./routes/api");

require("dotenv").config();
require("./passport/");

const app = express();

//configuring morgan
//dev -> :method :url :status :response-time ms - :res[content-length]
//combined -> :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"
app.use(morgan("dev"));
app.use(cors());
//to parse the json in request body
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
const sess = {
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {},
};

app.use(session(sess));

const PORT = process.env.PORT || 5000;

// app.use("/", routes);
app.use("/api", apiRoute);
// app.use("/user", passport.authenticate("jwt", { session: false }), secureRoute);

// Set static folder
app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

ConnectMongoDb().then(() => {
  app.listen(PORT, () => {
    console.log(chalk.black.bgGreen(`Server running on PORT = ${PORT}`));
  });
});
