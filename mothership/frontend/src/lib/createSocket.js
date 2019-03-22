import { WS_PORT, WS_URL } from "../config";

export const createSocket = () => new WebSocket(`${WS_URL}:${WS_PORT}`)
