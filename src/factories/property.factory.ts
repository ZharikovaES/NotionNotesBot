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
        return propery.date?.start ? new Date(propery.date.start).toLocaleString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }) : '--:--';
      default:
        throw new Error(`Unknown property type: ${propery.type}`);
    }
  }
}