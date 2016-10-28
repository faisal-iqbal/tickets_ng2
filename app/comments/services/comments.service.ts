/**
 * @author: Faisal Iqbal <fiqbal.qureshi@outlook.com>
 * @created_on: 09/10/2016
 */
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Session } from "../../common/session";
import { AppSettings } from "../../common/app.settings";
import { Comment } from '../models/comments.model';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CommentsService {
    // Resolve HTTP using the constructor
    constructor (private http: Http) {
		console.log('in comment service');
	}
    // private instance variable to hold base url
    private commentsUrl = AppSettings.API_ENDPOINT + '/comments';

	// Fetch all existing comments
    getComments(ticket_id:string = '') : Observable<Comment[]> {
        // ...using get request
		
		let url:string = `${this.commentsUrl}.json?auth_token=${Session.auth.user.auth_token}`
		if( ticket_id !== '') {
			url = `${url}&ticket_id=${ticket_id}`;
		}
        return this.http.get(url)
                        // ...and calling .json() on the response to return data
                        .map((res:Response) => res.json())
                        //...errors if any
                        .catch((error:any) => Observable.throw('Server error'));
    }

	// Fetch specific comment
    getComment(id:string) : Observable<Comment> {
        // ...using get request
        return this.http.get(`${this.commentsUrl}/${id}.json?auth_token=${Session.auth.user.auth_token}`)
                        // ...and calling .json() on the response to return data
                        .map((res:Response) => res.json())
                        //...errors if any
                        .catch((error:any) => Observable.throw('Server error'));

    }

	// Add a new comment
    addComment (body: Object): Observable<Comment[]> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(`${this.commentsUrl}.json?auth_token=${Session.auth.user.auth_token}`, body, options) // ...using post request
                        .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                        .catch((error:any) => Observable.throw('Server error')); //...errors if any
    }

    // Update a comment
    updateComment (body: Object): Observable<Comment[]> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.put(`${this.commentsUrl}/${body['id']}.json?auth_token=${Session.auth.user.auth_token}`, body, options) // ...using put request
                        .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                        .catch((error:any) => Observable.throw('Server error')); //...errors if any
    }

    // Delete a comment
    removeComment (id:string): Observable<Comment[]> {
        return this.http.delete(`${this.commentsUrl}/${id}.json?auth_token=${Session.auth.user.auth_token}`) // ...using put request
                        .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                        .catch((error:any) => Observable.throw('Server error')); //...errors if any
    }
}
