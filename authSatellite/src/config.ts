import * as dotenv from "dotenv";

dotenv.config();


export const SERVER_HOST = process.env.SERVER_HOST || 'localhost';
export const SERVER_PORT = process.env.SERVER_PORT || '9001';
export const GROUP = process.env.GROUP || 'default';
