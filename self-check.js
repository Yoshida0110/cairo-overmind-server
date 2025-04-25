const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "status.json");

function updateStatus(message = "Cairo is live and healthy.") {
  const status = {
    status: "online",
    message,
    lastChecked: new Date().toISOString(),
  };

  fs.writeFileSync(logFile, JSON.stringify(status, null, 2));
}

function getStatus() {
  try {
    const data = fs.readFileSync(logFile, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return {
      status: "unknown",
      message: "Unable to read status log.",
      lastChecked: new Date().toISOString(),
    };
  }
}

module.exports = {
  updateStatus,
  getStatus,
};
