/**
 * @author: Faisal Iqbal <fiqbal.qureshi@outlook.com>
 * @created_on: 09/10/2016
 */
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Session } from "../../common/session";
import { AppSettings } from "../../common/app.settings";
import { User } from '../models/users.model';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UsersService {
    // Resolve HTTP using the constructor
    constructor (private http: Http) {
		console.log('in user service');
	}
    // private instance variable to hold base url
    private usersUrl = AppSettings.API_ENDPOINT + '/members';

	// Fetch all existing users
    getUsers() : Observable<User[]> {
        // ...using get request
        return this.http.get(`${this.usersUrl}.json?auth_token=${Session.auth.user.auth_token}`)
                        // ...and calling .json() on the response to return data
                        .map((res:Response) => res.json())
                        //...errors if any
                        .catch((error:any) => Observable.throw('Server error'));
    }

	// Fetch specific user
    getUser(id:string) : Observable<User> {
        // ...using get request
        return this.http.get(`${this.usersUrl}/${id}.json?auth_token=${Session.auth.user.auth_token}`)
                        // ...and calling .json() on the response to return data
                        .map((res:Response) => res.json())
                        //...errors if any
                        .catch((error:any) => Observable.throw('Server error'));

    }

	// Add a new user
    addUser (body: Object): Observable<User[]> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(`${this.usersUrl}.json?auth_token=${Session.auth.user.auth_token}`, body, options) // ...using post request
                        .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                        .catch((error:any) => Observable.throw('Server error')); //...errors if any
    }   

    // Update a user
    updateUser (body: Object): Observable<User[]> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.put(`${this.usersUrl}/${body['id']}.json?auth_token=${Session.auth.user.auth_token}`, body, options) // ...using put request
                        .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                        .catch((error:any) => Observable.throw('Server error')); //...errors if any
    }   

    // Delete a user
    removeUser (id:string): Observable<User[]> {
        return this.http.delete(`${this.usersUrl}/${id}.json?auth_token=${Session.auth.user.auth_token}`) // ...using put request
                        .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                        .catch((error:any) => Observable.throw('Server error')); //...errors if any
    } 
}
