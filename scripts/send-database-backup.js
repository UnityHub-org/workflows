const TelegramBot = require("node-telegram-bot-api");
const path = require("path");
const JSZip = require("jszip");
const fs = require("fs");
const { DateTime } = require("luxon");

const fileName = "backup.sql";
const filePath = path.join(__dirname, "..", fileName);
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });
const zip = new JSZip();

const file = fs.readFileSync(filePath);

zip.file(fileName, file);
zip.generateAsync({ type: "nodebuffer" }).then((content) => {
  bot.sendDocument(process.env.DATABASE_BACKUP_CHAT_ID, content, undefined, {
    filename: `${fileName} (${DateTime.local().toFormat(
      "yyyy-MM-dd__HH-mm-ss"
    )})`,
  });
});
