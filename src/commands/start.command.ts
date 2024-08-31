import { Bot, Keyboard } from "grammy";
import { Command } from "./command.class";
import { IBotContext } from "../context/context.interface";
import { Notion } from "../services/notion.service";

export class StartCommand extends Command {
  constructor(bot: Bot<IBotContext>, notion: Notion) {
    super(bot, notion);
    
  }
  
  handle() {
    this.bot.command("start", async (ctx: IBotContext) => {      
      const keyboard = new Keyboard()
                        .text("Заметки").text("Инвестиции").row()
                        .text("Фильмы и сериалы").text("Планы на сегодня");
      await ctx.reply('Что интересует?', {
        reply_markup: keyboard
      });
    });

    this.bot.hears('Заметки', async (ctx) => {
      const result = await this.notion.getPageNotes();
      ctx.reply("Заметки:" + result);
    })
  }
}