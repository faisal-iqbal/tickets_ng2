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
var tickets_service_1 = require('./services/tickets.service');
var tickets_model_1 = require('./models/tickets.model');
var session_1 = require('../common/session');
// Component decorator
var TicketFormComponent = (function () {
    function TicketFormComponent(route, router, ticketService) {
        this.route = route;
        this.router = router;
        this.ticketService = ticketService;
        this.model = new tickets_model_1.Ticket(null, '', '', 0, 'open', null, null, null, null, null, null);
        this.editing = false;
    }
    TicketFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (session_1.Session.auth && session_1.Session.auth.user) {
            this.current_user = session_1.Session.auth.user;
        }
        this.route.params.forEach(function (params) {
            var ticket_id = +params['id']; // (+) converts string 'id' to a number
            if (ticket_id) {
                _this.ticketService.getTicket(ticket_id)
                    .subscribe(function (ticket) {
                    _this.model = ticket;
                    _this.editing = true;
                }, function (err) {
                    console.log(err);
                });
            }
        });
    };
    TicketFormComponent.prototype.submitTicket = function () {
        var _this = this;
        // Variable to hold a reference of addTicket/updateTicket
        var ticketOperation;
        if (!this.editing) {
            // Create a new ticket
            ticketOperation = this.ticketService.addTicket(this.model);
        }
        else {
            // Update an existing ticket
            ticketOperation = this.ticketService.updateTicket(this.model);
        }
        // Subscribe to observable
        ticketOperation.subscribe(function (tickets) {
            _this.router.navigate(['/list_tickets']);
        }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    TicketFormComponent.prototype.cancelForm = function () {
        this.router.navigate(['/list_tickets']);
    };
    TicketFormComponent = __decorate([
        core_1.Component({
            selector: 'ticket-form',
            templateUrl: 'app/tickets/ticket-form.component.html',
            providers: [tickets_service_1.TicketService]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, tickets_service_1.TicketService])
    ], TicketFormComponent);
    return TicketFormComponent;
}());
exports.TicketFormComponent = TicketFormComponent;
