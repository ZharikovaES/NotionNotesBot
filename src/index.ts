import { Bot, GrammyError, HttpError } from 'grammy';

function main() {
  const TG_BOT_KEY = process.env.TG_BOT_KEY;
  if (TG_BOT_KEY) {
    const bot = new Bot(TG_BOT_KEY);

    bot.command('start', async (ctx) => {
      await ctx.reply('Привет!');
    });

    bot.catch((error) => {
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

    bot.start();
  }
}

main();