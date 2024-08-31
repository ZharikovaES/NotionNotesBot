import { PageObjectResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichTextItemFactory } from "./richtext.factory";

export class PropertyFactory {
  static createProperty(propery: PageObjectResponse['properties'][string]): string {
    switch (propery.type) {
      case 'rich_text':
        return propery.rich_text.map(text => RichTextItemFactory.createRichText(<RichTextItemResponse>text)).join('\n');
      case 'title':
        return propery.title.map(title => RichTextItemFactory.createRichText(<RichTextItemResponse>title)).join('');
      case 'date':
        return propery.date?.end ? new Date(propery.date.end).toLocaleString() : '--:--';
      default:
        throw new Error(`Unknown property type: ${propery.type}`);
    }
  }
}