const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const msgSchema = new Schema(
	{
		text: {
			type: String,
			required: true,
		},
		user: {
			type: String,
			required: true,
		},
		added: {
			type: Date,
			required: true,
		},
	},
	{ timestamps: true }
);

const Msg = mongoose.model("Msg", msgSchema);

module.exports = Msg;
