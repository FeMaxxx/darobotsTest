import axios from "axios";
import { bot } from "../connection/bot_connection.js";
import { Markup } from "telegraf";

export const price = ctx => {
  ctx.replyWithHTML(
    "<b>Price:</b>",
    Markup.inlineKeyboard([
      [Markup.button.callback("BTC", "bitcoin"), Markup.button.callback("ETH", "ethereum")],
    ])
  );
};

const getInfo = async id => {
  try {
    const res = await axios.get(`https://api.coinlore.net/api/ticker/?id=${id}`);
    return res.data[0];
  } catch (error) {
    ctx.reply("Oops, an error occurred, please try again.");
  }
};

bot.action("bitcoin", async ctx => {
  const info = await getInfo(90);
  await ctx.replyWithHTML(
    `Coin - <b>${info.name}</b>\n\nPrice(USD) - ${info.price_usd}\nPrice(BTC) - ${info.price_btc}`
  );
  await ctx.answerCbQuery();
});

bot.action("ethereum", async ctx => {
  const info = await getInfo(80);
  await ctx.replyWithHTML(
    `Coin - <b>${info.name}</b>\n\nPrice(USD) - ${info.price_usd}\nPrice(BTC) - ${info.price_btc}`
  );
  await ctx.answerCbQuery();
});
