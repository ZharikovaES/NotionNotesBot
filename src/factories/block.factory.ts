import { BlockObjectResponse, BulletedListItemBlockObjectResponse, ParagraphBlockObjectResponse, RichTextItemResponse, RichTextPropertyItemObjectResponse, TextRichTextItemResponse, ToDoBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { TodoBlock } from "../blocks/todo.block";
import { ParagraphBlock } from "../blocks/paragraph.block";
import { BulletedListItemBlock } from "../blocks/bulleted-list-item.block";

export class BlockFactory {
  static createBlock(block: BlockObjectResponse) {
    switch (block.type) {
      case 'to_do':
        return new TodoBlock(<ToDoBlockObjectResponse>block);
      case 'paragraph':
        return new ParagraphBlock(<ParagraphBlockObjectResponse>block);
      case 'bulleted_list_item':
        return new BulletedListItemBlock(<BulletedListItemBlockObjectResponse>block);
      default:
        throw new Error(`Unknown block type: ${block.type}`);
    }
  }
}