import { Bot } from "grammy";
import { Command } from "./command.class";
import { IBotContext } from "../context/context.interface";

export class StartCommand extends Command {
  constructor(bot: Bot<IBotContext>) {
    super(bot);
  }
  
  handle(): void {
    this.bot.command("start", (ctx: IBotContext) => {
    });
  }
}