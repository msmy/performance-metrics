const fs = require('fs');
const zlib = require('zlib');

function gzipFile(src, resolve, reject) {
  
  const gzip = zlib.createGzip();
  const input = fs.createReadStream(src);

  const dest = `${src}.gz`;
  const output = fs.createWriteStream(dest);

  input.pipe(gzip).pipe(output);

  output.on('finish', () => {
    return calculateSize(dest, resolve, reject);
  });
}

function calculateSize(filename, resolve, reject) {
  try {
    const fileStats = fs.statSync(filename);
    resolve(fileStats.size);
  } catch (e) {
    reject(e);
  }
}

module.exports = (filename, opts = {}) => {
  return new Promise((resolve, reject) => {

    if (!filename) reject(new Error('No filename specified'));

    const gzipSize = opts.gzip || false;
    
    if(gzipSize) {
      gzipFile(filename, resolve, reject);
    } else {
      calculateSize(filename, resolve, reject);
    }
  });
};

