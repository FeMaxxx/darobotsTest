import db from "../connection/db_connection.js";

export const authenticate = (ctx, next) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      ctx.reply("Oops, an error occurred, please try again.");
      console.error("Error:", err);
      return;
    }

    const foundUser = results.find(el => el.tg_id === ctx.message.from.id.toString());

    if (foundUser) {
      next();
    } else {
      ctx.reply(`To get started, please register - /register`);
    }
  });
};
