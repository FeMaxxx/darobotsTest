export const start = ctx => {
  ctx.reply(`Hi ${ctx.message.from.first_name}, to view the commands, press - /help`);
};
