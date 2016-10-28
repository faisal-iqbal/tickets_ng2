/**
 * @author: Faisal Iqbal <fiqbal.qureshi@outlook.com>
 * @created_on: 09/10/2016
 */
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
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
var session_1 = require("../../common/session");
var app_settings_1 = require("../../common/app.settings");
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var TicketService = (function () {
    // Resolve HTTP using the constructor
    function TicketService(http) {
        this.http = http;
        // private instance variable to hold base url
        this.ticketsUrl = app_settings_1.AppSettings.API_ENDPOINT + '/tickets';
        console.log('in ticket service');
    }
    // Fetch all existing tickets
    TicketService.prototype.getTickets = function () {
        // ...using get request
        return this.http.get(this.ticketsUrl + ".json?auth_token=" + session_1.Session.auth.user.auth_token)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw('Server error'); });
    };
    // Fetch specific ticket
    TicketService.prototype.getTicket = function (id) {
        // ...using get request
        return this.http.get(this.ticketsUrl + "/" + id + ".json?auth_token=" + session_1.Session.auth.user.auth_token)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw('Server error'); });
    };
    TicketService.prototype.getTicketsPDFURL = function () {
        return this.ticketsUrl + ".pdf?closed_in_last_month=true&auth_token=" + session_1.Session.auth.user.auth_token;
    };
    // Add a new ticket
    TicketService.prototype.addTicket = function (body) {
        var bodyString = JSON.stringify(body); // Stringify payload
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(this.ticketsUrl + ".json?auth_token=" + session_1.Session.auth.user.auth_token, body, options) // ...using post request
            .map(function (res) { return res.json(); }) // ...and calling .json() on the response to return data
            .catch(function (error) { return Rx_1.Observable.throw('Server error'); }); //...errors if any
    };
    // Update a ticket
    TicketService.prototype.updateTicket = function (body) {
        var bodyString = JSON.stringify(body); // Stringify payload
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        return this.http.put(this.ticketsUrl + "/" + body['id'] + ".json?auth_token=" + session_1.Session.auth.user.auth_token, body, options) // ...using put request
            .map(function (res) { return res.json(); }) // ...and calling .json() on the response to return data
            .catch(function (error) { return Rx_1.Observable.throw('Server error'); }); //...errors if any
    };
    // Close a ticket
    TicketService.prototype.closeTicket = function (id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(this.ticketsUrl + "/" + id + "/mark_close.json?auth_token=" + session_1.Session.auth.user.auth_token, null, options) // ...using put request
            .map(function (res) { return res.json(); }) // ...and calling .json() on the response to return data
            .catch(function (error) { return Rx_1.Observable.throw('Server error'); }); //...errors if any
    };
    // Reopen a ticket
    TicketService.prototype.reopenTicket = function (id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(this.ticketsUrl + "/" + id + "/reopen.json?auth_token=" + session_1.Session.auth.user.auth_token, null, options) // ...using put request
            .map(function (res) { return res.json(); }) // ...and calling .json() on the response to return data
            .catch(function (error) { return Rx_1.Observable.throw('Server error'); }); //...errors if any
    };
    // Delete a ticket
    TicketService.prototype.removeTicket = function (id) {
        return this.http.delete(this.ticketsUrl + "/" + id + ".json?auth_token=" + session_1.Session.auth.user.auth_token) // ...using put request
            .map(function (res) { return res.json(); }) // ...and calling .json() on the response to return data
            .catch(function (error) { return Rx_1.Observable.throw('Server error'); }); //...errors if any
    };
    TicketService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], TicketService);
    return TicketService;
}());
exports.TicketService = TicketService;
