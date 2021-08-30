const express = require("express");
const router = express.Router();
const { getFileStream } = require("../../../utils/S3");

router.get("/:key", (req, res) => {
	//this controller will get the images from the S3 bucket through S3 utils and
	//send it back to the user
	const key = req.params.key;

	const readStream = getFileStream(key);

	readStream.pipe(res);
});

module.exports = router;
