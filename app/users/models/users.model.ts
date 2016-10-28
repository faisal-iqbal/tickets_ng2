export class User {
    constructor(
        public id: number, 
        public auth_token: string,
        public role:string,
		public email: string,
		public password: string
        ){
	}
}