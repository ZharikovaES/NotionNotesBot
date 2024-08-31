import { Bot } from "grammy";
import { IBotContext } from "../context/context.interface";
import { Notion } from "../services/notion.service";

export abstract class Hear {
  constructor(public bot: Bot<IBotContext>, public notion: Notion) { }
  abstract handle(): void;
}