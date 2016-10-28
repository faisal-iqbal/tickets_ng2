export class Ticket {
    constructor(
        public id: number, 
        public title: string, 
        public description:string,
		public status: number,
		public status_str: string,
		public user_id: number,
		public user_email: string,
		public owner_id: number,
		public owner_email: string,
		public created_at: Date,
		public updated_at: Date
        ){
	}
}