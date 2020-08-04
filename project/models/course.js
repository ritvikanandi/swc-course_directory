var mongoose = require("mongoose");

var courseSchema = new mongoose.Schema({
	title: String,
	credits: String,             //(L-T-P-C)
	contents: [
		{
			type: String
		}
	],
	description: String,
	instructor:
		[
			{
		        id:{
		        	type:  mongoose.Schema.Types.ObjectId,
		        	ref: "User"
		        },
		         username: String
		    }
		],
	references: [
		{
			type: String
		}
	]
});

module.exports = mongoose.model("Course", courseSchema);