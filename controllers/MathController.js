"use strict";

var MathController = function(app){
  this.app = app;
  this.controllerId = "math";
};

MathController.prototype.init = function() {
  this.app.get("/"+this.controllerId+"/add",this.add);
};

MathController.prototype.add = function(req,res){
    var x = parseFloat(req.query.x);
    var y = parseFloat(req.query.y);
    var sum = x+y;
    var result = {
      result:x+y,
      operation:"add"
    }
    res.json(result);
};

module.exports = MathController;
