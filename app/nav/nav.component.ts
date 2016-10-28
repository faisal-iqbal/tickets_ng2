/**
 * @author: Faisal Iqbal <fiqbal.qureshi@outlook.com>
 * @created_on: 09/10/2016
 */
import { Component, Input } from '@angular/core';
import { User } from '../users/models/users.model';

@Component({
    selector: 'top_nav',
    templateUrl: 'app/nav/nav.component.html'
})

export class NavComponent {
	@Input() current_user:User;
	public isMenuCollapsed: boolean = true;

    constructor() {
	}
}	