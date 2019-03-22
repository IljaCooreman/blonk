import * as dotenv from 'dotenv';

dotenv.config();

export const URL = process.env.URL || "http://127.0.0.1:3050";
export const WS_URL = process.env.WS_URL || "ws://localhost";
export const WS_PORT = process.env.WS_PORT || '5555';
