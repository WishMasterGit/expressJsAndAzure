"use strict";
var apicache = require('apicache').options({ debug: true }).middleware;
var MathController = function(app){
  this.app = app;
  this.controllerId = "math";
};

MathController.prototype.init = function() {
  this.app.get("/"+this.controllerId+"/add",apicache('5 minutes'),this.add);
};

MathController.prototype.add = function(req,res){
    res.setHeader('Cache-Control', 'public, max-age=' + (10000));
    var x = parseFloat(req.query.x);
    var y = parseFloat(req.query.y);
    var sum = x+y;
    var result = {
      result:x+y,
      operation:"add"
    };
    res.json(result);
};

module.exports = MathController;
