/**
 * @author: Faisal Iqbal <fiqbal.qureshi@outlook.com>
 * @created_on: 09/10/2016
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Ticket } from './models/tickets.model';
import { TicketService } from "./services/tickets.service";
import { User } from '../users/models/users.model';
import { UsersService } from "../users/services/users.service";
import { Session } from '../common/session';

@Component({
	selector: 'tickets',
	templateUrl: 'app/tickets/tickets.component.html',
	providers: [TicketService, UsersService]
})

export class TicketComponent implements OnInit {
	public tickets: Ticket[] = [];
	public current_user: User;
	public users: User[] = [];
	public report_pdf_url: string = '';
	public showAssignToMenu:any = {};

	constructor(private router: Router,
		private ticketService: TicketService,
		private usersService: UsersService){

	}

	loadTickets(){
		this.ticketService.getTickets()
			.subscribe(
			tickets => {
				this.tickets = tickets; //Bind to view
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

	public ngOnInit():void {
		if(Session.auth && Session.auth.user) {
			this.current_user = Session.auth.user;
			if(this.current_user.role == 'support_agent') {
				this.report_pdf_url = this.ticketService.getTicketsPDFURL();
			}
			if(this.current_user.role == 'admin') {
				this.loadUsers();
			}
		}
		this.loadTickets();
	}

	showTicket(ticket){
		this.router.navigate(['/show_ticket', ticket.id]);
    }

	editTicket(ticket){
		this.router.navigate(['/edit_ticket', ticket.id]);
    }

	newTicket(){
		this.router.navigate(['/new_ticket']);
    }

    closeTicket(id:string){
        this.ticketService.closeTicket(id).subscribe(
			tickets => {
				console.log('after close', tickets);
				this.loadTickets();
			}, 
			err => {
				// Log errors if any
				console.log(err);
			});
    }

	reopenTicket(id:string){
        this.ticketService.reopenTicket(id).subscribe(
			tickets => {
				console.log('after reopen', tickets);
				this.loadTickets();
			}, 
			err => {
				// Log errors if any
				console.log(err);
			});
    }

	assignTicket(ticket:Ticket, user:User) {
		ticket.owner_id = user.id;
	    this.ticketService.updateTicket(ticket).subscribe(
			tickets => {
				this.loadTickets();
				console.log('after assign', this.tickets);
			}, 
			err => {
				// Log errors if any
				console.log(err);
			});
	}

	deleteTicket(id:string){
        // Call removeTicket() from TicketService to delete ticket
        this.ticketService.removeTicket(id).subscribe(
			tickets => {
				console.log('after delete', this.tickets);
			}, 
			err => {
				// Log errors if any
				console.log(err);
			});
		this.loadTickets();
    }
}