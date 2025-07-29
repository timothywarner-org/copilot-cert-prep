import { env } from '../config/env';

export const connectToDatabase = async () => {
	const dbConfig = {
		host: env.DB_HOST,
		port: env.DB_PORT,
		user: env.DB_USER,
		password: env.DB_PASSWORD,
	};
	// ...existing code to connect to the database...
};
