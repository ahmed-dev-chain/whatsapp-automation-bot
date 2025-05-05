const sessions = {};

console.log({ sessions });

function initUser(phone) {
  if (!sessions[phone]) {
    sessions[phone] = {
      greeted: false, // Track if greeted
      stepIndex: null, // Don't start at 0 yet
      data: {},
    };
  }
  console.log(sessions[phone]);
  return sessions[phone];
}

function getUser(phone) {
  return sessions[phone];
}

function updateUser(phone, update) {
  if (!sessions[phone]) return;
  sessions[phone] = { ...sessions[phone], ...update };
}

function clearUser(phone) {
  delete sessions[phone];
}

module.exports = { initUser, getUser, updateUser, clearUser };
