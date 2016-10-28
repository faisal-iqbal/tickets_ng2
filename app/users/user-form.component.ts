/**
 * @author: Faisal Iqbal <fiqbal.qureshi@outlook.com>
 * @created_on: 12/10/2016
 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm }    from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { UsersService } from './services/users.service';
import { Session } from '../common/session';
import { User } from './models/users.model';

// Component decorator
@Component({
    selector: 'user-form',
    templateUrl: 'app/users/user-form.component.html',
    providers: [UsersService]
})
// Component class
export class UserFormComponent implements OnInit { 
	public current_user: User;
	private model = new User(null, '', '', '', '');
    private editing = false;
	private confirm_password = '';
	private password_mismatch = false;

    constructor(private route: ActivatedRoute,
				private router: Router,
				private userService: UsersService){

	}

	ngOnInit() {
		if(Session.auth && Session.auth.user) {
			this.current_user = Session.auth.user;
		}
		this.route.params.forEach((params: Params) => {
			let user_id:number = +params['id']; // (+) converts string 'id' to a number
			if (user_id) {
				this.userService.getUser(user_id)
				.subscribe(
					user => {
						this.model = user;
						this.editing = true;
					},
					err => {console.log(err);}
				);
			}
		});
	}

    submitUser(){
        // Variable to hold a reference of addUser/updateUser
        let userOperation:Observable<User[]>;
		if(this.confirm_password != this.model.password) {
			this.password_mismatch = true;
			return;
		}

        if(!this.editing){
            // Create a new user
            userOperation = this.userService.addUser(this.model)
        } else {
            // Update an existing user
             userOperation = this.userService.updateUser(this.model)
        }

        // Subscribe to observable
        userOperation.subscribe(
			users => {this.router.navigate(['/list_users']);}, 
			err => {console.log(err);}
			);
    }

	cancelForm() {
		this.router.navigate(['/list_users']);
	}
}
