import { start, price, register, help } from "./controllers/index.js";
import { authenticate } from "./middlewares/authenticate.js";
import { bot } from "./connection/bot_connection.js";

bot.start(authenticate, start);
bot.help(help);
bot.command("price", authenticate, price);
bot.command("register", register);

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
