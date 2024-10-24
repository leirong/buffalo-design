const fs = require("fs");
const path = require("path");

const getAllFiles = (dir) => {
  const files = fs.readdirSync(dir);
  const result = [];
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      result.push(...getAllFiles(filePath));
    } else {
      result.push(filePath);
    }
  });
  return result;
};
module.exports = { getAllFiles };
