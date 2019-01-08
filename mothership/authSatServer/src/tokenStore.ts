import { TokenObject } from "../types/typedefs";

class Tokenstore {
  public tokens: TokenObject[] = [];

  public add(token: number[], id: string): TokenObject {
    // check if id is already added

    const object: TokenObject = {
      connStartTime: new Date(),
      id,
      token,
    }
    this.tokens.push(object);
    return object;
  }
}