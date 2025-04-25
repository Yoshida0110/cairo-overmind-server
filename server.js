const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const selfCheck = require("./self-check");
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
