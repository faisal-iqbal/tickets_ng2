/**
 * @author: Faisal Iqbal <fiqbal.qureshi@outlook.com>
 * @created_on: 09/10/2016
 */

import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Session } from "../../common/session";
import { AppSettings } from "../../common/app.settings";
import { Ticket } from '../models/tickets.model';
import { Comment } from '../../comments/models/comments.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TicketService {
    // Resolve HTTP using the constructor
    constructor (private http: Http) {
		console.log('in ticket service');
	}
    // private instance variable to hold base url
    private ticketsUrl = AppSettings.API_ENDPOINT + '/tickets';

	// Fetch all existing tickets
    getTickets() : Observable<Ticket[]> {
        // ...using get request
        return this.http.get(`${this.ticketsUrl}.json?auth_token=${Session.auth.user.auth_token}`)
                        // ...and calling .json() on the response to return data
                        .map((res:Response) => res.json())
                        //...errors if any
                        .catch((error:any) => Observable.throw('Server error'));
    }

	// Fetch specific ticket
    getTicket(id:number) : Observable<Ticket> {
        // ...using get request
        return this.http.get(`${this.ticketsUrl}/${id}.json?auth_token=${Session.auth.user.auth_token}`)
                        // ...and calling .json() on the response to return data
                        .map((res:Response) => res.json())
                        //...errors if any
                        .catch((error:any) => Observable.throw('Server error'));

    }
	
	getTicketsPDFURL() {
        return `${this.ticketsUrl}.pdf?closed_in_last_month=true&auth_token=${Session.auth.user.auth_token}`;
    }

	// Add a new ticket
    addTicket (body: Object): Observable<Ticket[]> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(`${this.ticketsUrl}.json?auth_token=${Session.auth.user.auth_token}`, body, options) // ...using post request
                        .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                        .catch((error:any) => Observable.throw('Server error')); //...errors if any
    }

    // Update a ticket
    updateTicket (body: Object): Observable<Ticket[]> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.put(`${this.ticketsUrl}/${body['id']}.json?auth_token=${Session.auth.user.auth_token}`, body, options) // ...using put request
                        .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                        .catch((error:any) => Observable.throw('Server error')); //...errors if any
    }

	// Close a ticket
    closeTicket (id:string): Observable<Ticket[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(`${this.ticketsUrl}/${id}/mark_close.json?auth_token=${Session.auth.user.auth_token}`, null, options) // ...using put request
                        .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                        .catch((error:any) => Observable.throw('Server error')); //...errors if any
    }

	// Reopen a ticket
    reopenTicket (id:string): Observable<Ticket[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(`${this.ticketsUrl}/${id}/reopen.json?auth_token=${Session.auth.user.auth_token}`, null, options) // ...using put request
                        .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                        .catch((error:any) => Observable.throw('Server error')); //...errors if any
    }

    // Delete a ticket
    removeTicket (id:string): Observable<Ticket[]> {
        return this.http.delete(`${this.ticketsUrl}/${id}.json?auth_token=${Session.auth.user.auth_token}`) // ...using put request
                        .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                        .catch((error:any) => Observable.throw('Server error')); //...errors if any
    }
}
