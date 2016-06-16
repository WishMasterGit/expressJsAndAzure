/**
 * Created by WMTS on 6/16/2016.
 */
"use strict";
var azure = require('azure-storage');
var uuid = require('node-uuid');
var nconf = require('nconf');
var Q = require("q");
var entityGen = azure.TableUtilities.entityGenerator;
var AzureService = function () {
    this.state = "starting";
    this.entityGen = entityGen;
};

AzureService.prototype.init = function (tableName) {
    nconf.env()
        .file({ file: 'config.json', search: true });
    this.tableName = tableName;
    this.accountName = nconf.get("storageName");
    this.accountKey = nconf.get("storageKey");
    this.service = azure.createTableService(this.accountName, this.accountKey);
    return this.createTable();
};

AzureService.prototype.createTable = function(){
    var deffered = Q.defer();
    this.service.createTableIfNotExists(this.tableName, function(error) {
        if(error) {
            deffered.reject(error);
        }
        else {
            deffered.resolve();
            this.state = "ready";
            this.log(this.state);
        }

    }.bind(this));
    return deffered.promise;
};

AzureService.prototype.get = function (partitionKey,key) {
    var deffered = Q.defer();
    this.service.retrieveEntity(this.tableName, partitionKey, key, function entityInserted(error,item) {
        if(error){
            deffered.reject(error);
        }
        else {
            deffered.resolve(item);
        }
    });
    return deffered.promise;
};

AzureService.prototype.insert = function (item) {
    var deffered = Q.defer();
    this.service.insertEntity(this.tableName, item, function entityInserted(error) {
        if(error){
            deffered.reject();
        }
        else {
            deffered.resolve();
        }
    });
    return deffered.promise;
};

AzureService.prototype.update = function (item) {
    var deffered = Q.defer();
    this.service.replaceEntity(this.tableName, item, function entityInserted(error) {
        if(error){
            deffered.reject();
        }
        else {
            deffered.resolve();
        }
    });
    return deffered.promise;
};
AzureService.prototype.deleteItem = function (partitionKey,key) {
    return this.get(partitionKey,key).then(this.delete.bind(this));
};

AzureService.prototype.delete = function (item) {
    var deffered = Q.defer();
    this.service.deleteEntity(this.tableName, item, function(error) {
        if(error){
            deffered.reject();
        }
        else {
            deffered.resolve();
        }
    });
    return deffered.promise;
};

AzureService.prototype.log = function (state) {
    console.log("Azure service state:" + state);
};
module.exports = AzureService;