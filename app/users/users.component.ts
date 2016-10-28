/**
 * @author: Faisal Iqbal <fiqbal.qureshi@outlook.com>
 * @created_on: 09/10/2016
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from './models/users.model';
import { UsersService } from "./services/users.service";
import { Session } from "../common/session";

@Component(
    {
        selector: 'users',
        templateUrl: 'app/users/users.component.html',
		providers: [UsersService]
    }
)

export class UsersComponent implements OnInit {
	public users: User[] = [];
	public current_user: User;

    constructor(private router: Router, private usersService: UsersService){

    }

	loadUsers(){
		this.usersService.getUsers()
			.subscribe(
				users => { this.users = users;},
				err => { console.log(err);}
			);
	}

	public ngOnInit():void {
		if(Session.auth && Session.auth.user) {
			this.current_user = Session.auth.user;
			if(this.current_user.role == 'admin') {
				this.loadUsers();
			} else {
				this.router.navigate(['/login']);
			}
		};
	}

	editUser(user){
		this.router.navigate(['/edit_user', user.id]);
    }

	newUser(){
		this.router.navigate(['/new_user']);
    }

	makeSupportAgent(user:User, checked:boolean) {
		if (checked) {
			user.role = 'support_agent';
		} else {
			user.role = '';
		}
	    this.usersService.updateUser(user).subscribe(
			result => {
				this.loadUsers();
				console.log('after update', this.users);
			}, 
			err => {
				// Log errors if any
				console.log(err);
			});
	}

	deleteTicket(user:User){
        this.usersService.removeUser(`${user.id}`).subscribe(
			users => {
				this.loadUsers();
				console.log('after delete', this.users);
			}, 
			err => {
				// Log errors if any
				console.log(err);
			});
    }
}