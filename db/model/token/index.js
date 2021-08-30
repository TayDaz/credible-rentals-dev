const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TokenSchema = new Schema({
	accessToken: {
		type: String,
	},
	refreshToken: {
		type: String,
	},
	profile: {
		type: Object,
	},
});

// UserSchema.pre("save", async function (next) {
// 	const user = this;
// 	const hash = await bcrypt.hash(this.password, 10);

// 	this.password = hash;
// 	next();
// });

// UserSchema.methods.isValidPassword = async function (password) {
// 	const user = this;
// 	const compare = await bcrypt.compare(password, user.password);

// 	return compare;
// };

const TokenModel = mongoose.model("token", TokenSchema);

module.exports = TokenModel;
