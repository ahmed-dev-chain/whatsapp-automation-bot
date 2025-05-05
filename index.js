const { config } = require("dotenv");
const { startBot } = require("./src/bot/startBot");

const app = () => {
  config();
  startBot();
};

app();
