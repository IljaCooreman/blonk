export enum DeviceType {
  authSatellite = 'authSatellite',
  mothership = 'mothership',
  browser = 'browser',
  broadcast = 'broadcast'
}
export enum Purpose {
  message = 'message',
  handshake = 'handshake',
  token = 'token'
}

export interface DTO {
  body: any,
  purpose: Purpose,
}

export interface TokenObject {
  id: string,
  token: number[],
  connStartTime: Date,
}