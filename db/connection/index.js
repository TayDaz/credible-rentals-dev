const mongoose = require("mongoose");
const chalk = require("chalk");

const connectMongoDb = async () => {
	const DB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING_DEV;

	try {
		const res = await mongoose.connect(DB_CONNECTION_STRING, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log(chalk.black.bgGreen("MongoDB Connected"));

		return true;
	} catch (err) {
		console.error(err.message);
	}
};

module.exports = connectMongoDb;
