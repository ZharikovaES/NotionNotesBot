import { Bot as BotGrammy, session} from "grammy";
import { IConfigService } from "./config/config.interface";
import { ConfigService } from "./config/config.service";
import { IBotContext, SessionData } from "./context/context.interface";

class Bot {
  bot: BotGrammy<IBotContext>;
  constructor(private readonly configService: IConfigService) {
    this.bot = new BotGrammy<IBotContext>(this.configService.get('TG_BOT_KEY'));
  }

  inital = (): SessionData => {
    return {
      test: 1
    }
  }

  init() {
    this.bot.start();
    this.bot.use(session({ initial: this.inital }))
  }
}

const bot = new Bot(new ConfigService());
bot.init();