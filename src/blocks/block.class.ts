import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export abstract class Block {
  constructor(public block: BlockObjectResponse) { }
  abstract toString(): string;
}