import { Bot, Keyboard } from "grammy";
import { Command } from "./command.class";
import { IBotContext } from "../context/context.interface";

export class StartCommand extends Command {
  constructor(bot: Bot<IBotContext>) {
    super(bot);
  }
  
  handle(): void {
    this.bot.command("start", (ctx: IBotContext) => {      
      const keyboard = new Keyboard()
                        .text("Заметки").text("Инвестиции").row()
                        .text("Фильмы и сериалы").text("Планы на сегодня");

      ctx.reply("Хочу посмотреть...", {
        reply_markup: keyboard
      })
    });
  }
}