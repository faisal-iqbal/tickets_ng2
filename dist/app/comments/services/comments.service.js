"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * @author: Faisal Iqbal <fiqbal.qureshi@outlook.com>
 * @created_on: 09/10/2016
 */
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var session_1 = require("../../common/session");
var app_settings_1 = require("../../common/app.settings");
var Rx_1 = require('rxjs/Rx');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var CommentsService = (function () {
    // Resolve HTTP using the constructor
    function CommentsService(http) {
        this.http = http;
        // private instance variable to hold base url
        this.commentsUrl = app_settings_1.AppSettings.API_ENDPOINT + '/comments';
        console.log('in comment service');
    }
    // Fetch all existing comments
    CommentsService.prototype.getComments = function (ticket_id) {
        // ...using get request
        if (ticket_id === void 0) { ticket_id = ''; }
        var url = this.commentsUrl + ".json?auth_token=" + session_1.Session.auth.user.auth_token;
        if (ticket_id !== '') {
            url = url + "&ticket_id=" + ticket_id;
        }
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw('Server error'); });
    };
    // Fetch specific comment
    CommentsService.prototype.getComment = function (id) {
        // ...using get request
        return this.http.get(this.commentsUrl + "/" + id + ".json?auth_token=" + session_1.Session.auth.user.auth_token)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw('Server error'); });
    };
    // Add a new comment
    CommentsService.prototype.addComment = function (body) {
        var bodyString = JSON.stringify(body); // Stringify payload
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(this.commentsUrl + ".json?auth_token=" + session_1.Session.auth.user.auth_token, body, options) // ...using post request
            .map(function (res) { return res.json(); }) // ...and calling .json() on the response to return data
            .catch(function (error) { return Rx_1.Observable.throw('Server error'); }); //...errors if any
    };
    // Update a comment
    CommentsService.prototype.updateComment = function (body) {
        var bodyString = JSON.stringify(body); // Stringify payload
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        return this.http.put(this.commentsUrl + "/" + body['id'] + ".json?auth_token=" + session_1.Session.auth.user.auth_token, body, options) // ...using put request
            .map(function (res) { return res.json(); }) // ...and calling .json() on the response to return data
            .catch(function (error) { return Rx_1.Observable.throw('Server error'); }); //...errors if any
    };
    // Delete a comment
    CommentsService.prototype.removeComment = function (id) {
        return this.http.delete(this.commentsUrl + "/" + id + ".json?auth_token=" + session_1.Session.auth.user.auth_token) // ...using put request
            .map(function (res) { return res.json(); }) // ...and calling .json() on the response to return data
            .catch(function (error) { return Rx_1.Observable.throw('Server error'); }); //...errors if any
    };
    CommentsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CommentsService);
    return CommentsService;
}());
exports.CommentsService = CommentsService;
