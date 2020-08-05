var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	User = require("./models/user"),
	Course = require("./models/course");
const mongoose = require('mongoose');

//requiring routes
var courseRoutes = require("./routes/courses");

mongoose.connect('mongodb://localhost:27017/course_d', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));
	


app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

app.get("/", function(req,res){
	res.render("home");
});

app.use("/courses", courseRoutes);


app.listen(3000, function(){
	console.log("server is listening!");
})