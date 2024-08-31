import { ParagraphBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Block } from "./block.class";

export class ParagraphBlock extends Block {
  constructor(public block: ParagraphBlockObjectResponse) {
    super(block);
  }
  
  toString() {    
    return '\n' + this.block.paragraph.rich_text.reduce((text, item) => text + item.plain_text, '');
  }
}