/**
 * @author: Faisal Iqbal <fiqbal.qureshi@outlook.com>
 * @created_on: 09/10/2016
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from './common/session';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html'
})

export class AppComponent implements OnInit {

	constructor(private router: Router){
	}

	public ngOnInit():void {
		if (Session.auth && Session.auth.user) {
		} else {
			this.router.navigate(['/login']);
		}
	}
}
