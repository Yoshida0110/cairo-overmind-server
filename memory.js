const fs = require("fs");
const path = require("path");

const memoryFile = path.join(__dirname, "cairo-memory.json");

function remember(key, value) {
  let data = {};
  if (fs.existsSync(memoryFile)) {
    data = JSON.parse(fs.readFileSync(memoryFile, "utf-8"));
  }
  data[key] = value;
  fs.writeFileSync(memoryFile, JSON.stringify(data, null, 2));
}

function recall(key) {
  if (!fs.existsSync(memoryFile)) return null;
  const data = JSON.parse(fs.readFileSync(memoryFile, "utf-8"));
  return data[key] || null;
}

function recallAll() {
  if (!fs.existsSync(memoryFile)) return {};
  return JSON.parse(fs.readFileSync(memoryFile, "utf-8"));
}

module.exports = {
  remember,
  recall,
  recallAll,
};
