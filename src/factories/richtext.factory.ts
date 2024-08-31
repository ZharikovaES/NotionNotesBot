import { RichTextItemResponse, TextRichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import { TextRichTextItem } from "../blocks/text.text-rich";

export class RichTextItemFactory {
  static createRichText(richTextItem: RichTextItemResponse) {
    switch (richTextItem.type) {
      case 'text':
        return new TextRichTextItem(<TextRichTextItemResponse>richTextItem);
      default:
        throw new Error(`Unknown block type of RichTextItemResponse: ${richTextItem.type}`);
    }
  }
}