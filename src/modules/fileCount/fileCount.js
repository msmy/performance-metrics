const fs = require('fs');

module.exports = (folder) => {
  if (!folder) return;

  try {
    const files = fs.readdirSync(folder);
    return files.length;
  } catch (e) {
    throw new Error(e);
  }
}
