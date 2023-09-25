import { Telegraf } from "telegraf";
import dotenv from "dotenv";
dotenv.config();

const { BOT_TOKEN } = process.env;

export const bot = new Telegraf(BOT_TOKEN);
