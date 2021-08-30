const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
	const user = { _id: "60a43dc3e022092048bb0e08" };

	const body = { _id: user._id };
	const token = jwt.sign({ user: body }, "TOP_SECRET");

	return res.json({ token });
});

module.exports = router;
