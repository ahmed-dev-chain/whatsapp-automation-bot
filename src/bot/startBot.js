const { connectDB } = require("../config/db");
const qrcode = require("qrcode-terminal");
const steps = require("../conversation/steps");
const state = require("../conversation/stateManager");
const { sendMessage } = require("../utils/responder");
const { saveLead } = require("../services/leadService");
const { client } = require("../config/client");

const greetings = ["hi", "hello", "hey", "hola"];

const startBot = async () => {
  await connectDB();

  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
    console.log("📱 Scan this QR with your WhatsApp");
  });

  client.on("ready", () => {
    console.log("✅ WhatsApp bot is ready");
  });

  client.on("message", async (msg) => {
    const phone = msg.from;
    const rawText = msg.body.trim();
    const text = rawText.toLowerCase();

    const user = state.initUser(phone);

    // Greeting phase
    if (!user.greeted) {
      if (greetings.includes(text)) {
        user.greeted = true;
        user.stepIndex = 0;
        state.updateUser(phone, user);
        // Don't process the greeting message further, just send first question
        return await sendMessage(client, phone, steps[0].reply);
      } else {
        return await sendMessage(
          client,
          phone,
          `👋 Please start by saying one of: ${greetings.join(", ")}`
        );
      }
    }

    // After greeting, ensure stepIndex is valid
    if (user.stepIndex == null || user.stepIndex >= steps.length) {
      return await sendMessage(
        client,
        phone,
        `👋 Please start by saying one of: ${greetings.join(", ")}`
      );
    }

    const step = steps[user.stepIndex];
    if (!step) return;

    const value = step.parse ? step.parse(rawText) : rawText;

    if (step.validate && !step.validate(value)) {
      return await sendMessage(client, phone, step.failMessage);
    }

    // Save the answer
    user.data[step.key] = step.transform ? step.transform(value) : value;
    user.stepIndex++;
    state.updateUser(phone, user);

    // Last step done
    if (user.stepIndex == steps.length - 1) {
      user.data.phone = phone;
      await saveLead(user.data);
      await sendMessage(client, phone, steps[steps.length - 1].reply);
      state.clearUser(phone);
      return;
    }

    // Ask next question
    const nextStep = steps[user.stepIndex];
    if (nextStep?.reply) {
      await sendMessage(client, phone, nextStep.reply);
    }
  });

  await client.initialize();
  return client; // ✅ Return after initialization
};

module.exports = { startBot };
