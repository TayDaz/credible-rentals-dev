const express = require("express");
// const passport = require("passport");
// const jwt = require("jsonwebtoken");

const router = express.Router();
const apiRoute = require("./api");

router.use("/api", apiRoute);

module.exports = router;
