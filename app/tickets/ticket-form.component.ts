/**
 * @author: Faisal Iqbal <fiqbal.qureshi@outlook.com>
 * @created_on: 09/10/2016
 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm }    from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { TicketService } from './services/tickets.service';
import { Ticket } from './models/tickets.model'
import { Session } from '../common/session';
import { User } from '../users/models/users.model';

// Component decorator
@Component({
    selector: 'ticket-form',
    templateUrl: 'app/tickets/ticket-form.component.html',
    providers: [TicketService]
})
// Component class
export class TicketFormComponent implements OnInit { 
	public current_user: User;
	private model = new Ticket(null, '', '', 0, 'open', null, null, null, null, null, null);
    private editing = false;

    constructor(
				private route: ActivatedRoute,
				private router: Router,
				private ticketService: TicketService){

	}

	ngOnInit() {
		if(Session.auth && Session.auth.user) {
			this.current_user = Session.auth.user;
		}
		this.route.params.forEach((params: Params) => {
			let ticket_id:number = +params['id']; // (+) converts string 'id' to a number
			if (ticket_id) {
				this.ticketService.getTicket(ticket_id)
				.subscribe(
					ticket => {
						this.model = ticket;
						this.editing = true;
					},
					err => {console.log(err);
					}
				);
			}
		});
	}

    submitTicket(){
        // Variable to hold a reference of addTicket/updateTicket
        let ticketOperation:Observable<Ticket[]>;

        if(!this.editing){
            // Create a new ticket
            ticketOperation = this.ticketService.addTicket(this.model)
        } else {
            // Update an existing ticket
             ticketOperation = this.ticketService.updateTicket(this.model)
        }

        // Subscribe to observable
        ticketOperation.subscribe(
			tickets => {
				this.router.navigate(['/list_tickets']);
			}, 
			err => {
				// Log errors if any
				console.log(err);
			});
    }

	cancelForm() {
		this.router.navigate(['/list_tickets']);
	}
}
