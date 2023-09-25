import db from "../connection/db_connection.js";
import { bot } from "../connection/bot_connection.js";
import { Scenes, session } from "telegraf";

const registrationWizard = new Scenes.WizardScene(
  "registration",
  ctx => {
    ctx.session.registrationData = {};
    ctx.reply("Enter your name:");
    ctx.wizard.next();
  },
  ctx => {
    const name = ctx.message.text;
    ctx.session.registrationData.name = name;
    ctx.reply("Enter your e-mail:");
    ctx.wizard.next();
  },
  ctx => {
    const email = ctx.message.text;
    ctx.session.registrationData.email = email;

    const registrationData = ctx.session.registrationData;

    const sql =
      "INSERT INTO users (tg_id, tg_first_name, tg_username, name, email) VALUES (?, ?, ?, ?, ?)";
    const values = [
      ctx.message.from.id,
      ctx.message.from.first_name ? ctx.message.from.first_name : "(anonymous)",
      ctx.message.from.username ? ctx.message.from.username : "(anonymous)",
      registrationData.name,
      registrationData.email,
    ];

    db.query(sql, values, err => {
      if (err) {
        ctx.reply("Oops, an error occurred, please try again");
      } else {
        ctx.reply("Registration is now closed! Thank you! To view the commands, press - /help");
      }
    });

    ctx.scene.leave();
  }
);

export const register = ctx => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("Error:", err);
      ctx.reply("Oops, an error occurred, please try again.");
      return;
    }

    const foundUser = results.find(el => el.tg_id === ctx.message.from.id.toString());

    if (foundUser) {
      ctx.reply("You are already registered. Enter /help to see the available commands");
    } else {
      ctx.scene.enter("registration");
    }
  });
};

const stage = new Scenes.Stage([registrationWizard]);
bot.use(session());
bot.use(stage.middleware());
