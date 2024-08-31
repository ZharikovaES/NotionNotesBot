import { Bot } from "grammy";
import { IBotContext } from "../context/context.interface";
import { Notion } from "../services/notion.service";
import { Hear } from "./hear.class";

export class InvestmentsHear extends Hear {
  constructor(bot: Bot<IBotContext>, notion: Notion) {
    super(bot, notion);
  }
  
  handle() {
    this.bot.hears('Инвестиции', async (ctx: IBotContext) => {
      const result = await this.notion.getPageInvestments();
      ctx.replyWithHTML(result ?? 'Что-то пошло не так...');
    })
  }
}