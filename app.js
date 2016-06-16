"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var MathController = require('./controllers/MathController.js');
var PuzzleController = require('./controllers/PuzzleController');
var app = express();

app.use(bodyParser.json());

var mathController = new MathController(app);
mathController.init();

var puzzleController = new PuzzleController(app);
puzzleController.init();

//http://expressjs.com/en/4x/api.html#req
// app.post("/add",function(req,res){
//     console.log(req.body);
//     var x = parseFloat(req.body.x);
//     var y = parseFloat(req.body.y);
//     var sum = x+y;
//     res.send("Result = " + sum);
// });
//
// app.get("/",function(req,res){
//     res.send("done");
// });
//
// app.get("/add",function(req,res){
//     var x = parseFloat(req.query.x);
//     var y = parseFloat(req.query.y);
//     var sum = x+y;
//     res.send("Result = " + sum);
// });
//
// app.get("/add/:x/:y",function(req,res){
//     var x = parseFloat(req.params.x);
//     var y = parseFloat(req.params.y);
//     var sum = x+y;
//     res.send("Result = " + sum);
// });



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});