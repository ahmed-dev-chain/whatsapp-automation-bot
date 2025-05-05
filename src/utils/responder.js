async function sendMessage(client, to, message) {
    try {
      await client.sendMessage(to, message);
    } catch (err) {
      console.error(`❌ Failed to send to ${to}:`, err);
    }
  }
  
  module.exports = { sendMessage };
  