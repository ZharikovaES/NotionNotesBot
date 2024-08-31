import { Bot as BotGrammy, GrammyError, HttpError, Keyboard, session} from "grammy";
import { IConfigService } from "./config/config.interface";
import { IBotContext, SessionData } from "./context/context.interface";
import { ConfigService } from "./config/config.service";
import { Command } from "./commands/command.class";
import { StartCommand } from "./commands/start.command";
import { Notion } from "./services/notion.service";
import { NotionHear } from "./hears/notions.hear";
import { Hear } from "./hears/hear.class";
import { InvestmentsHear } from "./hears/Investments.hear";
import { hydrateReply, parseMode } from "@grammyjs/parse-mode";

class Bot {
  bot: BotGrammy<IBotContext>;
  commands: Command[] = [];
  hears: Hear[] = [];

  constructor(private readonly configService: IConfigService, private readonly notion: Notion) {
    this.bot = new BotGrammy<IBotContext>(this.configService.get('TG_BOT_KEY'));

    this.bot.catch((error) => {
      const ctx = error.ctx;
      console.error(`Error while handling update ${ctx.update.update_id}`);
      const e = error.error;

      if (e instanceof GrammyError) {
        console.error('Error in request: ', e.description);   
      } else if (e instanceof HttpError) {
        console.error('Could not contact Telegram: ', e);
      } else {
        console.error('Unknown error', e); 
      }
    });
  }

  inital = (): SessionData => {
    return {
      test: 1
    }
  }

  init() {
    this.bot.start();
    this.bot.use(hydrateReply);
    this.bot.use(session({ initial: this.inital }));

    this.commands = [new StartCommand(this.bot, this.notion)];
    this.hears = [new NotionHear(this.bot, this.notion), new InvestmentsHear(this.bot, this.notion)];

    [...this.commands, ...this.hears]
      .forEach(command => command.handle());
  }
}

const config = new ConfigService();
const bot = new Bot(config, new Notion(config));
bot.init();