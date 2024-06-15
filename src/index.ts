import { Bot as BotGrammy, GrammyError, HttpError, session} from "grammy";
import { IConfigService } from "./config/config.interface";
import { IBotContext, SessionData } from "./context/context.interface";
import { ConfigService } from "./config/config.service";
import { Command } from "./commands/command.class";
import { StartCommand } from "./commands/start.command";

class Bot {
  bot: BotGrammy<IBotContext>;
  commands: Command[] = [];
  constructor(private readonly configService: IConfigService) {
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
    this.bot.use(session({ initial: this.inital }));

    this.commands = [new StartCommand(this.bot)];
    this.commands.forEach(command => command.handle());
  }
}

const config = new ConfigService();
const bot = new Bot(config);
bot.init();