/**
 * Created by WMTS on 6/16/2016.
 */
"use strict";
var AzureService = require('../services/AzureService');
var PuzzleController = function (app) {
  this.app = app;
  this.controllerId = "puzzle";
};

PuzzleController.prototype.init = function () {
    this.puzzleDataService = new AzureService();
    this.puzzleDataService.init("puzzleData");
    this.partitionKey = "global";
    this.conv = this.puzzleDataService.entityGen;
    this.app.get("/"+this.controllerId+"/get",this.get.bind(this));
    this.app.post("/"+this.controllerId+"/create",this.create.bind(this));
    this.app.post("/"+this.controllerId+"/update",this.update.bind(this));
    this.app.get("/"+this.controllerId+"/delete",this.delete.bind(this));
};

PuzzleController.prototype.get = function (req,res) {
    var key = req.query.key;
    this.puzzleDataService.get(this.partitionKey,key).then(function (item) {
        res.json(this.jsonFromEntity(item));
    }.bind(this)).fail(function (error) {
        res.send(error);
    })
};

PuzzleController.prototype.create = function(req,res){
    var item = this.entityFromJson(req.body);
    this.puzzleDataService.insert(item).then(function () {
        res.json(item);
    }).fail(function (error) {
        res.send("Error");
    })
    
};

PuzzleController.prototype.update = function (req,res) {
    var item = this.entityFromJson(req.body);
    this.puzzleDataService.update(item).then(function () {
        res.json(item);
    }).fail(function (error) {
        res.send("Error");
    })
};

PuzzleController.prototype.delete = function (req,res) {
    var key = req.query.key;
    this.puzzleDataService.deleteItem(this.partitionKey,key).then(function () {
        res.send("done");
    }.bind(this)).fail(function (error) {
        res.send(error);
    })
};

PuzzleController.prototype.entityFromJson = function (item) {
    var result = {};
    result.PartitionKey = this.conv.String(this.partitionKey);
    result.RowKey = this.conv.String(item.key);
    result.key = this.conv.String(item.key);
    result.data = this.conv.String(item.data);
    return result;
};
PuzzleController.prototype.jsonFromEntity = function (entity) {
    var result = {};
    result.key = entity.key._;
    result.data = entity.data._;
    return result;
};
module.exports = PuzzleController;