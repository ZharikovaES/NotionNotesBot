import { Bot } from "grammy";
import { IBotContext } from "../context/context.interface";

export abstract class Command {
  constructor(public bot: Bot<IBotContext>) { }
  abstract handle(): void;
}