/**
 * @author: Faisal Iqbal <fiqbal.qureshi@outlook.com>
 * @created_on: 09/10/2016
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Login } from './models/login.model';
import { LoginService } from "./services/login.service";
import { Session } from "../common/session";

@Component(
    {
        selector: 'login',
        templateUrl: 'app/login/login.component.html',
		providers: [LoginService]
    }
)

export class LoginComponent {
	public email:string = ''
	public password:string = ''

    constructor(private router: Router, private loginService: LoginService){
		this.signOut();
    }
	
	signIn() {
		this.loginService.signIn(this.email, this.password)
			.subscribe(
				result => {
					//console.log(result);
					if (result.user) {
						Session.auth = result;
						this.router.navigate(['/list_tickets']);
					}
				},
				err => {
					// Log errors if any
					console.log(err);
				});
	}

	signOut() {
		if(Session.auth) {
			this.loginService.signOut()
				.subscribe(
					result => {
						console.log(result);
						Session.auth = null;
					},
					err => {
						// Log errors if any
						console.log(err);
					});
		}
	}
}