/**
 * @author: Faisal Iqbal <fiqbal.qureshi@outlook.com>
 * @created_on: 09/10/2016
 */

import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm }    from '@angular/forms';
import { CommentsService } from './services/comments.service';
import { Comment } from './models/comments.model';
import { User } from '../users/models/users.model';
import { Session } from '../common/session';

@Component(
    {
        selector: 'comments',
        templateUrl: 'app/comments/comments.component.html',
		providers: [CommentsService]
    }
)

export class CommentsComponent implements OnInit {
	@Input() ticket_id: string = '';
	public comments: Comment[];
	public new_comment: string='';
	public current_user: User;

    constructor(private route: ActivatedRoute,
				private router: Router,
				private commentsService: CommentsService){
    }

	loadComments(ticket_id) {
		this.commentsService.getComments(this.ticket_id).subscribe(
			comments => { this.comments = comments; },
			err => { console.log(err); }
		);
	}

	ngOnInit() {
		if(Session.auth && Session.auth.user) {
			this.current_user = Session.auth.user;
		}
		this.loadComments(this.ticket_id);
	}
	
	addComment() {
		let model = new Comment(null, this.new_comment, null, null, null, (+this.ticket_id), null, null);
		console.log(model);
		this.commentsService.addComment(model)
			.subscribe(
				comment => {
					this.new_comment = '';
					this.loadComments(this.ticket_id);
				}, 
				err => { console.log(err); }
			);
	}

	deleteComment(id:string){
        this.commentsService.removeComment(id).subscribe(
			tickets => {
				this.loadComments(this.ticket_id);
				console.log('after delete', this.comments);
			}, 
			err => {
				// Log errors if any
				console.log(err);
			});
    }
}