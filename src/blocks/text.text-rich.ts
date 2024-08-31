import { TextRichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export class TextRichTextItem  {
  constructor(public text: TextRichTextItemResponse) {
  }
  
  toString() {    
    return '\n' + this.text.text.content;
  }
}