module.exports = [
  // Initial greeting step
  {
    key: "name",
    validate: (msg) => true,
    failMessage: `❌ Name must be atleast 2 letters long`,
    reply:
      "Hi there, Welcome to solar panels hub, We are here to help you setup your own solar system. What's your name?",
  },
  {
    key: "location",
    validate: (input) => true,
    reply: "📍 What is your *location* (City/Area)?",
  },
  {
    key: "systemType",
    reply:
      "🔌 What type of solar system are you interested in?\n1. On-Grid\n2. Off-Grid\n3. Hybrid\n\nReply with 1, 2, or 3.",
    validate: (input) => ["1", "2", "3"].includes(input),
    failMessage: "Please make sure to select a valid value.",
    transform: (input) => ({ 1: "On-Grid", 2: "Off-Grid", 3: "Hybrid" }[input]),
  },
  {
    key: "electricityUsage",
    validate: (input) => true,
    reply: "⚡ What is your *monthly electricity usage* in kWh or ₹?",
  },
  {
    key: "roofType",
    validate: (input) => true,
    reply: "🏠 What type of roof do you have? (Flat, Sloped, Metal, etc.)",
  },
  {
    key: "finalize",
    validate: (input) => true,
    reply:
      "💰Thanks for contacting us, your details has been sent to our representative. He/She wil get in contact with you shortly.",
  },
];
