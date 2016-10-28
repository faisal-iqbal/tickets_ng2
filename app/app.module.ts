/**
 * @author: Faisal Iqbal <fiqbal.qureshi@outlook.com>
 * @created_on: 09/10/2016
 */

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { TicketComponent } from './tickets/tickets.component';
import { TicketFormComponent } from './tickets/ticket-form.component';
import { TicketDetailsComponent } from './tickets/ticket-details.component';
import { CommentsComponent } from './comments/comments.component';
import { UsersComponent } from './users/users.component';
import { UserFormComponent } from './users/user-form.component';

@NgModule({
  imports: [ 
	BrowserModule,
	HttpModule,
    JsonpModule,
	FormsModule,
	RouterModule.forRoot([
      {
            path: '',
            component: LoginComponent,
      },
      {
            path: 'login',
            component: LoginComponent,
      },
	  {
            path: 'list_tickets',
            component: TicketComponent
      },
	  {
            path: 'show_ticket/:id',
            component: TicketDetailsComponent
      },
	  {
            path: 'edit_ticket/:id',
            component: TicketFormComponent
      },
	  {
            path: 'new_ticket',
            component: TicketFormComponent
      },
      {
            path: 'list_comments',
            component: CommentsComponent
      },
      {
            path: 'list_users',
            component: UsersComponent,
      },
      {
            path: 'edit_user/:id',
            component: UserFormComponent,
      },
      {
            path: 'new_user',
            component: UserFormComponent,
      }
    ])
  ],
  declarations: [
    AppComponent,
	LoginComponent,
	NavComponent,
	TicketComponent,
	TicketFormComponent,
	TicketDetailsComponent,
	CommentsComponent,
	UsersComponent,
	UserFormComponent
  ],
  bootstrap: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
