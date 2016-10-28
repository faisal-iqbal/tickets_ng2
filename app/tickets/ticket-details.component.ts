/**
 * @author: Faisal Iqbal <fiqbal.qureshi@outlook.com>
 * @created_on: 09/10/2016
 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Session } from '../common/session';
import { Ticket } from './models/tickets.model';
import { TicketService } from './services/tickets.service';
import { User } from '../users/models/users.model';
import { UsersService } from "../users/services/users.service";

@Component({
    selector: 'ticket',
    templateUrl: 'app/tickets/ticket-details.component.html',
	providers: [TicketService, UsersService]
})

export class TicketDetailsComponent implements OnInit { 
    public ticket: Ticket;
	public current_user: User;
	public users: User[] = [];
	public showAssignToMenu:boolean = false;

	constructor(
				private route: ActivatedRoute,
				private router: Router,
				private ticketService: TicketService,
				private usersService: UsersService){
	}
	
	loadTicket(ticket_id) {
		this.ticketService.getTicket(ticket_id)
			.subscribe(
			ticket => {
				this.ticket = ticket;
			},
			err => {
				// Log errors if any
				console.log(err);
			});
	}

	loadUsers(){
		this.usersService.getUsers()
			.subscribe(
			users => {
				this.users = users; //Bind to view
			},
			err => {
				// Log errors if any
				console.log(err);
			});
	}

	ngOnInit() {
		if(Session.auth && Session.auth.user) {
			this.current_user = Session.auth.user;
			if(this.current_user.role == 'admin') {
				this.loadUsers();
			}
		}
		this.route.params.forEach((params: Params) => {
			let ticket_id:number = +params['id'];
			this.loadTicket(ticket_id);
		});
	}

    editTicket(){
		this.router.navigate(['/edit_ticket', this.ticket.id]);
    }

	closeTicket(){
        // Call removeTicket() from TicketService to delete ticket
        this.ticketService.closeTicket(`${this.ticket.id}`).subscribe(
			tickets => {
				this.loadTicket(this.ticket.id);
				console.log('after close', this.ticket);
			}, 
			err => {
				// Log errors if any
				console.log(err);
			});
    }

	reopenTicket(){
        // Call removeTicket() from TicketService to delete ticket
        this.ticketService.reopenTicket(`${this.ticket.id}`).subscribe(
			tickets => {
				this.loadTicket(this.ticket.id);
				console.log('after reopen', this.ticket);
			}, 
			err => {
				// Log errors if any
				console.log(err);
			});
    }
	
	assignTicket(user:User) {
		this.ticket.owner_id = user.id;
	    this.ticketService.updateTicket(this.ticket).subscribe(
			tickets => {
				this.loadTicket(this.ticket.id);
				console.log('after assign', this.ticket);
			}, 
			err => {
				// Log errors if any
				console.log(err);
			});
	}

    deleteTicket(){
        this.ticketService.removeTicket(`${this.ticket.id}`).subscribe(
			tickets => {
				console.log(tickets);
			}, 
			err => {
				console.log(err);
			});
		this.backToList();
    }

	backToList() {
		this.router.navigate(['/list_tickets']);
	}
}
