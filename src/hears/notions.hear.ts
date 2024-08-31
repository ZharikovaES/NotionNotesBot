import { Bot, Keyboard } from "grammy";
import { IBotContext } from "../context/context.interface";
import { Notion } from "../services/notion.service";
import { Hear } from "./hear.class";

export class NotionHear extends Hear {
  constructor(bot: Bot<IBotContext>, notion: Notion) {
    super(bot, notion);
  }
  
  handle() {
    this.bot.hears('Заметки', async (ctx: IBotContext) => {
      const result = await this.notion.getPageNotes();
      ctx.reply(result ?? 'Что-то пошло не так...');
    });
  }
}