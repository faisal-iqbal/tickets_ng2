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
var tickets_service_1 = require("./services/tickets.service");
var users_service_1 = require("../users/services/users.service");
var session_1 = require('../common/session');
var TicketComponent = (function () {
    function TicketComponent(router, ticketService, usersService) {
        this.router = router;
        this.ticketService = ticketService;
        this.usersService = usersService;
        this.tickets = [];
        this.users = [];
        this.report_pdf_url = '';
        this.showAssignToMenu = {};
    }
    TicketComponent.prototype.loadTickets = function () {
        var _this = this;
        this.ticketService.getTickets()
            .subscribe(function (tickets) {
            _this.tickets = tickets; //Bind to view
        }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    TicketComponent.prototype.loadUsers = function () {
        var _this = this;
        this.usersService.getUsers()
            .subscribe(function (users) {
            _this.users = users; //Bind to view
        }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    TicketComponent.prototype.ngOnInit = function () {
        if (session_1.Session.auth && session_1.Session.auth.user) {
            this.current_user = session_1.Session.auth.user;
            if (this.current_user.role == 'support_agent') {
                this.report_pdf_url = this.ticketService.getTicketsPDFURL();
            }
            if (this.current_user.role == 'admin') {
                this.loadUsers();
            }
        }
        this.loadTickets();
    };
    TicketComponent.prototype.showTicket = function (ticket) {
        this.router.navigate(['/show_ticket', ticket.id]);
    };
    TicketComponent.prototype.editTicket = function (ticket) {
        this.router.navigate(['/edit_ticket', ticket.id]);
    };
    TicketComponent.prototype.newTicket = function () {
        this.router.navigate(['/new_ticket']);
    };
    TicketComponent.prototype.closeTicket = function (id) {
        var _this = this;
        this.ticketService.closeTicket(id).subscribe(function (tickets) {
            console.log('after close', tickets);
            _this.loadTickets();
        }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    TicketComponent.prototype.reopenTicket = function (id) {
        var _this = this;
        this.ticketService.reopenTicket(id).subscribe(function (tickets) {
            console.log('after reopen', tickets);
            _this.loadTickets();
        }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    TicketComponent.prototype.assignTicket = function (ticket, user) {
        var _this = this;
        ticket.owner_id = user.id;
        this.ticketService.updateTicket(ticket).subscribe(function (tickets) {
            _this.loadTickets();
            console.log('after assign', _this.tickets);
        }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    TicketComponent.prototype.deleteTicket = function (id) {
        var _this = this;
        // Call removeTicket() from TicketService to delete ticket
        this.ticketService.removeTicket(id).subscribe(function (tickets) {
            console.log('after delete', _this.tickets);
        }, function (err) {
            // Log errors if any
            console.log(err);
        });
        this.loadTickets();
    };
    TicketComponent = __decorate([
        core_1.Component({
            selector: 'tickets',
            templateUrl: 'app/tickets/tickets.component.html',
            providers: [tickets_service_1.TicketService, users_service_1.UsersService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, tickets_service_1.TicketService, users_service_1.UsersService])
    ], TicketComponent);
    return TicketComponent;
}());
exports.TicketComponent = TicketComponent;
