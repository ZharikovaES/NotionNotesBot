import { APIErrorCode, Client, collectPaginatedAPI, isFullBlock, isFullPage, isNotionClientError } from "@notionhq/client";
import { IConfigService } from "../config/config.interface";
import { BlockFactory } from "../factories/block.factory";
import { PropertyFactory } from "../factories/property.factory";
import { InvestmentsTable } from "../format/investments.table";

export class Notion {
  private notion!: Client;
  constructor(private readonly configService: IConfigService) {
    try {
      this.notion = new Client({ auth: this.configService.get('NOTION_TOKEN') });
    } catch (error: unknown) {
      if (isNotionClientError(error)) {
        if (error.code === APIErrorCode.ObjectNotFound) {
        } else {
          console.error(error)
        }
      }
    }
  }

  private async getPageData(pageId: string): Promise<string | null> {
    try {
      const blocks = await collectPaginatedAPI(this.notion.blocks.children.list, {
        block_id: pageId,
      });

      const res = blocks.reduce((previousValue, block) => {
        if (!isFullBlock(block)) {
          return previousValue;
        }

        const blockPage = BlockFactory.createBlock(block);
        const newText = blockPage.toString();
        return previousValue + newText;
      }, '');
      
      return res;
    } catch (error) {
      if (isNotionClientError(error)) {
        // Обработка ошибок клиента Notion
        if (error.code === APIErrorCode.ObjectNotFound) {
          console.error('Page not found.');
        } else {
          console.error('Notion API error:', error.message);
        }
      } else {
        console.error('Unexpected error:', error);
      }
    }

    return null;
  }
  
  private async getDatabaseData(databaseId: string): Promise<string | null> {
    try {      
      const db = await this.notion.databases.query({
        database_id: databaseId,
      });

      
      const results = db.results.map(page => {
        if (!isFullPage(page)) {
          return;
        }
        
        return Object.values(page.properties)
                      .map(property => PropertyFactory.createProperty(property))
      }).filter(row => !!row);

      const page = db.results.find(page => isFullPage(page));

      if (!page) {
        return 'Пусто (или что-то не так)'
      }

      const columns = Object.keys(page.properties);
      const table = new InvestmentsTable(columns, results);
      
      return table.toString();
    } catch (error) {
      if (isNotionClientError(error)) {
        // Обработка ошибок клиента Notion
        if (error.code === APIErrorCode.ObjectNotFound) {
          console.error('Page not found.');
        } else {
          console.error('Notion API error:', error.message);
        }
      } else {
        console.error('Unexpected error:', error);
      }
    }

    return null;
  }

  public async getPageNotes() {
    return await this.getPageData(this.configService.get('PAGE_NOTES_ID'));
  }

  public async getPageInvestments() {
    return await this.getDatabaseData(this.configService.get('TABLE_INVESTMENTS_ID'));
  }
}