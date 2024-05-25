import { Context, SessionFlavor } from "grammy";

export interface SessionData {
  test: number;
}

export interface IBotContext extends Context {
  session: SessionData
}

// type IBotContext2 = Context & SessionFlavor<SessionData>;