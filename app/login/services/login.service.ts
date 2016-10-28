/**
 * @author: Faisal Iqbal <fiqbal.qureshi@outlook.com>
 * @created_on: 09/10/2016
 */
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Session } from "../../common/session";
import { AppSettings } from "../../common/app.settings";
import { Auth } from '../../common/models/auth.model';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {
    // Resolve HTTP using the constructor
    constructor (private http: Http) {
		console.log('in user service');
	}
    // private instance variable to hold base url
    private usersUrl = AppSettings.API_ENDPOINT + '/api/users';

	// sign in a new user
    signIn (email:string, password:string): Observable<Auth> {
		let body:any = {email: email, password: password}
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(`${this.usersUrl}/sign_in.json`, body, options) // ...using post request
                        .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                        .catch((error:any) => Observable.throw('Server error')); //...errors if any
    }   

    // sign out a user
    signOut (): Observable<{}> {
        return this.http.delete(`${this.usersUrl}/sign_out.json?auth_token=${Session.auth.user.auth_token}`)
                        .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                        .catch((error:any) => Observable.throw('Server error')); //...errors if any
    }
}
