export class Comment {
    constructor(
        public id: number,
        public body: string,
		public status: number,
		public user_id: number,
		public user_email: string,
		public ticket_id: number,
		public created_at: Date,
		public updated_at: Date
        ){
	}
}