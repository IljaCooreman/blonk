import { DTO, Purpose } from '../types/typedefs';

class MessageSystem {

  /**
   * parse
   */
  public parse(message: string): DTO {
    return JSON.parse(message);
  }
  /**
   * encode
   */
  public encode(purpose: Purpose, body: any): string {
    const object: DTO = {
      body,
      purpose,
    }
    return JSON.stringify(object);
  }
}

export const messageSystem = new MessageSystem();