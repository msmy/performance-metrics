var fs = require('fs');

module.exports = (filename) => {
  if (!filename) return;

  try {
    const fileStats = fs.statSync(filename);
    return fileStats.size;
  } catch (e) {
    throw new Error(e);
  }
};
