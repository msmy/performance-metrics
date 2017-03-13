const fs = require('fs');

module.exports = (folder) => {
  return new Promise((resolve, reject) => {

    if (!folder) reject('No folder specified');

    try {
      const files = fs.readdirSync(folder);
      resolve(files.length);
    } catch (e) {
      reject(e);
    }
  });
}
