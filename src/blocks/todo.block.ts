import { ToDoBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Block } from "./block.class";

export class TodoBlock extends Block {
  constructor(public block: ToDoBlockObjectResponse) {
    super(block);
  }
  
  toString() {
    const list = this.block.to_do.rich_text;
    const checked = this.block.to_do.checked;
    let message = `\n${checked ? '✅ ' : '⬜ '} `; 
    
    message += list.reduce((accList, currentItem, i) => {
      if (currentItem.type === 'text' && currentItem.text?.content) {
        return accList + currentItem.text?.content;
      }

      return accList + '**неразборчиво**';
    }, '');

    return message;
  }
}