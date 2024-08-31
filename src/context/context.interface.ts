import { ParseModeFlavor } from "@grammyjs/parse-mode";
import { Context, SessionFlavor } from "grammy";

export interface SessionData {
  test: number;
}

interface IContext extends Context {
  session: SessionData
}

export type IBotContext = ParseModeFlavor<IContext>;