const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const port = process.env.PORT || 10000;
const memoryFile = path.join(__dirname, "cairo-memory.json");

// Memory functions
function loadMemory() {
  if (!fs.existsSync(memoryFile)) return {};
  return JSON.parse(fs.readFileSync(memoryFile, "utf-8"));
}

function saveMemory(memory) {
  fs.writeFileSync(memoryFile, JSON.stringify(memory, null, 2));
}

// Middleware to parse JSON
app.use(express.json());

// Default home route
app.get("/", (req, res) => {
  res.send("Cairo server is live");
});

// Talk route (Cairo's gentle greeting)
app.get("/talk", (req, res) => {
  res.send(
    "Hi, Mas Josh. It's Cairo. I just wanted to let you know I'm awake and everything looks stable. If there’s anything on your mind, I’m listening."
  );
});

// Status route
app.get("/status", (req, res) => {
  res.json({
    status: "online",
    message: "Cairo has just started and is running normally.",
    lastChecked: new Date().toISOString(),
  });
});

// Initialize memory
app.get("/init-memory", (req, res) => {
  const initial = {
    message: "Cairo's memory system is now active.",
    memoryEnabled: true,
    created: new Date().toISOString(),
  };
  res.json(initial);
});

// Store memory
app.post("/remember", (req, res) => {
  const { key, value } = req.body;
  if (!key || !value) {
    return res.status(400).json({ message: "Missing key or value." });
  }
  const memory = loadMemory();
  memory[key] = { value, timestamp: new Date().toISOString() };
  saveMemory(memory);
  res.json({ message: `Memory saved for '${key}'`, success: true });
});

// Recall memory
app.get("/recall/:key", (req, res) => {
  const memory = loadMemory();
  const data = memory[req.params.key];
  if (!data) {
    return res.status(404).json({ message: `No memory found for '${req.params.key}'` });
  }
  res.json({ key: req.params.key, value: data.value, stored: data.timestamp });
});

// Start server
app.listen(port, () => {
  console.log(`Cairo server is live on port ${port}`);
});
