import dotenv from 'dotenv';
import { cleanEnv, str, port } from 'envalid';

// Load .env file
dotenv.config();

// Validate and export environment variables
export const env = cleanEnv(process.env, {
	DB_HOST: str(),
	DB_PORT: port(),
	DB_USER: str(),
	DB_PASSWORD: str(),
	API_KEY: str(),
});
