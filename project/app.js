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
app.get("/login",function(req,res){
	res.render("login");
});
//Registration Portal
app.get("/register",function(req,res){
	res.render("register");
});
app.post("/login",function(req,res){
	email = req.body.email1;
	pass = req.body.password;
	if(email==="rahul@iitg.ac.in" && pass==="rahul123"){
		res.send("Login Successfully");
	}
	else{
		res.render("login");
	}
});

app.post("/register",function(req,res){
	name = req.body.firstname;
	email = req.body.email1;
	password = req.body.password;
	confPassword = req.body.confirmPassword;
	department = req.body.department;
	if(name==="rahul" && email==="rahul@iitg.ac.in"){
		if(password === confPassword){
			res.send("You have been successfully registered. Go to login Page.");
		}
		else{
			res.render("register");
		}
	}
	else{
		res.render("register");
	}
})




app.use("/courses", courseRoutes);


app.listen(3000, function(){
	console.log("server is listening!");
})