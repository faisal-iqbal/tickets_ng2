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
var LoginService = (function () {
    // Resolve HTTP using the constructor
    function LoginService(http) {
        this.http = http;
        // private instance variable to hold base url
        this.usersUrl = app_settings_1.AppSettings.API_ENDPOINT + '/api/users';
        console.log('in user service');
    }
    // sign in a new user
    LoginService.prototype.signIn = function (email, password) {
        var body = { email: email, password: password };
        var bodyString = JSON.stringify(body); // Stringify payload
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(this.usersUrl + "/sign_in.json", body, options) // ...using post request
            .map(function (res) { return res.json(); }) // ...and calling .json() on the response to return data
            .catch(function (error) { return Rx_1.Observable.throw('Server error'); }); //...errors if any
    };
    // sign out a user
    LoginService.prototype.signOut = function () {
        return this.http.delete(this.usersUrl + "/sign_out.json?auth_token=" + session_1.Session.auth.user.auth_token)
            .map(function (res) { return res.json(); }) // ...and calling .json() on the response to return data
            .catch(function (error) { return Rx_1.Observable.throw('Server error'); }); //...errors if any
    };
    LoginService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
