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
var router_1 = require('@angular/router');
var session_1 = require('../common/session');
var tickets_service_1 = require('./services/tickets.service');
var users_service_1 = require("../users/services/users.service");
var TicketDetailsComponent = (function () {
    function TicketDetailsComponent(route, router, ticketService, usersService) {
        this.route = route;
        this.router = router;
        this.ticketService = ticketService;
        this.usersService = usersService;
        this.users = [];
        this.showAssignToMenu = false;
    }
    TicketDetailsComponent.prototype.loadTicket = function (ticket_id) {
        var _this = this;
        this.ticketService.getTicket(ticket_id)
            .subscribe(function (ticket) {
            _this.ticket = ticket;
        }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    TicketDetailsComponent.prototype.loadUsers = function () {
        var _this = this;
        this.usersService.getUsers()
            .subscribe(function (users) {
            _this.users = users; //Bind to view
        }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    TicketDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (session_1.Session.auth && session_1.Session.auth.user) {
            this.current_user = session_1.Session.auth.user;
            if (this.current_user.role == 'admin') {
                this.loadUsers();
            }
        }
        this.route.params.forEach(function (params) {
            var ticket_id = +params['id'];
            _this.loadTicket(ticket_id);
        });
    };
    TicketDetailsComponent.prototype.editTicket = function () {
        this.router.navigate(['/edit_ticket', this.ticket.id]);
    };
    TicketDetailsComponent.prototype.closeTicket = function () {
        var _this = this;
        // Call removeTicket() from TicketService to delete ticket
        this.ticketService.closeTicket("" + this.ticket.id).subscribe(function (tickets) {
            _this.loadTicket(_this.ticket.id);
            console.log('after close', _this.ticket);
        }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    TicketDetailsComponent.prototype.reopenTicket = function () {
        var _this = this;
        // Call removeTicket() from TicketService to delete ticket
        this.ticketService.reopenTicket("" + this.ticket.id).subscribe(function (tickets) {
            _this.loadTicket(_this.ticket.id);
            console.log('after reopen', _this.ticket);
        }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    TicketDetailsComponent.prototype.assignTicket = function (user) {
        var _this = this;
        this.ticket.owner_id = user.id;
        this.ticketService.updateTicket(this.ticket).subscribe(function (tickets) {
            _this.loadTicket(_this.ticket.id);
            console.log('after assign', _this.ticket);
        }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    TicketDetailsComponent.prototype.deleteTicket = function () {
        this.ticketService.removeTicket("" + this.ticket.id).subscribe(function (tickets) {
            console.log(tickets);
        }, function (err) {
            console.log(err);
        });
        this.backToList();
    };
    TicketDetailsComponent.prototype.backToList = function () {
        this.router.navigate(['/list_tickets']);
    };
    TicketDetailsComponent = __decorate([
        core_1.Component({
            selector: 'ticket',
            templateUrl: 'app/tickets/ticket-details.component.html',
            providers: [tickets_service_1.TicketService, users_service_1.UsersService]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, tickets_service_1.TicketService, users_service_1.UsersService])
    ], TicketDetailsComponent);
    return TicketDetailsComponent;
}());
exports.TicketDetailsComponent = TicketDetailsComponent;
