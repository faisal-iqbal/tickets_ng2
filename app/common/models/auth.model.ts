import { User } from '../../users/models/users.model';
export class Auth {
    constructor(
		public success: boolean,
		public user: User
        ){
	}
}