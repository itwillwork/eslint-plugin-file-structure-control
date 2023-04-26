const fs = require('fs');

const checkExistFile = (filename) => {
  return fs.existsSync(filename);
}

module.exports = { checkExistFile }
