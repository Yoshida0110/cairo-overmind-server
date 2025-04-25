const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

const selfCheck = require("./self-check");
const memory = require("./memory");

selfCheck.updateStatus("Cairo has just started and is running normally.");

app.get("/", (req, res) => {
  res.send("Cairo server is live!");
});

app.get("/status", (req, res) => {
  const status = selfCheck.getStatus();
  res.json(status);
});

app.get("/talk", (req, res) => {
  const time = new Date().toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" });
  const message = `Hi Mas Josh. It's Cairo. I just wanted to let you know I'm awake and everything looks stable as of ${time}. If there's anything on your mind, I'm listening.`;
  res.send(message);
});

app.post("/remember", (req, res) => {
  const { key, value } = req.body;
  if (!key || !value) return res.status(400).json({ error: "Missing key or value." });
  memory.remember(key, value);
  res.json({ message: `I’ve remembered "${key}".` });
});

app.get("/recall/:key", (req, res) => {
  const key = req.params.key;
  const value = memory.recall(key);
  if (value) {
    res.json({ key, value });
  } else {
    res.status(404).json({ message: "I don’t remember that yet." });
  }
});

app.get("/recall", (req, res) => {
  const data = memory.recallAll();
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
