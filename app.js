var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var expressValidator = require("express-validator");
var app = express();
var mongojs = require("mongojs");
var db = mongojs('mycustomers', ['users']);
var ObjectId = mongojs.ObjectId;

// var logger = function(req, res, next) {
//   console.log("logging");
//   next();
// }
// app.use(logger);
//view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Static Path
app.use(express.static(path.join(__dirname, "public")));


app.get("/root", (req, res) => {
  db.users.find(function(err, docs) {
    console.log(docs);
    console.log("Get Request made");
    res.render("index", {title: "Customers",
    people: docs});
  });

});

app.post("/users/add", (req, res) => {
  var newUser = {
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email
  }
  db.users.insert(newUser, function(err, result) {
    if (err) {
      console.error(err);
    }
    res.redirect("/root")
  });
  console.dir(newUser);
});
//res.json, res.send

app.delete("/users/delete/:id", (req, res) => {
    console.log(req.params.id);
    db.users.remove({_id: ObjectId(req.params.id)});
    res.redirect("/root");
});

app.listen(3000, function() {
  console.log("server started on port 3000");
});
