import { BulletedListItemBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Block } from "./block.class";

export class BulletedListItemBlock extends Block {
  constructor(public block: BulletedListItemBlockObjectResponse) {
    super(block);
  }
  
  toString() {    
    return '\n' + this.block.bulleted_list_item.rich_text.reduce((text, item) => text + '- ' + item.plain_text, '');
  }
}