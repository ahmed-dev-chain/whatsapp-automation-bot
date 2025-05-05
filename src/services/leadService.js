const Lead = require('../models/lead.model');

async function saveLead(data, source = 'whatsapp') {
  try {
    const lead = new Lead({ ...data, source });
    await lead.save();
    return lead;
  } catch (err) {
    console.error('❌ Lead Save Error:', err);
    throw err;
  }
}

module.exports = { saveLead };
